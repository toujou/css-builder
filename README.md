# css-builder

A NPM package to build toujou's CSS (can be used on any extension).

Output files will be autoprefixed and minified. It is also possible to use css `@import` to import other css files.

---

## How to install
1. If the extension still doesn't have a npm package on `Resources/Public` you can create one with
```
npm init
```

2. Install the @toujou/css-builder package with
```
npm install --save-dev @toujou/css-builder
```
If it was installed successfully you can see if on the package.json file under `devDependencies`


## How to use
Run either the default or the custom commands on the `Resources/Public` folder of the extension.

### 1. Default locations
Default origin folder: `Resources/Public/Scss`

Default output folder: `Resources/Public/build/Stylesheets`

You can use the default command without any other arguments to build all CSS files which are direct children of the default origin folder into the default output folder.
```
npx toujou-build-css
```

### 2. Custom locations
If you need to customize your origin and output folders, you can use
```
npx toujou-build-css originFile destinationFile
```

Example:
```
npx toujou-build-css ./CSS/Frontend/ ./Stylesheets/build/bundles/
```
In this case all direct children of `.CSS/Frontend` would get built into `./Stylesheets/build/bundles/`

---

## Useful Infos

### Properties that need prefixing
You can check which properties still need prefixing bu using `caniuse.com`.

Or you can use this [list](https://css-tricks.com/is-vendor-prefixing-dead/), which is very useful for debugging and testing

---

## Good practices
- Separate the css files into small component blocks (easy to do if using BEM, 1 file per block)
- Use an "extension css file" which imports all other css block files
- Use same file structure as the toujou extension
Example:
```
- Resources
    - Public
        -Scss
            - Elements
                - header.css
                - footer.css
                - content-card.css
            - toujou-extension.css
```
(on the `toujou-extension.css` import the `Elements/header.css`, `Elements/footer.css` and `Elements/content-card.css`)

With `npx build-toujou-css` you will build all these css files into `Resources/Public/build/Stylesheets/toujou-extension.css`
