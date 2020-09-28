# bereza ui kit generator

Parse figma project and transfer ui components into the code.

## Install

`npm i bereza-ui-kit`

## Run

You should run the script while you are in the root folder of your project.
Find a link for the color page of the project you want to parse.

`npx bereza -f <fileId> -n <nodeId> -t <token> -p <preprocessor>`

## Example:

`https://www.figma.com/file/rQqY9OkcdzG6Iav6sePFoC/Klinker-system?node-id=0%3A1&viewport=-523%2C244%2C0.2316616048812366`

Where:

- `rQqY9OkcdzG6Iav6sePFoC` is fileId
- `node-id=0%3A1` is nodeId
- `token` is your Figma access token to the project file
- `preprocessor` options are `sass`, `scss` or `less`

## TODO

- Add typography parser
- Add components/elements parser
