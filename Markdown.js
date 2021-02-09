sap.ui.define(["sap/ui/core/Control", "./marked/marked.min"], (Control, /* marked */) => {
    return Control.extend("cc.md.Markdown", {
        metadata: {
            properties: {
                content: { type: "string", defaultValue: "", bindable: "bindable" },
                fromFile: { type: "string", defaultValue: "", bindable: "bindable" }
            }
        },
        init() {
            console.debug(`[${this.getMetadata().getName()}] > init`)
        },
        renderer: {
            apiVersion: 2, // high-perf!
            /**
             * create the view layer by outputting html
             *
             * @param {sap.ui.core.RenderManager} oRM
             * @param {sap.ui.core.Control} oControl
             */
            render(oRM, oControl) {
                console.debug(`[${oControl.getMetadata().getName()}] > rendering`)
                oRM.openStart("div", oControl)
                oRM.openEnd()
                // hack(y): if control's content property is filled,
                // render its content (md-string) -> html
                // BUT: if control's fromFile property is filled,
                // retrieve that $fromFile's content,
                // then abuse ui5 control lifecycle to set `content` property
                // with retrieved $fromFile's content, triggering re-rendering
                if (oControl.getContent() !== "") {
                    const sMarkdown = oControl.getContent()
                    const sHtml = marked(sMarkdown)
                    oRM.unsafeHtml(sHtml)
                } else if (oControl.getFromFile() !== "") {
                    fetch(oControl.getFromFile())
                        .then((r) => r.text())
                        .then((md) => oControl.setContent(md))
                        .catch((err) => console.error(`[${oControl.getMetadata().getName()}] > ERR: ${err}`))
                }
                oRM.close("div")
            }
        }
    })
})
