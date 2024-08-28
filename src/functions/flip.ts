export const Flip = (imageSrc: string, direction: string) => {
    const canvas = document.getElementById("meuCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx || !imageSrc) return;

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        if (direction === "horizontal") {
            ctx.scale(-1, 1);
            ctx.drawImage(image, -canvas.width, 0);
        } else if (direction === "vertical") {
            ctx.scale(1, -1);
            ctx.drawImage(image, 0, -canvas.height);
        }
        ctx.restore();
    };
};
