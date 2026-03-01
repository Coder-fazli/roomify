interface DesignItem {
    id: string;
    name?: string | null;
    sourceImage: string;
    renderedImage?: string | null;
    timestamp: number;
    ownerId?: string | null;
}

interface DesignConfig {
    floor: string;
    walls: string;
    style: string;
}

type RenderCompletePayload = {
    renderedImage: string;
    renderedPath?: string;
};

type VisualizerLocationState = {
    initialImage?: string;
    initialRender?: string | null;
    name?: string | null;
};

interface Generate3DViewParams {
    sourceImage: string;
    projectId?: string | null;
}
