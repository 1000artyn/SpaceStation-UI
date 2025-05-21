//importing chartjs from node_modules
import Chart from '../../../node_modules/chart.js/auto/auto'
//here we are exporting const variable, which is an arrow function,
//and the arrow function takes one argument called node
export const chartRender = (node, options) => {
    console.log("Chart Render is called: ")
    const _chart = new Chart (node, options)
    return {
        update(updatedoptions) {
            _chart.data = updatedoptions.data
            _chart.update()
        },
        destroy(){
            console.log("Destroy function is called:")
            _chart.destroy()
        }
    }
}