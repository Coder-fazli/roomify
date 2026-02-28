import { Button } from "components/ui/Button";
import { generate3DView } from "lib/ai.actions";
import { Box, Download, RefreshCcw, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router"


const Visualizer = () => {
   
   const navigate = useNavigate();
   const location = useLocation();
   const { initialImage, initialRender, name } = location.state || {};


   const hasInitialGenerated = useRef(false);

   const [isProcessing, setIsprocessing] = useState(false);
   const [currentImage, setCurentImage] = useState(initialRender || null);

   const handleBack = () => navigate('/'); 

   const runGeneration = async () => {
    if (!initialImage) return;

    try {
      setIsprocessing(true);
      const result = await generate3DView({ sourceImage: initialImage }); 
      
       if(result.renderedImage) {
         setCurentImage(result.renderedImage);
       }  

    } 
    catch (error) {
      console.error('Generation failed: ', error)
    } finally {
      setIsprocessing(false);
    }
   }

    useEffect(() => {
        if(!initialImage || hasInitialGenerated.current) return;

        if(initialRender) {
           setCurentImage(initialRender);
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
               <span className="name">Roomify</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleBack} className="exit">
              <X className="icon"/> Exit Editor
            </Button>
            </nav>

            <section className="content">
               <div className="panel">
                <div className="panel-header">
                  <div className="panel-meta">
                    <p>Project</p>
                    <h2>{'Untitle project'}</h2>
                    <p className="note">Created by You</p>
                  </div>
                          
                     <div className="panel-action">
                        <Button
                         size="sm"
                         onClick={() => {}}
                         className="export"
                         disabled={!currentImage}
                         >
                          <Download className="w-f h-4 mr-2" /> Export
                        </Button>

                         <Button
                         size="sm"
                         onClick={() => {}}
                         className="share"
                         disabled={!currentImage}
                         >
                         <Share2 className="w-f h-4 mr-2" /> 
                          Share
                        </Button>
                     </div>                           
                </div>

                      <div className={`render-area ${isProcessing ? 'is-processing': ''}`
                      }>
                          {currentImage ? (
                            <img src={currentImage} alt="Ai Render" className="render-img"/>
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
                                 <RefreshCcw  className="spinner" />
                                 <span className="title">...
                                 </span>
                                  <span className="subtitle">
                                    Generating your 3D visualization ... </span>
                              </div>
                            </div>
                          )}              

                      </div>

               </div>
            </section>
       </div>
  )
}

export default Visualizer
