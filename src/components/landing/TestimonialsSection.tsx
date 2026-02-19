import SectionHeading from './SectionHeading';
import TestimonialsSlider from './TestimonialsSlider';

export default function TestimonialsSection() {
    return (
        <section className='bg-white'>
            <div className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
                <SectionHeading
                    eyebrow='Testimonials'
                    title='What Our Client Say'
                    description='Real feedback from leaders who trusted us to build software that performs.'
                    descriptionClassName='mx-auto max-w-2xl'
                />

                <TestimonialsSlider/>
            </div>
        </section>
    );
}
