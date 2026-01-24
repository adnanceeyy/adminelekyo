import React, { useRef, useState } from "react";
import { IconPrinter, IconX, IconPackage, IconTruckDelivery, IconReceipt } from "@tabler/icons-react";

const InvoiceModal = ({ order, onClose, isDark }) => {
    const printRef = useRef();
    const [printSize, setPrintSize] = useState("80mm"); // Default to 80mm

    const handlePrint = () => {
        const isThermal = ["80mm", "58mm"].includes(printSize);
        const thermalWidth = printSize === "58mm" ? "58mm" : "80mm";
        const isA5 = printSize === "A5";
        const isLetter = printSize === "Letter";
        const printContent = printRef.current.innerHTML;

        const printWindow = window.open('', '', 'height=800,width=800');

        if (!printWindow) {
            alert('Please allow pop-ups to print the invoice.');
            return;
        }

        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Invoice - ${order._id || 'Print'}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        /* Base Print Settings */
                        @page { 
                            margin: 0;
                            size: ${isThermal ? `${thermalWidth} auto` : isA5 ? 'A5 landscape' : isLetter ? 'letter' : 'A4'};
                        }
                        
                        body { 
                            margin: 0; 
                            padding: 0; 
                            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                            background: white; 
                            -webkit-print-color-adjust: exact; 
                            print-color-adjust: exact;
                        }

                        /* Thermal Specifics */
                        ${isThermal ? `
                            body { 
                                width: 100%; 
                                max-width: ${thermalWidth};
                            }
                            .thermal-container {
                                width: 100%;
                                padding: ${printSize === "58mm" ? '2mm' : '4mm'};
                                box-sizing: border-box;
                            }
                            .thermal-text {
                                font-family: 'Courier New', Courier, monospace;
                                color: black;
                            }
                        ` : `
                            body {
                                padding: 20px;
                            }
                            /* Force A4/Standard width if needed, essentially 100% of page */
                            .a5-container, .standard-container {
                                width: 100%;
                            }
                        `}

                        @media print {
                            .no-print { display: none; }
                            body { -webkit-print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body>
                    <div class="${isThermal ? 'thermal-container' : isA5 ? 'a5-container' : 'standard-container'}">
                        ${printContent}
                    </div>
                    <script>
                        window.onload = function() {
                            // Ensure styles are effectively applied
                            setTimeout(function() {
                                window.focus();
                                window.print();
                                // Optional: simple auto-close logic if needed
                                // window.close();
                            }, 800);
                        };
                    </script>
                </body>
            </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
    };

    if (!order) return null;

    const totalAmount = order.paymentSummary?.total || order.totalAmount || 0;
    const subtotal = order.paymentSummary?.subtotal || (order.orderedItems?.reduce((acc, item) => acc + (item.totalPrice || 0), 0) || 0);
    const shipping = order.paymentSummary?.shipping || 0;
    const tax = order.paymentSummary?.tax || 0;

    const StandardLayout = () => (
        <div className="p-8 bg-white text-black min-h-[297mm]">
            <div className="flex justify-between items-start mb-10 pb-8 border-b-2 border-gray-900">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-blue-900 mb-2">ELECKYO</h1>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Premium Electronics Store</p>
                    <div className="mt-4 text-xs text-gray-600 leading-relaxed font-medium">
                        123 Tech Park, Digital City<br />
                        Kochi, Kerala - 682001<br />
                        GSTIN: 32AAAFE1234F1Z5
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-5xl font-black text-gray-100 uppercase tracking-tighter mb-4">Invoice</h2>
                    <div className="space-y-1">
                        <p className="text-sm font-black">INV #{(order.id || order._id || "").slice(-8).toUpperCase()}</p>
                        <p className="text-xs font-medium text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-xs font-medium text-gray-500 uppercase">Status: <span className="text-emerald-600 font-bold">{order.status}</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Bill To</p>
                    <h4 className="text-lg font-black text-gray-900">{order.customerDetails?.name}</h4>
                    <p className="text-sm font-medium text-gray-600 mt-1 leading-relaxed">
                        {order.customerDetails?.address?.street}<br />
                        {order.customerDetails?.address?.city}, {order.customerDetails?.address?.postalCode}<br />
                        {order.customerDetails?.address?.country}
                    </p>
                    <div className="mt-3 space-y-0.5">
                        <p className="text-xs font-bold text-gray-800 flex items-center gap-2"><span>E:</span> {order.customerDetails?.email}</p>
                        <p className="text-xs font-bold text-gray-800 flex items-center gap-2"><span>P:</span> {order.customerDetails?.phone}</p>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Shipping Details</p>
                    <p className="text-sm font-bold text-gray-800 uppercase flex items-center gap-2 mb-2"><IconTruckDelivery size={16} /> Priority Dispatch</p>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                        Method: Express Delivery<br />
                        Estimated: 3-5 Business Days
                    </p>
                </div>
            </div>

            <table className="w-full mb-10">
                <thead>
                    <tr className="border-y-2 border-gray-900">
                        <th className="py-4 px-2 text-left text-[10px] font-black uppercase tracking-widest text-gray-900">Description</th>
                        <th className="py-4 px-2 text-center text-[10px] font-black uppercase tracking-widest text-gray-900">Qty</th>
                        <th className="py-4 px-2 text-right text-[10px] font-black uppercase tracking-widest text-gray-900">Unit Price</th>
                        <th className="py-4 px-2 text-right text-[10px] font-black uppercase tracking-widest text-gray-900">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100">
                    {order.orderedItems?.map((item, idx) => (
                        <tr key={idx}>
                            <td className="py-6 px-2">
                                <p className="font-black text-gray-900 uppercase text-xs">{item.itemName}</p>
                                <p className="text-[9px] font-bold text-gray-400 mt-1">CAT: {order.category || 'General'}</p>
                            </td>
                            <td className="py-6 px-2 text-center text-sm font-bold text-gray-700">{item.quantity}</td>
                            <td className="py-6 px-2 text-right text-sm font-bold text-gray-700">₹{item.unitPrice?.toLocaleString()}</td>
                            <td className="py-6 px-2 text-right text-sm font-black text-gray-900">₹{item.totalPrice?.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end pt-6">
                <div className="w-72 space-y-4">
                    <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
                        <span>Subtotal</span>
                        <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <span>GST (18%)</span>
                        <span className="text-gray-900">₹{(subtotal * 0.18).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <span>Shipping</span>
                        <span className="text-emerald-600">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    <div className="h-0.5 bg-gray-900 w-full mt-4" />
                    <div className="flex justify-between items-center py-2">
                        <span className="text-base font-black uppercase">Grand Total</span>
                        <span className="text-3xl font-black text-blue-900 tracking-tighter">₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="h-1 bg-gray-900 w-full mt-1" />
                </div>
            </div>

            <div className="mt-auto pt-20 text-center">
                <p className="text-2xl font-black text-blue-900 uppercase tracking-widest italic opacity-20">Eleckyo Official Invoice</p>
                <div className="mt-8 flex justify-between items-end border-t border-gray-100 pt-8">
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Store Seal</p>
                        <div className="w-20 h-20 border-2 border-blue-900/10 rounded-full flex items-center justify-center">
                            <IconReceipt size={32} className="text-blue-900 opacity-20" />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-900 mb-2">Authorized Signature</p>
                        <div className="w-48 border-b-2 border-gray-900" />
                    </div>
                </div>
            </div>
        </div>
    );

    const ThermalLayout = () => (
        <div className="p-4 bg-white text-black font-mono text-[10px] leading-tight w-full">
            <div className="text-center border-b border-dashed border-black pb-4 mb-4">
                <h1 className="text-xl font-bold tracking-tighter">ELECKYO</h1>
                <p className="font-bold">PREMIUM ELECTRONICS</p>
                <p className="mt-1">City Mall, Digital Park, Kochi</p>
                <p className="font-bold border-t border-dashed border-black mt-2 pt-1">#{(order.id || order._id || "").slice(-10).toUpperCase()}</p>
            </div>

            <div className="mb-4 space-y-1">
                <p>DATE: {new Date(order.createdAt).toLocaleString()}</p>
                <p>CUST: {order.customerDetails?.name}</p>
                <p>PHON: {order.customerDetails?.phone}</p>
            </div>

            <table className="w-full mb-4 border-y border-dashed border-black">
                <thead>
                    <tr className="text-left">
                        <th className="py-1">ITEM</th>
                        <th className="text-center py-1">QTY</th>
                        <th className="text-right py-1">PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {order.orderedItems?.map((item, idx) => (
                        <tr key={idx}>
                            <td className="py-1 line-clamp-1">{item.itemName}</td>
                            <td className="text-center py-1">{item.quantity}</td>
                            <td className="text-right py-1">₹{item.totalPrice?.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="space-y-1 mb-4">
                <div className="flex justify-between">
                    <span>SUBTOTAL:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{(subtotal * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>SHIPPING:</span>
                    <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-xs border-t border-dashed border-black pt-1">
                    <span>GRAND TOTAL:</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                </div>
            </div>

            <div className="text-center text-[8px] border-t border-dashed border-black pt-4">
                <p className="font-bold uppercase tracking-widest">Thank You for shopping!</p>
                <p className="mt-1">VISIT: www.eleckyo.com</p>
                <p className="mt-2 text-[6px]">** THIS IS A COMPUTER GENERATED INVOICE **</p>
            </div>
        </div>
    );

    const isThermal = ["80mm", "58mm"].includes(printSize);

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className={`bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"}`}>
                <div className={`flex justify-between items-center p-4 border-b ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-gray-50/50"}`}>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20">
                            <IconPrinter size={20} stroke={2.5} />
                        </div>
                        <div>
                            <h3 className={`font-black text-sm uppercase tracking-widest ${isDark ? "text-white" : "text-gray-900"}`}>Export Invoice</h3>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Select format & print</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            {['80mm', '58mm', 'A4', 'A5', 'Letter'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setPrintSize(size)}
                                    className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${printSize === size ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                >{size}</button>
                            ))}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400">
                            <IconX size={20} />
                        </button>
                    </div>
                </div>

                <div className={`overflow-y-auto p-8 custom-scrollbar flex justify-center ${isDark ? "bg-gray-950/50" : "bg-gray-100/30"}`}>
                    <div
                        className={`shadow-2xl overflow-hidden bg-white ${isThermal ? (printSize === "58mm" ? "w-[58mm]" : "w-[80mm]") : "w-full max-w-[210mm]"}`}
                        ref={printRef}
                    >
                        {isThermal ? <ThermalLayout /> : <StandardLayout />}
                    </div>
                </div>

                <div className={`p-4 border-t flex justify-end gap-3 ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-100 bg-gray-50"}`}>
                    <button onClick={onClose} className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-700 transition-all">Cancel</button>
                    <button
                        onClick={handlePrint}
                        className="px-8 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
                    >
                        Confirm & Print {printSize}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
