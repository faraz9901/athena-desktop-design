import { Button } from "@/components/ui/button";
import { Construction, Download, Smartphone } from 'lucide-react';

const MobileLandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-6 font-sans">
            <div className="flex flex-col items-center text-center max-w-md w-full space-y-8">

                {/* Logo / Brand Area */}
                <div className="bg-gradient-to-br from-primary to-primary/80 p-5 rounded-2xl shadow-2xl mb-4 animate-in fade-in duration-700">
                    <Construction className="w-16 h-16 text-primary-foreground" />
                </div>

                <h1 className="text-4xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    e-Thekedar
                </h1>

                <p className="text-muted-foreground text-lg leading-relaxed">
                    The ultimate tool for Construction Project Managers.
                </p>

                <div className="bg-card p-6 rounded-2xl shadow-xl border-2 border-primary/10 w-full mt-8 hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">Desktop Only Experience</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        Our web platform is designed for powerful desktop management. For the best experience on the go, please download our mobile app.
                    </p>

                    <div className="space-y-3">
                        <Button className="w-full h-12 gap-3 shadow-md hover:shadow-lg transition-shadow">
                            <Download className="w-5 h-5" />
                            Download for Android
                        </Button>
                        <Button className="w-full h-12 gap-3 shadow-md hover:shadow-lg transition-shadow">
                            <Download className="w-5 h-5" />
                            Download for iOS
                        </Button>
                    </div>
                </div>

                <div className="text-sm text-muted-foreground mt-12">
                    &copy; {new Date().getFullYear()} e-Thekedar. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default MobileLandingPage;
