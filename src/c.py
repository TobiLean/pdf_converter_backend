from pdf2docx import Converter
import os
import sys

pdfFilePath = sys.argv[1]

if os.path.exists(pdfFilePath):

    pathLength = len(pdfFilePath)
    newPath = './converted/new.docx'

    cv = Converter(pdfFilePath)
    cv.convert(newPath)
    cv.close()

else:
    print("\n----NO SUCH DIRECTORY!----")
