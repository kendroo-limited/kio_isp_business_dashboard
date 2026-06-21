# -*- coding: utf-8 -*-
# from odoo import http


# class KioIspBusinessDashboard(http.Controller):
#     @http.route('/kio_isp_business_dashboard/kio_isp_business_dashboard', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/kio_isp_business_dashboard/kio_isp_business_dashboard/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('kio_isp_business_dashboard.listing', {
#             'root': '/kio_isp_business_dashboard/kio_isp_business_dashboard',
#             'objects': http.request.env['kio_isp_business_dashboard.kio_isp_business_dashboard'].search([]),
#         })

#     @http.route('/kio_isp_business_dashboard/kio_isp_business_dashboard/objects/<model("kio_isp_business_dashboard.kio_isp_business_dashboard"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('kio_isp_business_dashboard.object', {
#             'object': obj
#         })

