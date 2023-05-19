import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApp } from "src/hooks/use-app";
import fileService from "src/services/fileService";

export const FileContext = createContext(null)

export const FileProvider = (props) => {
	const { children } = props;
	const [isLoading, setIsLoading] = useState(false)


	const [fileList, setFileList] = useState([]);
	const { refresh, refreshApp } = useApp()

	useEffect(() => {
		(async () => {
			const res = await fileService.getAll()
			setFileList(res?.data || [])
		})()
	}, [children, refreshApp])


	const getData = async (id) => {
		setIsLoading(true)
		const res = await fileService.getData(id);
		setIsLoading(false)
		refresh()
		return res;
	}
	const download = async (url, fileName) => {
		setIsLoading(true)
		await fileService.download(url, fileName);
		refresh()
		setIsLoading(false)
	}
	const upload = async (files) => {
		setIsLoading(true)
		let res = await fileService.upload(files);
		if (res && res.statusCode === 200) {
			toast("Upload successfully", { type: "success" })
			refresh();
		} else toast("Upload failed", { type: "error" })
		setIsLoading(false)
	}
	const deleteFile = async (id) => {
		setIsLoading(true)
		let res = await fileService.delete(id);
		if (res && res.statusCode === 200) {
			toast("Delete successfully", { type: "success" })
			refresh();
		} else toast("Delete failed", { type: "error" })
		setIsLoading(false)
	}
	return (
		<FileContext.Provider value={{ isLoading, fileList, getData, download, upload, deleteFile }}>
			{children}
		</FileContext.Provider>
	)
}

export const FileConsumer = () => FileContext.Consumer;
export const useFileContext = () => useContext(FileContext);