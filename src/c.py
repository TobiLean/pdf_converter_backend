from pdf2docx import Converter
import os
import sys

print("I am connected")

# pdfFilePath = input("Please enter the pdf file path: ")
pdfFilePath = sys.argv[1]

if os.path.exists(pdfFilePath):

    pathLength = len(pdfFilePath)
    # s = pdfFilePath.rfind("/")
    # old_file_name = pdfFilePath[s:]
    # old_file_path = pdfFilePath.rsplit('/', 1)[0]
    #
    # docx_file = old_file_name.rsplit('.', 1)[0]
    # docx_file = docx_file + '.docx'
    # docx_file = docx_file.replace('/', '')
    # new_file_path = old_file_path + '/' + docx_file
    newPath = './converted/new.docx'

    cv = Converter(pdfFilePath)
    cv.convert(newPath)
    cv.close()

    print('creating...\n', "test")
else:
    print("\n----NO SUCH DIRECTORY!----")
