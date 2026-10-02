from fastapi import FastAPI,UploadFile,File
from typing import List
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import img2pdf

print('running')
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/post')
async def convert_pdf(files : List[UploadFile] = File(...)):

    images = []
    for file in files:
        data = await file.read()
        images.append(data)

    pdf = img2pdf.convert(images)

    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=converted.pdf"
        })