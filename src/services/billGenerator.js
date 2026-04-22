// services/billGenerator.js
const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');

class BillGenerator {
    constructor(saleData) {
        this.saleData = saleData;
    }

    generateBarcodeDataURL(code) {
        try {
            const canvas = createCanvas(300, 60);
            JsBarcode(canvas, code, {
                format: "CODE128",
                width: 1.5,
                height: 30,
                displayValue: true,
                fontSize: 12,
                margin: 5
            });
            return canvas.toDataURL();
        } catch (error) {
            console.error('Barcode generation error:', error);
            return '';
        }
    }

    formatNumber(num) {
        return new Intl.NumberFormat('en-LK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    }

    generateHTML() {
        const { sale, customer, items, payment, companySettings } = this.saleData;
        const barcodeDataUrl = this.generateBarcodeDataURL(sale.sales_code);
        
        const itemsHtml = items.map((item, index) => {
            const itemName = item.item_name.length > 25 ? item.item_name.substring(0, 25) + '...' : item.item_name;
            const discountAmount = (item.price * item.quantity) - item.subtotal;
            
            return `
                <table style="font-size: 11px; margin-bottom: 1px;">
                    <tr>
                        <td style="width: 10%;">${index + 1}&#41;</td>
                        <td colspan="5" class="sinhala_maybe" style="width: 42%;">
                            ${this.escapeHtml(itemName)}
                        </td>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="font-size: 9px; white-space: nowrap; font-weight: bold; width: 25%;">
                            ${this.escapeHtml(item.item_code)}
                        </td>
                        <td style="font-size: 9px; white-space: nowrap; font-weight: bold; width: 18%; text-align: center;">
                            ${item.quantity}
                        </td>
                        <td style="font-size: 9px; width: 25%; font-weight: bold;">
                            ${discountAmount > 0 ? '&#8194; &#8194;' + this.formatNumber(item.price) : this.formatNumber(item.price)}
                        </td>
                        <td style="font-size: 9px; width: 24%; text-align: right; font-weight: bold; padding-right: 2px;">
                            ${this.formatNumber(item.price)}
                        </td>
                        <td class="item-total-pr" style="font-size: 9px; width: 28%; text-align: right; font-weight: bold;">
                            ${this.formatNumber(item.subtotal)}
                        </td>
                    </tr>
                </table>
            `;
        }).join('');

        const grandTotal = items.reduce((sum, i) => sum + i.subtotal, 0);
        const totalDiscount = items.reduce((sum, i) => sum + ((i.price * i.quantity) - i.subtotal), 0);
        const receivedAmount = payment.received_amount || 0;
        const changeAmount = Math.max(0, receivedAmount - grandTotal);
        const paidAmount = Math.min(receivedAmount, grandTotal);
        const dueAmount = Math.max(0, grandTotal - receivedAmount);
        const paymentType = payment.payment_type || 'CASH';
        const ciType = dueAmount > 0 ? 'CREDIT' : 'DEBIT';

        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sale Receipt #${sale.sales_code}</title>
    <style>
        :root {
            --paper-width: 75mm;
        }
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
        }
        @page {
            size: var(--paper-width) auto;
            width: var(--paper-width);
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            margin: 0px !important;
            padding: 0px;
            width: var(--paper-width);
            max-width: 300px;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .bolder { font-weight: bolder; }
        .small { font-size: 10px; }
        .text-xs { font-size: 7px; display: inline-block; margin: 0; padding: 0; }
        .line { border-bottom: 1px dashed #000; margin: 2px 0; width: 100%; }
        .underline { border-bottom: 1px dashed #000; display: inline-block; width: 100%; margin: 2px 0; }
        .uppercase { text-transform: uppercase !important; }
        table { width: 100%; border-collapse: collapse; font-size: inherit; }
        td { padding: 1px 2px; vertical-align: top; }
        .info-row td { padding: 1px 0; }
        .item-header { font-size: 9px; font-weight: bold; }
        .item-row td { padding: 1px 0; }
        .total-section { margin-top: 3px; }
        .footer { margin-top: 5px; font-size: 8px; }
        .sinhala_maybe {
            font-family: Arial !important;
            font-weight: bold !important;
            font-size: 9px !important;
        }
        .capitalize { text-transform: capitalize !important; }
        .footer-pr { padding-right: 8px; }
        .sale-pr { padding-right: 8px; }
        .item-total-pr { padding-right: 6px; }
        .barcode-img {
            width: 100%;
            max-width: 200px;
            height: auto;
        }
    </style>
</head>
<body>
    <div id="invoice" style="padding-right: 1mm;">
        <!-- Company Info -->
        <div class="center bolder capitalize" style="font-size: 17px; text-transform: capitalize;">
            ${this.escapeHtml(companySettings?.site_name || 'Hypermart')}
        </div>
        <div class="center" style="font-size: 12px;">
            ${this.escapeHtml(companySettings?.address || '8th Mile Post, Kandy Road, Mawathagama')}
        </div>
        <div class="center bold" style="font-size: 14px;">
            ${this.escapeHtml(companySettings?.contact_number || '+94773610779')}
        </div>
        <div class="center" style="font-size: 12px;">
            ${this.escapeHtml(companySettings?.email || 'support@hypermart.com')}
        </div>
        <div class="center bold p-0 m-0">SALE CODE: ${sale.sales_code}</div>
        <br>
        <div class="center">
            <img src="${barcodeDataUrl}" class="barcode-img" alt="Barcode">
        </div>
        <div style="border-bottom: 1px dashed #000; margin: 3px 0;"></div>

        <!-- Sale Information -->
        <table style="font-size: 9px; width: 100%; margin-top: 5px;">
            <tr>
                <td style="width: 20%;">DATE:</td>
                <td style="width: 30%;">${sale.date.split('T')[0]}</td>
                <td style="width: 20%; text-align: right;">TIME:</td>
                <td class="sale-pr" style="width: 30%; text-align: right;">${sale.date.split('T')[1]?.substring(0, 5) || ''}</td>
            </tr>
            <tr>
                <td>CUS:</td>
                <td>${customer ? this.escapeHtml(customer.customer_name) : 'WALK-IN CUSTOMER'}</td>
                <td style="text-align: right;">VAT NO:</td>
                <td class="sale-pr" style="text-align: right;">${customer?.vat_number || '-'}</td>
            </tr>
            <tr>
                <td>PTYPE:</td>
                <td>${paymentType}</td>
                <td style="text-align: right;">USER:</td>
                <td class="sale-pr" style="text-align: right;">${this.escapeHtml(sale.user_name || 'ADMIN')}</td>
            </tr>
            <tr>
                <td>STYPE:</td>
                <td>${sale.pricing_mode?.toUpperCase() || 'RETAIL'}</td>
                <td style="text-align: right;">CI TYPE:</td>
                <td class="sale-pr" style="text-align: right;">${ciType}</td>
            </tr>
        </table>

        <div class="underline"></div>

        <!-- Items Header -->
        <table style="font-size: 9px; font-weight: bold;">
            <tr>
                <td style="width: 10%;">LN</td>
                <td style="width: 27%;">ITEM</td>
                <td style="width: 18%; text-align: center;">QTY</td>
                <td style="width: 20%; white-space: nowrap; text-align: center;">PRICE</td>
                <td style="width: 24%; text-align: right;">AMOUNT</td>
            </tr>
        </table>

        ${itemsHtml}

        <div class="underline"></div>

        <!-- Totals Section -->
        <div class="total-section">
            <table style="font-size: 11px; width: 100%;">
                <tr>
                    <td style="width: 60%;">TOTAL</td>
                    <td style="width: 5%;">:</td>
                    <td class="footer-pr" style="width: 30%; text-align: right;">${this.formatNumber(grandTotal)}</td>
                </tr>
                ${totalDiscount > 0 ? `
                <tr>
                    <td>DISCOUNT</td>
                    <td>:</td>
                    <td class="footer-pr" style="text-align: right;">${this.formatNumber(totalDiscount)}</td>
                </tr>
                ` : ''}
                <tr style="font-weight: bold;">
                    <td>NET TOTAL</td>
                    <td>:</td>
                    <td class="footer-pr" style="text-align: right;">${this.formatNumber(grandTotal)}</td>
                </tr>
                <tr>
                    <td>RECEIVED</td>
                    <td>:</td>
                    <td class="footer-pr" style="text-align: right;">${this.formatNumber(receivedAmount)}</td>
                </tr>
                <tr>
                    <td>PAID</td>
                    <td>:</td>
                    <td class="footer-pr" style="text-align: right;">${this.formatNumber(paidAmount)}</td>
                </tr>
                ${changeAmount > 0 ? `
                <tr>
                    <td>CHANGE</td>
                    <td>:</td>
                    <td class="footer-pr" style="text-align: right;">${this.formatNumber(changeAmount)}</td>
                </tr>
                ` : ''}
                ${dueAmount > 0 ? `
                <tr style="font-weight: bold; color: red;">
                    <td>DUE AMOUNT</td>
                    <td>:</td>
                    <td class="footer-pr" style="text-align: right;">${this.formatNumber(dueAmount)}</td>
                </tr>
                ` : ''}
                <tr>
                    <td>NO OF ITEMS</td>
                    <td>:</td>
                    <td class="footer-pr" style="text-align: right;">${items.length}</td>
                </tr>
                <tr>
                    <td>TOTAL QTY</td>
                    <td>:</td>
                    <td class="footer-pr" style="text-align: right;">${items.reduce((sum, i) => sum + i.quantity, 0)}</td>
                </tr>
            </table>
        </div>

        ${payment.split_payments && payment.split_payments.length > 0 ? `
        <div style="border-bottom: 1px dashed #000; margin: 5px 0;"></div>
        <div class="total-section">
            <table style="font-size: 9px; width: 100%;">
                <tr style="font-weight: bold;">
                    <td colspan="3" style="text-align: center;">SPLIT PAYMENTS</td>
                </tr>
                ${payment.split_payments.map(sp => `
                <tr>
                    <td style="width: 60%;">${sp.source_type}</td>
                    <td style="width: 5%;">:</td>
                    <td style="width: 30%; text-align: right;">${this.formatNumber(sp.amount)}</td>
                </tr>
                `).join('')}
            </table>
        </div>
        ` : ''}

        <div style="border-bottom: 1px dashed #000; margin: 5px 0;"></div>

        <!-- Footer -->
        <div class="footer center uppercase footer-pr">
            <div style="margin: 3px 0;" class="bold">THANK YOU! VISIT AGAIN</div>
            <div style="margin: 3px 0;" class="bold">
                # Exchange within 07 days if item is in good condition.
            </div>
            <div style="margin: 3px 0;" class="bold">
                # Bill must be produced for claims.
            </div>
        </div>

        <div style="border-bottom: 1px dashed #000; margin: 3px 0;"></div>

        <div class="footer center uppercase footer-pr">
            <div style="margin: 3px 0; font-size: 8px;" class="bold">Powered by Silicon Radon Networks (Pvt) Ltd.</div>
        </div>
    </div>
</body>
</html>`;
    }

    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

module.exports = BillGenerator;