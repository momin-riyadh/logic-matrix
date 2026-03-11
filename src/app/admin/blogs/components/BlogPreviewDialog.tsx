"use client";

import { Blog } from "@/types/blog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, Clock, ExternalLink, Tag } from "lucide-react";
import { format } from "date-fns";

interface BlogPreviewDialogProps {
  blog: Blog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  PUBLISHED: { label: "Published", className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900" },
  DRAFT: { label: "Draft", className: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900" },
  ARCHIVED: { label: "Archived", className: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800" },
};

function wordCount(html: string) {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

export function BlogPreviewDialog({ blog, open, onOpenChange }: BlogPreviewDialogProps) {
  if (!blog) return null;

  const status = statusConfig[blog.status] ?? statusConfig.DRAFT;
  const words = wordCount(blog.content || "");
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b shrink-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <DialogTitle className="text-lg font-semibold">Preview</DialogTitle>
            <div className="flex items-center gap-2">
              {blog.isExternal && blog.sourceUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={blog.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                    View Original
                  </a>
                </Button>
              )}
              <Badge variant="outline" className={`text-xs font-medium ${status.className}`}>
                {status.label}
              </Badge>
              {blog.isExternal && (
                <Badge variant="outline" className="text-xs font-medium bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-900">
                  External
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 h-[calc(90vh-80px)]">
          <article className="max-w-2xl mx-auto px-6 py-8">

            {/* Cover Image */}
            {blog.coverImage && (
              <div className="mb-8 rounded-xl overflow-hidden aspect-video bg-muted">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }}
                />
              </div>
            )}

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {blog.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 border-l-2 border-primary/30 pl-4">
                {blog.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {blog.author}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                {format(new Date(blog.publishedAt || blog.createdAt), "MMMM d, yyyy")}
              </span>
              {!blog.isExternal && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </span>
              )}
            </div>

            <Separator className="mb-8" />

            {/* Content */}
            {blog.isExternal ? (
              <div className="rounded-xl border-2 border-dashed border-border p-8 text-center space-y-4">
                <div className="text-4xl">🔗</div>
                <div>
                  <p className="font-semibold text-foreground mb-1">External Blog Post</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    This post is hosted externally. Click below to read the full article.
                  </p>
                  {blog.sourceUrl && (
                    <Button asChild>
                      <a href={blog.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Full Article
                      </a>
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground break-all">{blog.sourceUrl}</p>
              </div>
            ) : (
              // Use rte-body + rte-preview so all your custom CSS (headings, lists,
              // code blocks, inline code, images, blockquotes) applies exactly as
              // it does inside the editor — no separate prose config needed.
              <div
                className="rte-body rte-preview"
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />
            )}
          </article>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}