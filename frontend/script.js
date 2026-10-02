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

    // User click ke immediately andar window open
    const newTab = window.open("", "_blank");

    try {

        const response = await fetch(
            "https://pix2pdf-backend.onrender.com/post",
            {
                method: "POST",
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("PDF conversion failed");
        }

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        // Mobile browser mein PDF open hoga
        if (newTab) {
            newTab.location.href = url;
        } else {
            window.location.href = url;
        }

    } catch (error) {

        console.error("Error:", error);

        if (newTab) {
            newTab.close();
        }

        alert("PDF convert nahi hua. Please try again.");
    }
});

