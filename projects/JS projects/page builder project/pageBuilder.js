document.addEventListener("DOMContentLoaded", () => {
    const addElementButton = document.getElementById("addElement");
    const saveElementButton = document.getElementById("saveElement");
    const clearContentButton = document.getElementById("clearContent");
    const loadContentButton = document.getElementById("loadContent");
    const buildTool = document.getElementById("buildTool");
    const backgroundColorInput = document.getElementById("backgroundColor");
    const widthInput = document.getElementById("width");
    const heightInput = document.getElementById("height");
    const contentInput = document.getElementById("content");
    const contentColorInput = document.getElementById("contentColor");
    const contentSizeInput = document.getElementById("contentSize");
    const dynamicContent = document.getElementById("dynamicContent");

    addElementButton.addEventListener("click", () => {
        const elementType = buildTool.value;
        if (!elementType) {
            alert("Please select an element type.");
            return;
        }
        const element = createElement(elementType);
        if (element) {
            dynamicContent.appendChild(element);
        }
    });

    saveElementButton.addEventListener("click", () => {
        const content = dynamicContent.innerHTML;
        localStorage.setItem("pageContent", content);
        alert("Page layout has been saved!");
    });

    clearContentButton.addEventListener("click", () => {
        dynamicContent.innerHTML = "";
        alert("Content has been cleared.");
    });

    loadContentButton.addEventListener("click", () => {
        const content = localStorage.getItem("pageContent");
        if (content) {
            dynamicContent.innerHTML = content;
            alert("Page layout has been loaded!");
        } else {
            alert("No saved content found.");
        }
    });

    function createElement(type) {
        let newElement;

        switch (type) {
            case "header":
                newElement = document.createElement("h1");
                newElement.textContent = contentInput.value || "Header";
                break;
            case "paragraph":
                newElement = document.createElement("p");
                newElement.textContent = contentInput.value || "Paragraph";
                break;
            case "image":
                newElement = document.createElement("img");
                newElement.src = contentInput.value || "https://via.placeholder.com/150";
                newElement.alt = "Image";
                break;
            case "button":
                newElement = document.createElement("button");
                newElement.textContent = contentInput.value || "Click Me";
                newElement.style.cursor = "pointer";
                break;
            case "box":
                newElement = document.createElement("div");
                newElement.textContent = contentInput.value || "Box";
                newElement.style.display = "flex";
                newElement.style.alignItems = "center";
                newElement.style.justifyContent = "center";
                break;
            case "link":
                newElement = document.createElement("a");
                newElement.href = contentInput.value || "#";
                newElement.textContent = "Link";
                newElement.target = "_blank";
                break;
            case "unorderedList":
                newElement = document.createElement("ul");
                const items = contentInput.value.split(",") || ["Item 1", "Item 2", "Item 3"];
                items.forEach((item) => {
                    const li = document.createElement("li");
                    li.textContent = item.trim();
                    newElement.appendChild(li);
                });
                break;
            case "orderedList":
                newElement = document.createElement("ol");
                const orderedItems = contentInput.value.split(",") || ["Item 1", "Item 2", "Item 3"];
                orderedItems.forEach((item) => {
                    const li = document.createElement("li");
                    li.textContent = item.trim();
                    newElement.appendChild(li);
                });
                break;
            default:
                alert("Invalid element type.");
                return null;
        }

        applyStyles(newElement);
        return newElement;
    }

    function applyStyles(element) {
        if (backgroundColorInput.value) {
            element.style.backgroundColor = backgroundColorInput.value;
        }
        if (widthInput.value) {
            element.style.width = widthInput.value + "px";
        }
        if (heightInput.value) {
            element.style.height = heightInput.value + "px";
        }
        if (contentColorInput.value) {
            element.style.color = contentColorInput.value;
        }
        if (contentSizeInput.value) {
            element.style.fontSize = contentSizeInput.value + "px";
        }
        element.style.margin = "10px";
        element.style.padding = "10px";
        element.style.borderRadius = "5px";
        element.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
    }
});
