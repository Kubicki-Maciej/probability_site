import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function SingleChart(
  {clickedElement, chartLabelData, chartProbabilityData, tableName, indexPicker}
){

  let color = 'rgba(1, 132, 255, 0.5)'

  if(tableName == 'To Hit'){
    color = 'rgba(1, 132, 255, 0.5)'
  }
  if(tableName== 'To Wound'){
    color = 'rgba(1, 132, 255, 0.5)'
  }
  if(tableName== 'To Save'){
    color = 'rgba(255, 1, 1, 0.5)'
  }

  function sumProbabilityLabel(index){
    let summ =0
    for(let i=index;i < chartLabelData.length; i++){
      summ = summ + chartProbabilityData[i]
    }
    
    return summ
  }

  function sumProbabilityReverseLabel(index){
    let summ =0
    let list = chartProbabilityData
    list.reverse()
    for(let i=index;i < chartLabelData.length; i++){
      summ = summ + list[i]
      
    }
    return summ
  }

  const labels = chartLabelData
  const data = {
        labels,
        datasets: [
          {
            label: tableName,
            data:  chartProbabilityData,
            // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: color,
            // backgroundColor: 'rgba(1, 132, 255, 0.5)',
          },
          // {
          //   label: 'Dataset 2',
          //   // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
          // },
        ],
      };
  const options = {
        onClick: (e, element)=>{
          // console.log(element);
          if (element.length > 0) {
            let clickedLabelIndex = element[0].index;
            
            
            if(tableName == 'To Hit'){
              
              indexPicker(clickedLabelIndex)
              // this.AtackElementClass.changeTableToWound(clickedLabelIndex)
            }
            if(tableName== 'To Wound'){
              indexPicker(clickedLabelIndex)
              
              // this.AtackElementClass.getValueToSave(clickedLabelIndex)
              // this.updateSaveChart(clickedLabelIndex, saveValue)
            }
            if(tableName== 'To Save'){
              // this.AtackElementClass.getValueToSave(clickedLabelIndex)
              // this.updateSaveChart(clickedLabelIndex, saveValue)
            }
          }
        },

        responsive: true,
        plugins: {
          legend: {
            // position: 'top',
          },
          title: {
            display: true,
            text: tableName,
          },
          tooltip: {
            callbacks: {
              label: ((tooltipItem, data)=>{
                let index = tooltipItem.dataIndex
                
                if(tableName=='To Save'){
                  if (index == 0){
                    return `nie obronienie żadnej kostki: ${chartProbabilityData[index].toFixed(2)}`
                  }
                  return `prawdopodobieństwo wybronienia  ${index} kości wynosi ${chartProbabilityData[index].toFixed(2)} a łacznie  ${sumProbabilityLabel(index).toFixed(2)}`
                }
                else{
                  if (index == 0){
                    return `wyrzucenie 0 kostek: ${chartProbabilityData[index].toFixed(2)}`
                  }
                  return `prawdopodobieństwo wyrzucenia  conajmniej ${index} kości wynosi: ${sumProbabilityLabel(index).toFixed(2)}
                  `
                }
              })
            }
          }
        },
      };

  return (
    // <div>chart</div>
    <div className='chartTable' >
      <Bar options={options} data={data}  />
      {/* <Bar options={options} data={data} onClick={()=>{console.log('kliknieto');}} /> */}
      <table>
        <thead>
          <tr>
            {chartLabelData.map((item, i)=>{
              return <td>{item}</td> 
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              chartProbabilityData.map((item, i) =>{
                return <td>{item.toFixed(2)} %</td> 
              })
            }
          </tr>
        </tbody>
        
      </table>
    </div>
    
  )
}
