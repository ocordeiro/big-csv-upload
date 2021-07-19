export class FileApi {

    constructor(file) {
        this.fileReader = new FileReader();
        this.textDecoder = new TextDecoder();

        this.file = file;
        this.lineCount = 0;
        this.offset = 0;
        this.results = '';
        this.chunkLines = [];

        this.CHUNK_SIZE = 500000; // 500kb.
        this.MAX_LINES = 500000;

        this.fileReader.onload = () => this.onLoad();
        this.fileReader.onerror = () => this.onError();

        this.readLines();
    }

    onLoad() {
        this.results += this.textDecoder.decode(this.fileReader.result, { stream: true });
        let lines = this.results.split('\n');
        this.results = lines.pop();
        this.lineCount += lines.length;

        for (let i = 0; i < lines.length; ++i) {
            this.forEachLine(lines[i]);
        }
        this.readLines();
    }

    readLines() {
        if (this.offset !== 0 && this.offset >= this.file.size) {
            this.forEachLine(this.results);
            this.onComplete();
            return;
        }
        let slice = this.file.slice(this.offset, this.offset + this.CHUNK_SIZE);
        this.fileReader.readAsArrayBuffer(slice);
        this.offset += this.CHUNK_SIZE;
    }

    onError() {
        this.onComplete(this.fileReader.error);
    }

    onComplete() {
        console.log(this.lineCount)
    }

    forEachLine(line) {
        console.log(line)
    }
}