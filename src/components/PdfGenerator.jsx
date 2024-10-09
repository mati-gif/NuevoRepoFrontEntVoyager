import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import logo from "../assets/logo.png"
import { Receipt } from 'lucide-react'
import { useSelector } from 'react-redux';
import { div } from 'framer-motion/m';

const PdfGenerator = () => {
    const generatePDF = () => {
        const input = document.getElementById('pdf-content'); // El id del div que deseas convertir en PDF

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; // Ancho de la imagen en el PDF
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('documento.pdf'); // Nombre del archivo PDF que se descargará
        });
    };


    const listProducts = JSON.parse(localStorage.getItem("product"));
    const sendTotal = JSON.parse(localStorage.getItem("totalAPagar"));
    // const name = JSON.parse(localStorage.getItem("totalAPagar"));



    const { firstName, lastName } = useSelector(store => store.auth.user)



    return (
        //         <div>
        //             <div id="pdf-content" style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>

        //                 <div className='flex flex-row '>
        //                     <img src={logo} alt="" className='w-[150px] h-[150px]' />
        //                     <h1 className='inline-block m-auto border-4 border-black text-[40px] font-bold'>Voyager </h1>
        //                 </div>
        //                 <div className=''>
        //                     <p>Este es un párrafo de ejemplo que aparecerá en el PDF.</p>
        //                 </div>
        //                 {listProducts.map((list) => {

        //                     return (<div className='felx flex-row w-full gap-10'>
        //                         <h1 className='inline-block mr-[10px] font-bold'>{list.quantity
        //                         }</h1>
        //                         <h1 className='inline-block mr-[10px]  font-bold'>{list.nameProduct
        //                         }</h1>
        //                         <h1 className='inline-block font-bold'>$ {list.priceProduct * list.quantity} </h1>
        //                     </div>)

        //                 })}

        // <p>Total: {sendTotal} </p>
        //             </div>
        //             <button onClick={generatePDF}>Generar PDF</button>
        //         </div>


<div>
<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-yellow-400 p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                        <span className="text-4xl">
                        <img src={logo} alt="" />
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-800 ml-[20px] ">Voyager</h1>
                </div>

            </div>
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Receipt</h2>
                <div className="space-y-2">
                    {listProducts.map((item, index) => (
                        <div key={index} className="flex justify-between ">
                            <span>{item.quantity} {item.nameProduct}</span>
                            <span className=''>${item.priceProduct.toFixed(2)}</span>
                            <span>$ {item.priceProduct * item.quantity} </span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold">Total:</span>
                        <span className="text-xl font-bold">${sendTotal}</span>
                    </div>
                </div>
            </div>
            <div className="bg-yellow-400 px-6 py-3 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800">Thank {`${firstName} ${lastName}`} for your purchase!</span>
                <Receipt className="text-gray-800" size={20} />
            </div>

        </div>
                    <div className='mt-[10px] bg-yellow-500 p-2 font-bold rounded-lg border-2 border-black w-full flex flex-row justify-center'>
                    <button className='' onClick={generatePDF}>Generar PDF</button>
                    </div>
</div>
    );
};

export default PdfGenerator;
