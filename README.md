# Marandi Internet

A retro-inspired, static website for Marandi Internet.

## Pages

- `index.html` - landing page
- `about.html` - studio story and values
- `contact.html` - contact details and FAQ
- `t&c.html` - terms and conditions
- `p&p.html` - privacy policy

## Hosting on GitHub Pages

This site has no build step, server runtime, database, or form handler. To publish it with GitHub Pages:

1. Push the repository to GitHub.
2. Open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch and the repository root, then save.

The site uses only local HTML, CSS, JavaScript, and favicon assets. Contact is handled through normal email and phone links, so no PHP hosting is required.

## Local preview

Open `index.html` directly in a browser, or run any simple static server from the repository root, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
