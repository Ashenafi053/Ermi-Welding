# Ermi Welding Website

A bilingual business website for **Ermi Welding**, showcasing custom metalwork, welding services, completed projects, and customer contact information.

Built with plain **HTML, CSS, and JavaScript** — no frameworks, dependencies, or build tools required to run the website.

## Overview

The website provides customers with a simple way to explore Ermi Welding's services, view previous work, and get in touch.

### Features

- **Bilingual interface:** English and Amharic language support.
- **Responsive design:** Layout adapted for desktop, tablet, and mobile screens.
- **Service showcase:** Dedicated sections for welding and metalwork services.
- **Dynamic photo gallery:** Automatically generated from images stored in category folders.
- **Gallery filtering:** Browse projects by category.
- **Photo viewer:** Open project photos in a larger view.
- **Contact form:** Customer inquiries submitted through Formspree.
- **Language preference:** Remembers the selected language using browser local storage.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Python (gallery generation script)
- GitHub Actions (automatic gallery updates)
- Formspree (contact form submissions)

## Project Structure

```text
Ermi-Welding/
│
├── index.html
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   └── images.js
│
├── images/
│   ├── gates/
│   ├── door-windows/
│   ├── handrails/
│   └── customs/
│
├── tools/
│   └── build_gallery.py
│
├── .github/
│   └── workflows/
│       └── update-gallery.yml
│
└── README.md
```

## Services

The website showcases the following categories:

| Category         | Description                                   |
| ---------------- | --------------------------------------------- |
| Gate Doors       | Custom metal gates and security doors         |
| Doors & Windows  | Metal doors and window fabrication            |
| Handrails        | Custom metal handrails and railings           |
| Custom Metalwork | Tables, beds, and other custom metal products |

## Gallery Management

The gallery is designed to update automatically when new project photos are added.

### Adding a photo

Upload a photo into its corresponding category folder:

| Folder                 | Gallery category |
| ---------------------- | ---------------- |
| `images/gates/`        | Gate Doors       |
| `images/door-windows/` | Doors & Windows  |
| `images/handrails/`    | Handrails        |
| `images/customs/`      | Custom Metalwork |

**On GitHub:**

1. Open the appropriate image folder.
2. Select **Add file → Upload files**.
3. Upload your photo.
4. Select **Commit changes**.
5. GitHub Actions runs the gallery-generation workflow and updates `js/images.js`.

The gallery should update automatically after the workflow completes.

### Image guidelines

- Supported formats: `.jpg`, `.jpeg`, `.png`, and `.webp`.
- Use descriptive filenames without spaces, such as `gate-10.jpg`.
- Photos are displayed in filename order.
- Keep images around 500 KB or smaller where practical to improve loading speed.
- New photos receive default descriptions that can be customized in `js/images.js`.

### Removing a photo

Delete the corresponding image file from its category folder and commit the change. The gallery-generation workflow will rebuild the image list.

### Running the gallery generator manually

```bash
python tools/build_gallery.py
```

## Customizing Website Content

### Updating text

The website uses two HTML data attributes for language support:

- `data-en` — English text.
- `data-am` — Amharic text.

When changing website content, update both translations and the default text between the HTML tags.

### Updating contact information

Contact details are maintained in `index.html`.

The contact form uses Formspree. Update the form's `action` attribute if you need to connect a different Formspree endpoint.

## Running Locally

No installation or build process is required.

1. Clone the repository:

```bash
git clone https://github.com/Ashenafi053/ermi-welding.git
```

2. Open the project folder.
3. Open `index.html` in your browser.

Alternatively, use the VS Code Live Server extension for local development.

## Deployment

The project is a static website and can be hosted using services that support HTML, CSS, and JavaScript, including GitHub Pages and other static hosting providers.

The gallery automation uses GitHub Actions. Ensure the repository's workflow permissions allow the action to commit its generated gallery updates.

## Project Purpose

This project was developed to establish a professional online presence for Ermi Welding, make its services and completed work accessible to customers, and simplify communication with potential clients.

---

**Developed by Ashenafi Girma**

GitHub: [@Ashenafi053](https://github.com/Ashenafi053)

**Project:** Ermi Welding Website
