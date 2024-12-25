# tabX - Interactive Gallery Plugin for jQuery

**tabX** is a lightweight and powerful jQuery plugin that creates dynamic, filterable galleries with smooth animations. Whether you're building a portfolio, an e-commerce store, or a photo gallery, tabX enhances your website's interactivity and visual appeal.  

---

## 🚀 Features  

- **Dynamic Filtering**: Easily filter gallery items by categories with a single click.  
- **Smooth Animations**: Choose from various built-in animations like fade, slide, rotate, and more.  
- **Fully Responsive**: Works seamlessly on desktops, tablets, and mobile devices.  
- **Customizable**: Match the gallery's look and behavior to your website design.  
- **Automatic Setup**: Simply add category attributes to your items, and tabX handles the rest.  

---

## 📦 Installation  

1. **Include jQuery** (if not already installed):  
   ```html
   <script src="https://code.jquery.com/jquery.min.js"></script>
   ```

2. **Download tabX**:  
   Clone or download this repository and include the JavaScript and CSS files in your project:  
   ```html
   <script src="path/to/tabx.min.js"></script>
   <link rel="stylesheet" href="path/to/tabx.css">
   ```

3. **Initialize the Plugin**:  
   ```javascript
   $('#your-gallery-id').tabX({
       type: 'buttons',      // Navigation style
       animation: 'fade',    // Animation type
       boxClass: 'custom',   // Custom box styling
       activeCat: 'all'      // Default active category
   });
   ```

---

## 🚠 Options  

| Option       | Default     | Description                                                                 |
|--------------|-------------|-----------------------------------------------------------------------------|
| `type`       | `'buttons'` | Defines the navigation style: `'buttons'`, `'tabs'`, etc.                   |
| `animation`  | `'none'`    | Sets the transition animation: `'fade'`, `'slide'`, `'random'`, etc.        |
| `boxClass`   | `'default'` | Adds a custom CSS class for gallery boxes.                                  |
| `activeCat`  | `'all'`     | Specifies the default active category.                                      |
| `animations` | Array       | List of available animations for the `'random'` option.                    |

---

## 🔗 Code Examples and Live Demo  

Check out detailed usage examples and a live demo on the **tabX Documentation Page**:  
👉 [tabX Documentation & Demo](https://phploaded.github.io/tabX/)  

---

## 💡 Getting Started  

### HTML Example:  
```html
<div id="gallery" tabx-id="example1">
    <div tabx-cats="nature">Roses</div>
    <div tabx-cats="architecture">Skyscraper</div>
    <div tabx-cats="nature, architecture">Cherry Blossom</div>
</div>
```

### JavaScript Initialization:  
```javascript
$('#gallery').tabX({
    type: 'tabs',
    animation: 'slide',
    boxClass: 'highlight',
    activeCat: 'nature'
});
```

---

## 🧹 Contributions  

We welcome contributions to improve **tabX**! Feel free to submit issues, suggest features, or create pull requests.  

---

## 📜 License  

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.  

---

## 📮 Support  

For questions or support, please contact us via the [GitHub Issues](https://github.com/phploaded/tabX/issues) page.  

---  

🌟 **If you find tabX useful, don't forget to give it a star on GitHub!** 🌟

