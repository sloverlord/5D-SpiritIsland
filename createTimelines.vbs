outFile = "timelines.xml"

' Create a FileSystemObject instance
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Specify the folder path you want to examine
strFolderPath = "timelines" ' Replace with your actual folder path

' Get a reference to the folder
Set objFolder = objFSO.GetFolder(strFolderPath)

' Access the collection of subfolders within that folder
Set colSubfolders = objFolder.SubFolders

Set objFile = objFSO.CreateTextFile(outFile,True)

' create header
objFile.Write "<multiverse>" & vbCrLf

' Loop through each subfolder in the collection
For Each objSubfolder In colSubfolders
    objFile.Write vbTab & "<timeline>" & vbCrLf
	
	' setup timeline based on folder names
	data = Split(objSubfolder.Name, "-")
	objFile.Write vbTab & vbTab & "<id>" & data(0) & "</id>" & vbCrLf
	if (UBound(data) > 0) Then
		objFile.Write vbTab & vbTab & "<source>" & data(1) & "</source>" & vbCrLf
	else
		objFile.Write vbTab & vbTab & "<source>-1</source>" & vbCrLf
	end if
	
	' setup turns based on image names
	tempPath = strFolderPath & "\" & objSubfolder.Name
	set tempFolder = objFSO.GetFolder(tempPath)
	for each f in tempFolder.files
		objFile.Write vbTab & vbTab & vbTab & "<turn>" & vbCrLf
		data = Split(f.Name, "-")
		objFile.Write vbTab & vbTab & vbTab & vbTab & "<number>" & data(0) & "</number>" & vbCrLf
		objFile.Write vbTab & vbTab & vbTab & vbTab & "<phase>" & Split(data(1),".")(0) & "</phase>" & vbCrLf
		objFile.Write vbTab & vbTab & vbTab & "</turn>" & vbCrLf
	next

    objFile.Write vbTab & "</timeline>" & vbCrLf
Next

objFile.Write "</multiverse>" & vbCrLf
objFile.Close

' Clean up objects
Set colSubfolders = Nothing
Set objFolder = Nothing
Set objFSO = Nothing