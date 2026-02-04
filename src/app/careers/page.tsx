
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';

const jobOpenings = [
  {
    title: 'Senior Frontend Engineer',
    location: 'Kampala, Uganda (Remote option available)',
    department: 'Engineering',
    description: 'We are looking for an experienced Frontend Engineer proficient in React and Next.js to help build and scale our platform.'
  },
  {
    title: 'Digital Marketing Manager',
    location: 'Kampala, Uganda',
    department: 'Marketing',
    description: 'Drive our digital growth strategy. You will be responsible for SEO, SEM, social media, and email marketing campaigns.'
  },
  {
    title: 'Seller Success Associate',
    location: 'Kampala, Uganda',
    department: 'Operations',
    description: 'Onboard and support our sellers to ensure they are successful on the YUNI platform. Excellent communication skills required.'
  },
  {
    title: 'UI/UX Designer',
    location: 'Kampala, Uganda (Remote option available)',
    department: 'Design',
    description: 'Create beautiful, intuitive, and user-centered designs across our web and mobile platforms.'
  }
];

export default function CareersPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
         <div className="relative h-64 md:h-80 w-full">
            <Image
                src="https://i.pinimg.com/1200x/49/c4/d9/49c4d980bc8420c29424ce55a11709f5.jpg"
                alt="Work at YUNI"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold font-headline text-white drop-shadow-lg text-center">
                    Join Our Team
                </h1>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold font-headline text-primary">Shape the Future of E-commerce in Uganda</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                   At YUNI, we're a passionate, innovative, and diverse team dedicated to revolutionizing the way people buy and sell online. If you're driven, creative, and want to make a real impact, we want to hear from you.
                </p>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold font-headline text-center">Current Openings</h3>
                {jobOpenings.map((job, index) => (
                    <Card key={index} className="transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle>{job.title}</CardTitle>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-1">
                                <div className="flex items-center gap-1.5">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{job.department}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{job.description}</CardDescription>
                            <Button asChild className="mt-4">
                                <a href={`mailto:careers@yuni.com?subject=Application for ${job.title}`}>Apply Now</a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                 <div className="text-center pt-8">
                     <p className="text-muted-foreground">Don't see a role that fits? Send your CV to</p>
                     <a href="mailto:careers@yuni.com" className="font-semibold text-primary hover:underline">careers@yuni.com</a>
                 </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
