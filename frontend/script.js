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

submitBtn.addEventListener("click",async () => {
    const formData = new FormData();

     for (const file of fileInput.files) {
        formData.append("files", file);
    }

     const response = await fetch("http://127.0.0.1:8000/post", {
        method: "POST",
        body: formData
    });

    console.log("Response:", response);
    console.log("Status:", response.status);
    console.log("Type:", response.headers.get("content-type"));

    const blob = await response.blob();

    console.log("PDF blob:", blob);

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
})

