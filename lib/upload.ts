// uploads an image to ImgBB and returns its public URL, or null if it failed
export async function uploadImage(file: File): Promise<string | null> {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
            method: "POST",
            body: formData,
        });
        if (!res.ok) return null;

        const data = await res.json();
        return data.data.url;
    }
    catch {
        return null;
    }
}
