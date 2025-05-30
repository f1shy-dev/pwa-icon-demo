"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie, setCookie, type IconSet } from "@/lib/utils";
import Image from "next/image";

export default function PWAIconSelector() {
  const [selectedIconSet, setSelectedIconSet] = useState<IconSet>("a");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedIconSet = getCookie("pwa-iconset") as IconSet;
    if (savedIconSet === "a" || savedIconSet === "b") {
      setSelectedIconSet(savedIconSet);
    }
    setIsLoaded(true);
  }, []);

  const handleIconSetChange = (iconSet: IconSet) => {
    setSelectedIconSet(iconSet);
    setCookie("pwa-iconset", iconSet);

    window.location.reload();
  };

  const handleInstallPWA = () => {
    if ("serviceWorker" in navigator) {
      window.location.reload();
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PWA Icon Selector
            </h1>
            <p className="text-slate-300 text-lg">
              Choose your preferred icon set for this Progressive Web App
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Icon Set A</CardTitle>
                <CardDescription className="text-slate-300">
                  Modern gradient design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-slate-700/50 flex items-center justify-center">
                    <Image
                      src="/iconsets/a/icon-a.png"
                      alt="Icon Set A"
                      width={120}
                      height={120}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Image
                      src="/iconsets/a/pwa-64x64.png"
                      alt="64x64"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <Image
                      src="/iconsets/a/pwa-192x192.png"
                      alt="192x192"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <Image
                      src="/iconsets/a/apple-touch-icon-180x180.png"
                      alt="Apple Touch Icon"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </div>
                  <Button
                    onClick={() => handleIconSetChange("a")}
                    variant={selectedIconSet === "a" ? "default" : "outline"}
                    className="w-full"
                  >
                    {selectedIconSet === "a"
                      ? "Currently Selected"
                      : "Select Icon Set A"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Icon Set B</CardTitle>
                <CardDescription className="text-slate-300">
                  Classic flat design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-slate-700/50 flex items-center justify-center">
                    <Image
                      src="/iconsets/b/icon-b.png"
                      alt="Icon Set B"
                      width={120}
                      height={120}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Image
                      src="/iconsets/b/pwa-64x64.png"
                      alt="64x64"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <Image
                      src="/iconsets/b/pwa-192x192.png"
                      alt="192x192"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <Image
                      src="/iconsets/b/apple-touch-icon-180x180.png"
                      alt="Apple Touch Icon"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </div>
                  <Button
                    onClick={() => handleIconSetChange("b")}
                    variant={selectedIconSet === "b" ? "default" : "outline"}
                    className="w-full"
                  >
                    {selectedIconSet === "b"
                      ? "Currently Selected"
                      : "Select Icon Set B"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Selector</CardTitle>
              <CardDescription className="text-slate-300">
                Or use the dropdown to quickly switch between icon sets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedIconSet}
                  onValueChange={handleIconSetChange}
                >
                  <SelectTrigger className="w-48 bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select icon set" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="a" className="text-white">
                      Icon Set A
                    </SelectItem>
                    <SelectItem value="b" className="text-white">
                      Icon Set B
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleInstallPWA} variant="secondary">
                  Refresh PWA
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Changes will take effect immediately. The selected icon set will
              be used for the PWA manifest, apple-touch-icon, and all related
              icons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
