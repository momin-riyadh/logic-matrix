// components/admin/blogs/BlogsTable.tsx
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Blog } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BlogPreviewDialog } from "./BlogPreviewDialog";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Globe,
  Archive,
  FileText,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface BlogsTableProps {
  blogs: Blog[];
  onRefresh: () => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  PUBLISHED: { label: "Published", className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900" },
  DRAFT: { label: "Draft", className: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900" },
  ARCHIVED: { label: "Archived", className: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800" },
};

export function BlogsTable({ blogs, onRefresh }: BlogsTableProps) {
  const router = useRouter();
  const [previewBlog, setPreviewBlog] = useState<Blog | null>(null);
  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!deleteBlog) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${deleteBlog.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Blog deleted");
      onRefresh();
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
      setDeleteBlog(null);
    }
  }, [deleteBlog, onRefresh]);

  const handleStatusChange = useCallback(
    async (blog: Blog, status: string) => {
      try {
        const payload = blog.isExternal
          ? {
              title: blog.title,
              excerpt: blog.excerpt || "",
              coverImage: blog.coverImage || "",
              status,
              tags: blog.tags,
              author: blog.author,
              isExternal: true,
              sourceUrl: blog.sourceUrl || "",
            }
          : {
              title: blog.title,
              excerpt: blog.excerpt || "",
              content: blog.content || "",
              coverImage: blog.coverImage || "",
              status,
              tags: blog.tags,
              author: blog.author,
              isExternal: false,
            };

        const res = await fetch(`/api/blogs/${blog.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        toast.success(`Status changed to ${status.toLowerCase()}`);
        onRefresh();
      } catch {
        toast.error("Failed to update status");
      }
    },
    [onRefresh]
  );

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/10">
        <div className="text-5xl mb-4">📝</div>
        <h3 className="font-semibold text-lg mb-1">No blog posts found</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Try adjusting your filters or create a new blog post.
        </p>
        <Button asChild>
          <Link href="/admin/blogs/new">Create Blog Post</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[38%]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => {
              const status = statusConfig[blog.status];
              return (
                <TableRow key={blog.id} className="group">
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-sm leading-snug line-clamp-1">
                          {blog.title}
                        </p>
                        {blog.excerpt && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {blog.excerpt}
                          </p>
                        )}
                        {blog.isExternal && blog.sourceUrl && (
                          <a
                            href={blog.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-0.5 mt-0.5 truncate max-w-[240px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            {blog.sourceUrl}
                          </a>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {blog.author}
                  </TableCell>
                  <TableCell>
                    {blog.isExternal ? (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-900 font-medium whitespace-nowrap">
                        <Globe className="w-3 h-3" /> External
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200 dark:bg-sky-950 dark:text-sky-400 dark:border-sky-900 font-medium whitespace-nowrap">
                        <FileText className="w-3 h-3" /> Internal
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs whitespace-nowrap ${status?.className ?? ""}`}>
                      {status?.label ?? blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[120px]">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {blog.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{blog.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(blog.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity data-[state=open]:opacity-100"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setPreviewBlog(blog)}>
                          <Eye className="w-4 h-4 mr-2" /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}>
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        {blog.isExternal && blog.sourceUrl && (
                          <DropdownMenuItem asChild>
                            <a href={blog.sourceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" /> Open Original
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {blog.status !== "PUBLISHED" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(blog, "PUBLISHED")}>
                            <Globe className="w-4 h-4 mr-2" /> Publish
                          </DropdownMenuItem>
                        )}
                        {blog.status !== "DRAFT" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(blog, "DRAFT")}>
                            <FileText className="w-4 h-4 mr-2" /> Revert to Draft
                          </DropdownMenuItem>
                        )}
                        {blog.status !== "ARCHIVED" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(blog, "ARCHIVED")}>
                            <Archive className="w-4 h-4 mr-2" /> Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          onClick={() => setDeleteBlog(blog)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <BlogPreviewDialog
        blog={previewBlog}
        open={!!previewBlog}
        onOpenChange={(open) => !open && setPreviewBlog(null)}
      />

      <AlertDialog open={!!deleteBlog} onOpenChange={(open) => !open && setDeleteBlog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-medium text-foreground">&quot;{deleteBlog?.title}&quot;</span> will
              be permanently deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
