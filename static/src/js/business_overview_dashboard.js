/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, onWillStart, useState } from "@odoo/owl";

export class BusinessOverviewDashboard extends Component {
    setup() {
        this.orm = useService("orm");
        this.action = useService("action");
        this.state = useState({ loading: true, data: {} });

        onWillStart(async () => {
            this.state.data = await this.orm.call("kio.isp.business.dashboard", "get_dashboard_data", []);
            this.state.loading = false;
        });
    }

    formatCurrency(amount) {
        const currency = this.state.data.currency || {};
        const value = Math.abs(amount || 0).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        const formatted = currency.position === "after" ? `${value} ${currency.symbol || ""}` : `${currency.symbol || ""} ${value}`;
        return amount < 0 ? `-${formatted}` : formatted.trim();
    }

    formatMetric(item) {
        if (item.value_type === "number") {
            return (item.value || 0).toLocaleString();
        }
        return this.formatCurrency(item.value);
    }

    formatPercent(value) {
        return `${Math.round(value || 0)}%`;
    }

    donutStyle(items) {
        const colors = {
            blue: "#2563eb",
            green: "#16a34a",
            orange: "#f59e0b",
            red: "#ef4444",
            violet: "#7c3aed",
            cyan: "#0891b2",
        };
        let cursor = 0;
        const stops = (items || []).map((item) => {
            const start = cursor;
            cursor += item.ratio || 0;
            return `${colors[item.tone] || colors.blue} ${start}% ${cursor}%`;
        });
        return `background: conic-gradient(${stops.join(", ") || "#e5e7eb 0% 100%"});`;
    }

    openInvoices() {
        this.action.doAction("account.action_move_out_invoice_type");
    }

    openBills() {
        this.action.doAction("account.action_move_in_invoice_type");
    }
}

BusinessOverviewDashboard.template = "kio_isp_business_dashboard.BusinessOverviewDashboard";
registry.category("actions").add("kio_isp_business_dashboard.business_overview", BusinessOverviewDashboard);
