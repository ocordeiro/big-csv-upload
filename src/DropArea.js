export class DropArea {

    constructor(dropArea, onChange) {
        this.dropArea = document.getElementById(dropArea);
        this.onChange = onChange;
        this.files = null;

        this.defineEvents();
    }

    defineEvents() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, () => this.unhighlight(this.dropArea), false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.dropArea.addEventListener(eventName, () => this.highlight(this.dropArea), false);
        });

        this.dropArea.addEventListener('drop', e => this.handleDrop(e), false);
    }

    handleDrop(e) {
        const data = e.dataTransfer;
        this.files = data.files;
        this.onChange(this.files);
    }

    highlight(e) {
        this.dropArea.classList.add('highlight');
    }

    unhighlight(e) {
        this.dropArea.classList.remove('highlight');
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}
