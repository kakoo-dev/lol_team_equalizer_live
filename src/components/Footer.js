
const pjson = require("/package.json")

export default function Footer() {
    return (
        <div className="fixed bottom-0 right-0 w-full p-4 text-sm text-gray-500 hidden sm:flex justify-end z-[0]">
            v{pjson.version} - <span className="mr-1"></span> <a
                href="https://github.com/kakoo-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 cursor-pointer"
            >created by Kakoo</a>
        </div>
    );
}