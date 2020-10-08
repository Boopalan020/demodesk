import Axios from 'axios'
import React from 'react'
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver'

function MemoTableComponent() {

    const memoData = {
        vehicle_no : 'TN 55 AB 2467',from : '2020-10-12',to : '2020-10-21',driver_name : 'magudeswaran',cleaner_name : 'saravanan',calc_date : '2020-10-06',
        advance_amount : '35000',start_km : '45234',end_km : '48978',total_km : '2214',milege : '3.5',
        Loads : 
        [
            {
                date : '2020-09-06',
                origin : 'Sankagiri',
                end_point : 'Pollachi',
                type : 'Soap',
                weight : '22',
                rent : '105000',
                loading_cost : '4500',
                unloading_cost : '4700',
                commission : '3000',
            },
        ],
        diesel : 
        [
            {
                filled_date : '',
                litre : '0',
                rate : '0',
                rate_on_day : '0',
                place : ''
            }
        ],
        total_diesel_litre : '621',new_tyre : '0',old_tyre : '0',
        expense_details : 
        [
            {
                reason : 'tyre',
                amount : '3456'
            }
        ],
        rto_details : 
        [
            {
                place : 'sankagiri',
                amount : '100'
            },
        ],
        trip_duration : '0',total_diesel_amount : '30000',total_commission : '10000',total_loading : '2500',
        total_unloading : '2500',total_expense : '6000',driver_salary : '0',cleaner_salary : '0',pathayam : '0',
        workshop : '0',total_rto : '8000',toll_gate : '0',total_rent : '105500',bill_padi : '0',trip_expense : '0',
        final_balance : 
        {
            hands_on : '0',
            income_day : '0',
            income_km : '0',
            expense_km : '0'
        }
    }

    const getPDFfunction = () => {
        var buf;
        Axios.get('http://localhost:3001/pdffile',
        {
            responseType : 'arraybuffer',
            headers: {
                Accept: 'application/pdf',
            },
        })
        .then(async(res) => {

            var d = new Date(memoData.calc_date);
            var calc_dates = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()
            
            d = new Date(memoData.from);
            var from_date = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()

            d = new Date(memoData.to)
            var to_date = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()
            
            buf = new Buffer.alloc(res.data.byteLength)
            var view = new Uint8Array(res.data)
            for(var i = 0; i < buf.length; ++i )
            {
                buf[i] = view[i]
            }
            const pdfDoc = await PDFDocument.load(buf)

            // ---------------------------------------
            const pages = pdfDoc.getPages()
            const firstPage = pages[0]
            const secondPage = pages[1]
            const { width, height } = firstPage.getSize()
            
            // For Top 3 rows============
            firstPage.drawText(memoData.vehicle_no, {   // Vehicle Number
                x: 110,
                y: 560,
                size: 12,
            })
            firstPage.drawText(memoData.advance_amount, {   //Advance amount
                x: 330,
                y: 560,
                size: 12,
            })
            firstPage.drawText(memoData.milege+' km/lit', {       //Mileage
                x: 530,
                y: 560,
                size: 12,
            })
            firstPage.drawText(calc_dates, {        // Calculated date
                x: 700,
                y: 560,
                size: 12,
            })
            //----------------------------------------
            firstPage.drawText(memoData.start_km, {     // Starting kilometer
                x :120,
                y :540,
                size :12
            })
            firstPage.drawText(memoData.end_km, {       //End kilo meter
                x :320,
                y :540,
                size :12
            })
            firstPage.drawText(memoData.total_km, {     //Total km
                x :540,
                y :540,
                size :12
            })
            firstPage.drawText(memoData.total_diesel_litre, {   // Total Diesel litres
                x :700,
                y :540,
                size :12
            })
            //------------------------------------------
            firstPage.drawText(memoData.driver_name, {      //driver name
                x :150,
                y :515,
                size :12
            })
            firstPage.drawText(memoData.cleaner_name, {     //cleaner name
                x :510,
                y :515,
                size :12
            })
            firstPage.drawText(from_date, {     //from date
                x :630,
                y :515,
                size :12
            })
            firstPage.drawText(to_date, {     //to date
                x :720,
                y :515,
                size :12
            })
            // end ---- top 3 rows=======

            // printing trip information
            var xval = 34
            var yval = 470
            var printable = ''
            for ( i = 0 ; i < memoData.Loads.length ; i++)
            {
                console.log("i-Value", memoData.Loads.length)
                xval = 34
                for(var col = 1 ; col <= 8 ; col++)
                {
                    printable = ''
                    switch(col)
                    {
                        case 1 : 
                                d = new Date(memoData.Loads[i].date)
                                printable += d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()
                                break
                        case 2 : 
                                printable += memoData.Loads[i].origin + ' to ' + memoData.Loads[i].end_point
                                xval = 95
                                break
                        case 3 :
                                printable += memoData.Loads[i].type
                                xval = 290
                                break
                        case 4 :
                                printable += memoData.Loads[i].weight
                                xval = 345
                                break
                        case 5 :
                                printable += memoData.Loads[i].rent
                                xval = 368
                                break
                        case 6 :
                                printable += memoData.Loads[i].commission
                                xval = 420
                                break
                        case 7 :
                                printable += memoData.Loads[i].loading_cost
                                xval = 500
                                break
                        case 8 :
                                printable += memoData.Loads[i].unloading_cost
                                xval = 580
                                break
                        default : printable = ''
                    }
                    firstPage.drawText(printable, {
                        x : xval,
                        y : yval,
                        size : 10
                    })
                }
                yval -= 16                
            }
            firstPage.drawText(memoData.total_rent, {        //Total rent
                x : 368,
                y : yval,
                size : 10
            })
            firstPage.drawText(memoData.total_commission, {  // Tota commission
                x : 420,
                y : yval,
                size : 12
            })
            firstPage.drawText(memoData.total_loading, {    //total Loading
                x : 500,
                y : yval,
                size : 12
            })
            firstPage.drawText(memoData.total_unloading, {  //total unloading
                x : 580,
                y : yval,
                size : 12
            })
            // ending trip information

            //Other Expense Data
            yval = 470
            
            for( i = 0 ; i < memoData.expense_details.length ; i++)
            {
                firstPage.drawText(memoData.expense_details[i].reason, {
                    x :640,
                    y :yval,
                    size :12
                })
                firstPage.drawText(memoData.expense_details[i].amount, {
                    x :740,
                    y :yval,
                    size :12
                })
                if(i <= 14)
                    yval -= 16
                else
                    yval -= 17
            }
            firstPage.drawText("Total", {
                x :640,
                y :yval,
                size :12
            })
            firstPage.drawText(memoData.total_expense, {
                x :740,
                y :yval,
                size :12
            })
            //End of Other expense data

            // printing diesel data
            
            // end of printing diesel data

            // printing RTO details
            yval = 500
            for(i = 0 ; i < memoData.rto_details.length ; i++)
            {
                secondPage.drawText(memoData.rto_details[i].place, {
                    x : 50,
                    y : yval,
                    size : 12
                })
                secondPage.drawText(memoData.rto_details[i].amount, {
                    x : 190,
                    y : yval,
                    size : 12
                })
                if(i < 10)
                    yval -= 16
                else if(i >=10 && i < 20)
                    yval -= 15
                else if(i >= 20 && i < 24)
                    yval -= 17
                else 
                    yval -= 15  
            }
            secondPage.drawText("Total", {
                x :100,
                y :yval,
                size :12
            })
            secondPage.drawText(memoData.total_rto, {
                x :190,
                y :yval,
                size :12
            })
            // end of RTO details printing

            // ---------------------------------------
            const pdfBytes = await pdfDoc.save()
            var blob = new Blob([pdfBytes], {type: "application/pdf;charset=utf-8"});
            console.log(blob)
            saveAs(blob, "Memoscreated.pdf");
        })
    }
    return (
        <div>
            <button 
                type = 'button'
                onClick = {() => getPDFfunction()}
            >
                Get PDF file
            </button>
        </div>
    )
}

export default MemoTableComponent
