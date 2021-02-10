// note: jest dev server is used
// for booting up `ui5 serve`

const url = "http://localhost:8080"
jest.setTimeout(10000)

describe("Markdown", () => {
    test("should render markdown via content property", async () => {
        await page.goto(`${url}/index.html`)
        await expect(page).toMatchElement("em", { text: "markdown is nice!" })
    })
    test("should render markdown via fromFile property", async () => {
        await page.goto(`${url}/index.html`)
        await expect(page).toMatchElement("h1", { text: "first" })
        await expect(page).toMatchElement("h2", { text: "second" })
        await expect(page).toMatchElement("h3", { text: "third" })
    })

    test("should render markdown via binding", async () => {
        await page.goto(`${url}/index.html`)
        await expect(page).toMatchElement("strong", { text: "fat content" })
    })
})
