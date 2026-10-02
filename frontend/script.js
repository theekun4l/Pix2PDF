const Div = document.querySelector('.drop-box');
const fileInput = document.querySelector('#photos');
const Preview = document.querySelector('.preview');
const submitBtn = document.querySelector('#submit')

Div.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {

    Preview.innerHTML = "";
    Preview.style.visibility = 'visible';
    submitBtn.style.visibility = 'visible'


    const files = fileInput.files;

    for (const file of files) {

        const img = document.createElement("img");

        img.src = URL.createObjectURL(file);

        Preview.appendChild(img);
    }
});
submitBtn.addEventListener("click", async () => {

    const formData = new FormData();

    for (const file of fileInput.files) {
        formData.append("files", file);
    }

    try {

        const response = await fetch(
            "https://pix2pdf-backend.onrender.com/post",
            {
                method: "POST",
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const blob = await response.blob();

        console.log("PDF blob:", blob);
        console.log("Blob type:", blob.type);
        console.log("Blob size:", blob.size);

        const url = URL.createObjectURL(
            new Blob([blob], {
                type: "application/octet-stream"
            })
        );

        const a = document.createElement("a");

        a.href = url;
        a.download = "converted.pdf";
        a.target = "_blank";

        document.body.appendChild(a);
        a.click();
        a.remove();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);

    } catch (error) {
        console.error("PDF conversion failed:", error);
        alert("PDF download failed. Please try again.");
    }
});

