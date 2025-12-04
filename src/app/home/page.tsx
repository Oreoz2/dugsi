import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <div className="space-y-6 max-w-md">
                <div className="text-6xl">🕌</div>
                <h1 className="text-4xl font-bold tracking-tight">Dugsi Management Platform</h1>
                <p className="text-muted-foreground">
                    A comprehensive solution for managing your Madrasah.
                    Multi-tenant, secure, and easy to use.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/login">
                        <Button size="lg" className="rounded-full">
                            Login to Portal
                        </Button>
                    </Link>
                    <Link href="https://dugsi.app/demo">
                        <Button variant="outline" size="lg" className="rounded-full">
                            Request Demo
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
