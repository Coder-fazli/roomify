"use client";

import { Button } from "@/components/ui/Button";
import { Box, Download, RefreshCcw, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Visualizer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialImage = searchParams.get("initialImage");
  const initialRender = searchParams.get("initialRender");
  const name = searchParams.get("name");

  const hasInitialGenerated = useRef(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(initialRender || null);

  const handleBack = () => router.push("/");

  const runGeneration = async () => {
    if (!initialImage) return;

    try {
      setIsProcessing(true);
      // TODO: call /api/generate when backend is ready
      console.log("Generation will be wired to backend soon");
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!initialImage || hasInitialGenerated.current) return;

    if (initialRender) {
      setCurrentImage(initialRender);
      hasInitialGenerated.current = true;
      return;
    }

    hasInitialGenerated.current = true;
    runGeneration();
  }, [initialImage, initialRender]);

  return (
    <div className="visualizer">
      <nav className="topbar">
        <div className="brand">
          <Box className="logo" />
          <span className="name">Floo3D</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleBack} className="exit">
          <X className="icon" /> Exit Editor
        </Button>
      </nav>

      <section className="content">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-meta">
              <p>Project</p>
              <h2>{name || "Untitled project"}</h2>
              <p className="note">Created by You</p>
            </div>

            <div className="panel-actions">
              <Button size="sm" onClick={() => {}} className="export" disabled={!currentImage}>
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
              <Button size="sm" onClick={() => {}} className="share" disabled={!currentImage}>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </div>

          <div className={`render-area ${isProcessing ? "is-processing" : ""}`}>
            {currentImage ? (
              <img src={currentImage} alt="AI Render" className="render-img" />
            ) : (
              <div className="render-placeholder">
                {initialImage && (
                  <img src={initialImage} alt="Original" className="render-fallback" />
                )}
              </div>
            )}

            {isProcessing && (
              <div className="render-overlay">
                <div className="rendering-card">
                  <RefreshCcw className="spinner" />
                  <span className="title">Generating...</span>
                  <span className="subtitle">Generating your 3D visualization...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
