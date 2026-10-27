(() => {
    'use strict';
    const KEY = 'resortOS-demo-v1';
    const money = n => '₱' + Number(n || 0).toLocaleString('en-PH', { maximumFractionDigits: 2 });
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
    const today = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };
    const prettyTime = t => new Date(t).toLocaleString('en-PH', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
    const seed = () => ({
        tables: Array.from({ length: 12 }, (_, i) => ({
            id: String(i + 1).padStart(2, '0'),
            name: 'Table ' + String(i + 1).padStart(2, '0'),
            active: true
        })),
        rooms: Array.from({ length: 20 }, (_, i) => ({ id: i < 10 ? 101 + i : 201 + i - 10, label: 'Room ' + (i < 10 ? 101 + i : 201 + i - 10) })),
        stays: [
            {
                id: 'S-101',
                room: 101,
                name: 'Alex Rivera',
                checkin: '2026-10-12',
                checkout: '2026-10-19',
                active: true
            },
            {
                id: 'S-108',
                room: 108,
                name: 'Sam Cruz',
                checkin: '2026-10-14',
                checkout: '2026-10-17',
                active: true
            },
            {
                id: 'S-204',
                room: 204,
                name: 'Jamie Lee',
                checkin: '2026-10-12',
                checkout: '2026-10-18',
                active: true
            },
            {
                id: 'S-205',
                room: 205,
                name: 'Taylor Kim',
                checkin: '2026-10-13',
                checkout: '2026-10-20',
                active: true
            }
        ],
        services: [
            {
                id: 1,
                name: 'Motorbike Rental',
                rate: 350,
                unit: 'hour',
                requiresUnits: true,
                unitsLabel: 'Rental duration (hours)',
                active: true
            },
            {
                id: 2,
                name: 'Extra Towels',
                rate: 75,
                unit: 'item',
                requiresUnits: false,
                active: true
            },
            {
                id: 3,
                name: 'Airport Shuttle',
                rate: 550,
                unit: 'trip',
                requiresUnits: false,
                active: true
            },
            {
                id: 4,
                name: 'Laundry Service',
                rate: 150,
                unit: 'kg',
                requiresUnits: false,
                active: true
            },
            {
                id: 5,
                name: 'Extra Bed',
                rate: 400,
                unit: 'night',
                requiresUnits: true,
                unitsLabel: 'Number of nights',
                active: true
            }
        ],
        menu: [
            {
                id: 1,
                name: 'Chicken Adobo',
                category: 'Rice Meals',
                price: 220,
                active: true
            },
            {
                id: 2,
                name: 'Grilled Fish',
                category: 'Main Dishes',
                price: 320,
                active: true
            },
            {
                id: 3,
                name: 'Pancit Canton',
                category: 'Noodles',
                price: 180,
                active: true
            },
            {
                id: 4,
                name: 'Fresh Juice',
                category: 'Beverages',
                price: 95,
                active: true
            },
            {
                id: 5,
                name: 'Halo-halo',
                category: 'Desserts',
                price: 150,
                active: true
            },
            {
                id: 6,
                name: 'Garlic Rice',
                category: 'Sides',
                price: 55,
                active: true
            },
            {
                id: 7,
                name: 'Fried Chicken',
                category: 'Main Dishes',
                price: 245,
                active: true
            },
            {
                id: 8,
                name: 'Coffee',
                category: 'Beverages',
                price: 85,
                active: true
            }
        ],
        orders: [
            {
                id: 'R-1048',
                destination: 'room',
                room: 108,
                table: '',
                items: [
                    {
                        id: 2,
                        name: 'Grilled Fish',
                        qty: 2,
                        price: 320
                    },
                    {
                        id: 4,
                        name: 'Fresh Juice',
                        qty: 2,
                        price: 95
                    },
                    {
                        id: 6,
                        name: 'Garlic Rice',
                        qty: 1,
                        price: 55
                    }
                ],
                status: 'posted',
                created: '2026-10-15T10:42:00',
                staff: 'Maria Santos',
                paymentMethod: null
            },
            {
                id: 'R-1047',
                destination: 'table',
                room: null,
                table: '03',
                items: [
                    {
                        id: 1,
                        name: 'Chicken Adobo',
                        qty: 2,
                        price: 220
                    },
                    {
                        id: 2,
                        name: 'Grilled Fish',
                        qty: 1,
                        price: 320
                    },
                    {
                        id: 4,
                        name: 'Fresh Juice',
                        qty: 2,
                        price: 95
                    }
                ],
                status: 'pending',
                created: '2026-10-15T10:22:00',
                staff: 'Maria Santos',
                paymentMethod: null
            },
            {
                id: 'R-1046',
                destination: 'room',
                room: 204,
                table: '',
                items: [
                    {
                        id: 1,
                        name: 'Chicken Adobo',
                        qty: 1,
                        price: 220
                    },
                    {
                        id: 4,
                        name: 'Fresh Juice',
                        qty: 2,
                        price: 95
                    }
                ],
                status: 'posted',
                created: '2026-10-15T09:18:00',
                staff: 'Jose Reyes',
                paymentMethod: null
            },
            {
                id: 'R-1044',
                destination: 'table',
                room: null,
                table: '02',
                items: [
                    {
                        id: 7,
                        name: 'Fried Chicken',
                        qty: 2,
                        price: 245
                    },
                    {
                        id: 8,
                        name: 'Coffee',
                        qty: 2,
                        price: 85
                    }
                ],
                status: 'awaiting_payment',
                created: '2026-10-15T10:05:00',
                staff: 'Jose Reyes',
                paymentMethod: null
            },
            {
                id: 'R-1045',
                destination: 'table',
                room: null,
                table: '06',
                items: [{
                        id: 1,
                        name: 'Chicken Adobo',
                        qty: 2,
                        price: 220
                    }],
                status: 'paid',
                created: '2026-10-15T08:40:00',
                staff: 'Jose Reyes',
                paymentMethod: 'Cash'
            }
        ],
        charges: [
            {
                id: 'C-301',
                stayId: 'S-108',
                source: 'restaurant',
                sourceId: 'R-1048',
                label: 'Restaurant order R-1048',
                amount: 885,
                paid: 0,
                status: 'unpaid',
                date: '2026-10-15T10:42:00',
                by: 'Maria Santos'
            },
            {
                id: 'C-302',
                stayId: 'S-204',
                source: 'restaurant',
                sourceId: 'R-1046',
                label: 'Restaurant order R-1046',
                amount: 410,
                paid: 0,
                status: 'unpaid',
                date: '2026-10-15T09:18:00',
                by: 'Jose Reyes'
            },
            {
                id: 'C-303',
                stayId: 'S-101',
                source: 'service',
                sourceId: null,
                label: 'Motorbike Rental · 2 hours',
                amount: 700,
                paid: 200,
                status: 'partial',
                date: '2026-10-14T16:18:00',
                by: 'Front Desk'
            },
            {
                id: 'C-304',
                stayId: 'S-108',
                source: 'service',
                sourceId: null,
                label: 'Extra Towels · 2 items',
                amount: 150,
                paid: 0,
                status: 'unpaid',
                date: '2026-10-15T09:02:00',
                by: 'Front Desk'
            }
        ],
        notifications: [],
        tickets: [],
        audit: [
            {
                time: '2026-10-15T10:42:00',
                by: 'Maria Santos',
                action: 'Posted restaurant charge R-1048 to Room 108'
            },
            {
                time: '2026-10-15T09:18:00',
                by: 'Jose Reyes',
                action: 'Posted restaurant charge R-1046 to Room 204'
            },
            {
                time: '2026-10-14T16:20:00',
                by: 'Front Desk',
                action: 'Recorded partial settlement ₱200 for Room 101'
            }
        ]
    });
    function load() {
        try {
            const old = JSON.parse(localStorage.getItem(KEY));
            if (!old?.rooms || !old?.orders || !old?.charges) {
                const fresh = seed();
                fresh.audit = fresh.audit.map(normalizeAuditEntry);
                return fresh;
            }
            const defaults = seed();
            if (!Array.isArray(old.tables))
                old.tables = defaults.tables;
            if (!Array.isArray(old.notifications))
                old.notifications = [];
            if (!Array.isArray(old.tickets))
                old.tickets = [];
            old.notifications = old.notifications.filter(n => n && ['frontdesk', 'restaurant', 'admin'].includes(n.role)).map(n => ({ ...n, read: !!n.read }));
            old.rooms.forEach(r => {
                if (typeof r.active !== 'boolean')
                    r.active = true;
            });
            if (!Array.isArray(old.audit))
                old.audit = defaults.audit;
            old.audit = old.audit.map((entry, i) => normalizeAuditEntry(entry, i));
            old.tables = old.tables.map(t => ({
                id: String(t.id),
                name: t.name || ('Table ' + t.id),
                active: t.active !== false
            }));
            old.services.forEach(s => {
                if (typeof s.requiresUnits !== 'boolean')
                    s.requiresUnits = ['hour', 'night'].includes(s.unit);
                if (s.requiresUnits && !s.unitsLabel)
                    s.unitsLabel = s.unit === 'hour' ? 'Duration (hours)' : s.unit === 'night' ? 'Number of nights' : 'Extra units per item';
            });
            return old;
        }
        catch {
            const fresh = seed();
            fresh.audit = fresh.audit.map(normalizeAuditEntry);
            return fresh;
        }
    }
    const extraDefaults = () => ({
        paymentMethods: ['Cash', 'GCash', 'Landbank Transfer', 'Card Terminal', 'Other External Payment'].map((name, i) => ({ id: 'PM-' + (i + 1), name, type: i === 0 ? 'cash' : 'noncash', active: true })),
        categories: [],
        employees: [
            { id: 'EMP-000', name: 'Demo Administrator', department: 'Administration', role: 'admin', access: ['frontdesk', 'restaurant', 'admin'], active: true, capabilities: { voidOrder: true } },
            { id: 'EMP-001', name: 'Front Desk Staff', department: 'Front Desk', role: 'frontdesk', access: ['frontdesk'], active: true, capabilities: {} },
            { id: 'EMP-002', name: 'Maria Santos', department: 'Restaurant', role: 'restaurant', access: ['restaurant'], active: true, capabilities: {} },
            { id: 'EMP-003', name: 'Jose Reyes', department: 'Restaurant', role: 'restaurant', access: ['restaurant'], active: true, capabilities: {} }
        ],
        receiptSettings: { name: 'Your Resort', address: 'Cebu, Philippines', contact: '', tin: '', branch: '', registration: '', footer: 'Thank you for visiting!', logoId: '', taxMode: 'unconfigured' },
        paymentRecords: [],
        promotions: [],
        discountEvents: []
    });
    function migrateFeatures(state) {
        const d = extraDefaults();
        if (!Array.isArray(state.paymentMethods)) state.paymentMethods = d.paymentMethods;
        state.paymentMethods.forEach(m => { if (!['cash', 'noncash'].includes(m.type)) m.type = /^cash(?:\s|$)/i.test(String(m.name || '').trim()) ? 'cash' : 'noncash'; });
        if (!Array.isArray(state.categories)) state.categories = d.categories;
        if (!Array.isArray(state.employees)) state.employees = d.employees;
        if (!Array.isArray(state.paymentRecords)) state.paymentRecords = [];
        if (!Array.isArray(state.promotions)) state.promotions = [];
        if (!Array.isArray(state.discountEvents)) state.discountEvents = [];
        (state.menu || []).forEach(m => { if (typeof m.statutoryEligible !== 'boolean') m.statutoryEligible = true; });
        (state.services || []).forEach(m => { if (typeof m.statutoryEligible !== 'boolean') m.statutoryEligible = false; });
        state.receiptSettings = { ...d.receiptSettings, ...(state.receiptSettings || {}) };
        if (!['unconfigured', 'vat', 'nonvat'].includes(state.receiptSettings.taxMode)) state.receiptSettings.taxMode = 'unconfigured';
        const names = [...new Set((state.menu || []).map(x => x.category || 'Other'))];
        names.forEach((name, i) => { if (!state.categories.some(c => c.name === name)) state.categories.push({ id: 'CAT-' + (state.categories.length + 1), name, active: true, imageId: '', sort: i }); });
        state.employees.forEach(e => { if (!Array.isArray(e.access)) e.access = e.role === 'admin' ? ['frontdesk', 'restaurant', 'admin'] : [e.role]; e.access = e.role === 'admin' ? ['frontdesk', 'restaurant', 'admin'] : e.access.filter(r => ['frontdesk', 'restaurant'].includes(r)); if (!e.capabilities) e.capabilities = {}; if (e.active === undefined) e.active = true; });
        (state.tickets || []).forEach(t => { if (!Array.isArray(t.resolutionCycles)) t.resolutionCycles = []; if (t.status === 'resolved' && !t.resolvedAt) t.resolvedAt = (t.history || []).filter(x => /resolv/i.test(x.detail || '')).at(-1)?.at || t.updatedAt || t.createdAt; });
        return initReceiptLayouts(state);
    }
    const rbClone = value => JSON.parse(JSON.stringify(value));
    const rbFormats = [['80', '80 mm Thermal'], ['58', '58 mm Thermal'], ['a4', 'A4 Paper']];
    const rbSources = [
        ['discountAmount','Statutory discount'],['vatRelief','Statutory VAT relief'],['originalBill','Original bill before discounts'],['promoDiscount','Promotional discount'],['receiptNo','Receipt number'],['date','Date / time'],['cashier','Cashier'],['location','Room / table'],
        ['room','Room'],['table','Table'],['guest','Guest name'],['orderId','Order reference'],
        ['billTotal','Actual bill total'],['dueBefore','Due before payment'],['previousPaid','Previously paid'],
        ['subtotal','Subtotal'],['amountApplied','Payment applied'],['amountReceived','Cash received / amount tendered'],
        ['change','Cash change'],['balance','Remaining balance'],['method','Payment method'],
        ['reference','Payment reference'],['tax','Tax amount (when recorded)'],['vatableSales','VATable Sales (excluding VAT)'],['vatExemptSales','VAT-Exempt Sales'],['zeroRatedSales','Zero-Rated Sales'],['vatAmount','VAT Amount'],['nonVatSales','Non-VAT Sales'],['taxStatus','Tax status'],['serviceType','Service type']
    ];
    const rbTypes = [
        ['header','Business header','building-2'],['title','Document title','type'],['metadata','Transaction information','calendar-days'],
        ['items','Itemized order / charges','list'],['summary','Bill total','calculator'],['payment','Payment breakdown','wallet'],
        ['discount','Statutory / promotional discount','badge-percent'],['tax','Tax breakdown','percent'],['customer','Customer details','user-round'],['footer','Footer message','message-square'],
        ['text','Custom text','type'],['field','Dynamic data row','database'],['date','Date / time field','calendar-days'],
        ['number','Number / currency field','hash'],['columns','Adjustable two columns','columns-2'],
        ['divider','Dashed divider','minus'],['spacer','Blank space','move-vertical'],['image','Resort logo','image'],['qr','QR link / web address','qr-code']
    ];
    function rbBlock(type) {
        const b = { id: 'BLK-' + Math.random().toString(36).slice(2, 10), type, label: '', text: '', source: 'receiptNo', align: 'left', size: 12, bold: false, spacing: 8, visible: true, condition: 'always', columns: 50, leftSource: 'date', rightSource: 'receiptNo', leftLabel: 'Date', rightLabel: 'Receipt', url: '' };
        if (type === 'header') { b.align = 'center'; b.bold = true; b.size = 15; }
        if (type === 'title') { b.align = 'center'; b.bold = true; b.text = 'PAYMENT ACKNOWLEDGEMENT'; }
        if (type === 'summary' || type === 'payment') b.bold = true;
        if (type === 'tax') b.condition = 'always';
        if (type === 'text') b.text = 'Custom receipt message';
        if (type === 'footer') { b.align = 'center'; b.text = 'Thank you for visiting!'; }
        if (type === 'field') { b.label = 'Receipt No.'; b.source = 'receiptNo'; }
        if (type === 'date') { b.label = 'Date'; b.source = 'date'; }
        if (type === 'number') { b.label = 'Amount paid'; b.source = 'amountApplied'; }
        if (type === 'spacer') b.spacing = 16;
        return b;
    }
    function rbDefaultLayout(area, format) {
        const types = ['header', 'title', 'metadata', 'divider', 'items', 'divider', 'discount', 'summary', 'payment', 'divider', 'tax', 'divider', 'footer'];
        const blocks = types.map(rbBlock);
        blocks.find(b => b.type === 'footer').text = 'Thank you for visiting!';
        return { name: 'Philippine Thermal Standard', area, format, blocks, builtIn: true };
    }
    function initReceiptLayouts(state) {
        if (!state.receiptLayouts || typeof state.receiptLayouts !== 'object') state.receiptLayouts = { drafts: {}, published: {}, versions: [] };
        const r = state.receiptLayouts;
        if (!r.drafts || typeof r.drafts !== 'object') r.drafts = {};
        if (!r.published || typeof r.published !== 'object') r.published = {};
        if (!Array.isArray(r.versions)) r.versions = [];
        if (!Array.isArray(r.savedDrafts)) r.savedDrafts = [];
        for (const area of ['restaurant','frontdesk']) for (const [format] of rbFormats) {
            const key = `${area}:${format}`;
            if (!r.published[key] || !r.versions.some(v => v.id === r.published[key])) {
                const id = `RB-DEFAULT-TAX-${area}-${format}`;
                const layout = rbDefaultLayout(area, format);
                if (!r.versions.some(v => v.id === id)) r.versions.push({ id, key, created: new Date().toISOString(), layout: rbClone(layout) });
                r.published[key] = id;
            }
            const legacyDefault = `RB-DEFAULT-${area}-${format}`;
            if (r.published[key] === legacyDefault) {
                const oldDraft = r.drafts[key];
                const oldTypes = 'header,title,metadata,divider,items,divider,summary,payment,tax,footer';
                const originalDraft = oldDraft?.builtIn === true && oldDraft.name === 'Philippine Thermal Standard' && oldDraft.blocks?.map(b => b.type).join(',') === oldTypes && oldDraft.blocks.find(b=>b.type==='footer')?.text === 'Thank you for visiting!';
                const id = `RB-DEFAULT-TAX-${area}-${format}`;
                if (!r.versions.some(v => v.id === id)) r.versions.push({ id, key, created: new Date().toISOString(), layout: rbDefaultLayout(area, format) });
                r.published[key] = id;
                if (!oldDraft || originalDraft) r.drafts[key] = rbClone(r.versions.find(v=>v.id===id).layout);
            }
            const currentPublished = r.versions.find(v=>v.id===r.published[key]);
            if (currentPublished && !currentPublished.layout.blocks.some(b=>b.type==='discount')) {
                const updated=rbClone(currentPublished.layout);
                const position=updated.blocks.findIndex(b=>b.type==='summary');
                updated.blocks.splice(position<0?updated.blocks.length:position,0,rbBlock('discount'));
                const upgradeId='RB-DISC-'+area+'-'+format+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,8);
                r.versions.push({id:upgradeId,key,created:new Date().toISOString(),layout:updated});
                r.published[key]=upgradeId;
                if(!r.drafts[key] || r.drafts[key].builtIn && !r.drafts[key].blocks.some(b=>b.type==='discount')) r.drafts[key]=rbClone(updated);
            }
            if (!r.drafts[key]) r.drafts[key] = rbClone(r.versions.find(v => v.id === r.published[key]).layout);
            const latest = r.versions.find(v=>v.id===r.published[key]);
            if (latest) {
                const currentTax = (latest.layout.blocks || []).find(b=>b.type==='tax');
                if (!currentTax || currentTax.condition !== 'always' || currentTax.visible === false) {
                    const upgraded = rbClone(latest.layout);
                    const t = upgraded.blocks.find(b=>b.type==='tax');
                    if (t) { t.condition='always';t.visible=true; }
                    else {
                        const insertAt = upgraded.blocks.findIndex(b=>b.type==='footer');
                        upgraded.blocks.splice(insertAt===-1?upgraded.blocks.length:insertAt,0,rbBlock('tax'));
                    }
                    const versionId = 'RB-TAX-' + area + '-' + format + '-' + Date.now() + '-' + Math.random().toString(36).slice(2,7);
                    r.versions.push({id:versionId,key,created:new Date().toISOString(),layout:upgraded});
                    r.published[key] = versionId;
                    const draft = r.drafts[key];
                    if (draft) {
                        const draftTax = draft.blocks.find(b=>b.type==='tax');
                        if (draftTax) { draftTax.condition='always';draftTax.visible=true; }
                        else {
                            const at = draft.blocks.findIndex(b=>b.type==='footer');
                            draft.blocks.splice(at===-1?draft.blocks.length:at,0,rbBlock('tax'));
                        }
                    }
                }
            }
        }
        return state;
    }
    function rbPublishedLayout(area, format, ref) {
        const key = `${area}:${format}`;
        const version = data.receiptLayouts.versions.find(v => v.id === (ref || data.receiptLayouts.published[key]));
        return version ? version.layout : rbDefaultLayout(area, format);
    }
    function rbReferences(area) {
        return Object.fromEntries(rbFormats.map(([format]) => [format, data.receiptLayouts.published[`${area}:${format}`]]));
    }
    let rbArea = 'restaurant', rbFormat = '80', rbSelected = '', rbWorking = null, rbDirty = false, rbActiveSavedId = '';
    let rbUndoStack = [], rbRedoStack = [], rbLastEditKey = '', rbLastEditTime = 0;
    function rbSnapshot() { return { layout: rbClone(rbWorking), selected: rbSelected }; }
    function rbHistory(key='') {
        if (!rbWorking) return;
        const t=Date.now();
        if (!key || key!==rbLastEditKey || t-rbLastEditTime>450) { rbUndoStack.push(rbSnapshot()); if(rbUndoStack.length>50) rbUndoStack.shift(); }
        rbLastEditKey=key;rbLastEditTime=t;rbRedoStack=[];
    }
    function rbUndoAction(direction) {
        const from=direction==='undo'?rbUndoStack:rbRedoStack, to=direction==='undo'?rbRedoStack:rbUndoStack;
        if (!from.length) return;
        to.push(rbSnapshot());const prior=from.pop();rbWorking=prior.layout;rbSelected=prior.selected;
        rbDirty=true;rbLastEditKey='';render();
    }
    function rbKey() { return `${rbArea}:${rbFormat}`; }
    function rbLoadWorking() {
        rbWorking = rbClone(data.receiptLayouts.drafts[rbKey()] || rbPublishedLayout(rbArea,rbFormat));
        rbSelected = rbWorking.blocks[0]?.id || '';
        rbDirty = false;
        rbActiveSavedId = '';rbUndoStack=[];rbRedoStack=[];
    }
    function rbSelectedBlock() { return rbWorking?.blocks.find(b => b.id === rbSelected); }
    function rbSourceLabel(key) { return rbSources.find(([k]) => k === key)?.[1] || key; }
    function rbValue(ctx,key) { return ctx.values[key] == null ? '' : String(ctx.values[key]); }
    const rbCurrency = n => Number.isFinite(Number(n)) ? peso2(Number(n)) : '—';
    const rbCents = n => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
    function rbTaxSnapshot(billTotal, branding) {
        const mode = ['vat','nonvat'].includes(branding?.taxMode) ? branding.taxMode : 'unconfigured';
        const bill = rbCents(Math.max(0, Number(billTotal) || 0));
        if (mode === 'vat') {
            const vatableSales = rbCents(bill / 1.12);
            return { mode, rate: 12, vatableSales, vatExemptSales: 0, zeroRatedSales: 0,
                vatAmount: rbCents(bill - vatableSales), totalSales: bill, basis: 'full-bill',
                note: 'All charges treated as standard VATable, VAT-inclusive sales. No mixed, exempt or discount handling.' };
        }
        if (mode === 'nonvat') return { mode, nonVatSales: bill, vatAmount: null, totalSales: bill, basis: 'full-bill' };
        return { mode: 'unconfigured', basis: 'full-bill' };
    }
    function rbTaxDetailsFor(info) {
        if (info?.taxDetails && typeof info.taxDetails === 'object') return info.taxDetails;
        if (info?.taxAmount != null) return { mode: 'legacy', vatAmount: Number(info.taxAmount), basis: 'historical' };
        return { mode: 'unconfigured' };
    }

    const discountMoney = n => Math.round((Number(n || 0) + Number.EPSILON) * 100) / 100;
    const discountEntries = order => Array.isArray(order?.discounts) ? order.discounts : [];
    function orderDiscountTotals(order) {
        const gross = discountMoney(total(order));
        const statutory = discountEntries(order).filter(x => x.kind === 'statutory');
        const promotions = discountEntries(order).filter(x => x.kind === 'promotion');
        const vatRelief = discountMoney(statutory.reduce((n,x)=>n + Number(x.vatRelief || 0),0));
        const statutoryDiscount = discountMoney(statutory.reduce((n,x)=>n + Number(x.discountAmount || 0),0));
        const promoDiscount = discountMoney(promotions.reduce((n,x)=>n + Number(x.discountAmount || 0),0));
        const amountOff = discountMoney(vatRelief + statutoryDiscount + promoDiscount);
        return { gross, statutory, promotions, vatRelief, statutoryDiscount, promoDiscount, amountOff, net: discountMoney(Math.max(0,gross - amountOff)) };
    }
    const orderPayable = order => orderDiscountTotals(order).net;
    function discountCalculation(eligibleGross, taxMode, rate = 20, kind = 'statutory') {
        const gross = discountMoney(eligibleGross);
        if (kind === 'promotion') return {eligibleGross:gross, vatRelief:0, discountAmount:discountMoney(gross * rate / 100), rate};
        const vatRelief = taxMode === 'vat' ? discountMoney(gross - discountMoney(gross / 1.12)) : 0;
        return {eligibleGross:gross, vatRelief, discountAmount:discountMoney((gross-vatRelief)*.20), rate:20};
    }
    function orderDiscountSummary(order) {
        const d = orderDiscountTotals(order);
        if (!d.amountOff) return null;
        return {originalBill:d.gross,vatRelief:d.vatRelief,statutoryDiscount:d.statutoryDiscount,promoDiscount:d.promoDiscount,
            entries:rbClone(discountEntries(order).map(x=>({kind:x.kind,type:x.type,name:x.name||'',idLast4:x.idLast4||'',method:x.method,eligibleGross:x.eligibleGross,vatRelief:x.vatRelief,discountAmount:x.discountAmount,rate:x.rate,verifiedBy:x.verifiedBy,verifiedAt:x.at}))) };
    }
    function orderTaxDetails(order) {
        const d=orderDiscountTotals(order);
        const mode=discountEntries(order)[0]?.taxMode || data.receiptSettings.taxMode;
        if(mode==='vat') {
            const eligibleGross = discountMoney(d.statutory.reduce((n,e)=>n+Number(e.eligibleGross||0),0));
            const otherGross = Math.max(0,discountMoney(d.gross-eligibleGross-d.promoDiscount));
            const vatableSales=discountMoney(otherGross/1.12);
            const vatAmount=discountMoney(otherGross-vatableSales);
            const vatExemptSales=discountMoney(Math.max(0,eligibleGross-d.vatRelief-d.statutoryDiscount));
            return {mode:'vat',rate:12,vatableSales,vatExemptSales,zeroRatedSales:0,vatAmount,totalSales:d.net,basis:'discounted-sale',note:'Standard 12% VAT-inclusive classification; qualifying statutory portion exempt.'};
        }
        if(mode==='nonvat') return {mode,nonVatSales:d.net,vatAmount:null,totalSales:d.net,basis:'discounted-sale'};
        return {mode:'unconfigured',basis:'discounted-sale'};
    }
    function combinedChargeTaxes(charges) {
        const parts=charges.map(c=>c.taxDetails || rbTaxSnapshot(Number(c.amount||0),data.receiptSettings));
        if (!parts.length) return {mode:'unconfigured'};
        if(parts.some(t=>t.mode!==parts[0].mode)) return {mode:'unconfigured',note:'Mixed or unconfigured tax treatment; see originating charge records.'};
        const mode=parts[0].mode;
        if(mode==='vat') {
            const fields=['vatableSales','vatExemptSales','zeroRatedSales','vatAmount'];
            return {mode,rate:12,...Object.fromEntries(fields.map(k=>[k,discountMoney(parts.reduce((sum,t)=>sum+Number(t[k]||0),0))])),basis:'room-charges'};
        }
        if(mode==='nonvat') return {mode,nonVatSales:discountMoney(parts.reduce((sum,t)=>sum+Number(t.nonVatSales||0),0)),vatAmount:null,basis:'room-charges'};
        return {mode:'unconfigured'};
    }
    function combinedChargeDiscounts(charges) {
        const summaries=charges.map(c=>c.discountSummary).filter(Boolean);
        if(!summaries.length) return null;
        return { originalBill:discountMoney(charges.reduce((n,c)=>n+Number(c.discountSummary?.originalBill??c.amount),0)),
          vatRelief:discountMoney(summaries.reduce((n,d)=>n+Number(d.vatRelief||0),0)),
          statutoryDiscount:discountMoney(summaries.reduce((n,d)=>n+Number(d.statutoryDiscount||0),0)),
          promoDiscount:discountMoney(summaries.reduce((n,d)=>n+Number(d.promoDiscount||0),0)),
          entries:summaries.flatMap(d=>rbClone(d.entries||[]))};
    }
    function discountAdjustedItems(order) {
        const raw=order.items.map(i=>({name:i.name,qty:Number(i.qty),price:Number(i.price),amount:discountMoney(i.qty*i.price)}));
        const d=orderDiscountTotals(order);
        if(d.vatRelief>0) raw.push({name:'Less: statutory VAT exemption',qty:1,price:-d.vatRelief,amount:-d.vatRelief});
        if(d.statutoryDiscount>0) raw.push({name:'Less: SC / PWD discount',qty:1,price:-d.statutoryDiscount,amount:-d.statutoryDiscount});
        if(d.promoDiscount>0) raw.push({name:'Less: promotional discount',qty:1,price:-d.promoDiscount,amount:-d.promoDiscount});
        return raw;
    }
    function recordDiscountEvent(order, entry, isLate=false, charge=null) {
        const event={id:uid('DISC'),at:new Date().toISOString(),orderId:order.id,chargeId:charge?.id||'',room:order.room||null,
            kind:entry.kind,type:entry.type,beneficiary:entry.name||'',idLast4:entry.idLast4||'',employeeId:employee()?.id||'',employeeName:employeeLabel(),
            eligibleGross:entry.eligibleGross,vatRelief:entry.vatRelief,discountAmount:entry.discountAmount,late:isLate};
        data.discountEvents.unshift(event);
        audit(`${isLate?'Adjusted unpaid room charge':'Applied'} ${entry.type} discount to ${order.id} (${money(entry.discountAmount)} discount${entry.vatRelief?', '+money(entry.vatRelief)+' VAT relief':''})`,employeeLabel(),
            {module:isLate?'Front Desk':'Restaurant',type:'update',target:order.id,amount:entry.discountAmount,changes:{'Original bill':money(total(order)),'New due':money(orderPayable(order)),'Eligible portion':money(entry.eligibleGross),'Verified by':employeeLabel()}});
    }
    function mayApplyLateDiscount() {
        return role==='frontdesk' && hasAccess('frontdesk') && (employee()?.role==='admin' || employee()?.capabilities?.lateDiscount===true);
    }
    function eligibleQty(order,index) {
        const i=order.items[index];
        if(!i || i.statutoryEligible===false || data.menu.find(m=>Number(m.id)===Number(i.id))?.statutoryEligible===false && i.statutoryEligible !== true) return 0;
        const used=discountEntries(order).filter(e=>e.kind==='statutory' && e.method==='items').reduce((n,e)=>n+(e.allocations||[]).filter(a=>a.index===index).reduce((sum,a)=>sum+Number(a.qty||0),0),0);
        return Math.max(0,Number(i.qty||0)-used);
    }
    function canDiscountOrder(order, charge) {
        if(!order) return false;
        return charge ? order.status==='posted' && charge.source==='restaurant' && Number(charge.paid||0)<.001 && charge.status==='unpaid' && mayApplyLateDiscount() : role==='restaurant' && hasAccess('restaurant') && order.destination==='table' && ['pending','awaiting_payment'].includes(order.status);
    }
    function discountForm(order,charge=null) {
        if(!canDiscountOrder(order,charge)) { toast('This order cannot be adjusted, or the required permission is missing.',true);return; }
        if(discountEntries(order).some(x=>x.kind==='promotion')) {toast('This order already has a promotion. Promotions cannot be combined or stacked in V1.',true);return;}
        if(data.receiptSettings.taxMode==='unconfigured' && !discountEntries(order).length) {
            toast('Admin must select VAT or Non-VAT registration status in Receipt Settings before statutory discounts can be calculated.',true);
        }
        const entries=discountEntries(order);
        const alreadyStatutory=entries.some(x=>x.kind==='statutory'),alreadyPromo=entries.some(x=>x.kind==='promotion');
        const selectMode=entries.find(x=>x.kind==='statutory')?.method||'individual';
        const eligibleItems=order.items.map((i,index)=>({index,i,avail:eligibleQty(order,index)})).filter(x=>x.avail>0);
        const promos=charge||alreadyStatutory?[]:data.promotions.filter(x=>x.active!==false && (!x.start||x.start<=today()) && (!x.end||x.end>=today()));
        const id=charge?.id||'';
        const itemFields=eligibleItems.map(({index,i,avail})=>`<div class="discount-line"><span>${esc(i.name)} <small>${money(i.price)} each · up to ${avail}</small></span><input class="input" type="number" step="1" min="0" max="${avail}" value="0" name="item_${index}" aria-label="Eligible quantity for ${esc(i.name)}"></div>`).join('');
        const display=entries.length?`<div class="discount-applied-list"><strong>Already applied</strong>${entries.map(e=>`<div><span>${esc(e.type)} · ${esc(e.name||'Guest')} ${e.idLast4?'(ID ••••'+esc(e.idLast4)+')':''}</span><strong>−${money(Number(e.vatRelief||0)+Number(e.discountAmount||0))}</strong></div>`).join('')}<p>Current amount due: <strong>${money(orderPayable(order))}</strong></p></div>`:'';
        showModal(charge?'Authorized Late Discount · '+esc(order.id):'Apply Discount · '+esc(order.id),charge?'Verified adjustment to an unpaid room-posted Restaurant order.':'Verify the diner and select only eligible consumption.',`${display}
            <div class="notice warning">Official Senior Citizen / PWD benefits require identity verification. This browser prototype stores only the last four ID characters, not a complete ID. Verify legal eligibility and tax registration before use.</div>
            <form id="discount-apply-form" data-order-id="${esc(order.id)}" data-charge-id="${esc(id)}">
             <input type="hidden" name="orderId" value="${esc(order.id)}"><input type="hidden" name="chargeId" value="${esc(id)}">
             <div class="field"><label>Discount category</label><select name="category" class="select" id="discount-category">
               <option value="senior">Senior Citizen · 20% + applicable VAT relief</option><option value="pwd">PWD · 20% + applicable VAT relief</option>
               ${promos.map(x=>`<option value="promo:${esc(x.id)}">Promotion: ${esc(x.name)} (${x.rate}%)</option>`).join('')}</select></div>
             <div id="discount-statutory-fields" ${alreadyPromo?'hidden':''}>
                <div class="form-grid"><div class="field"><label>Verified beneficiary name</label><input class="input" name="beneficiary" maxlength="90" placeholder="Name shown on valid ID" ${alreadyPromo?'':'required'}></div><div class="field"><label>Last four ID characters</label><input class="input" name="idLast4" maxlength="4" pattern="[A-Za-z0-9]{4}" placeholder="Last 4 only" ${alreadyPromo?'':'required'}></div></div>
                <div class="field"><label>Eligible purchase calculation</label><select name="method" id="discount-method" class="select" ${alreadyStatutory?'disabled':''}><option value="individual" ${selectMode==='individual'?'selected':''}>Individual — entire eligible order</option><option value="items" ${selectMode==='items'?'selected':''}>Select eligible item quantities</option><option value="shared" ${selectMode==='shared'?'selected':''}>Shared meal — one eligible diner share</option></select>${alreadyStatutory?`<input type="hidden" name="method" value="${esc(selectMode)}">`:''}</div>
                <div class="discount-mode-panel" data-discount-section="items"><label>Quantity consumed by this beneficiary</label>${itemFields||'<p>No additional eligible menu item quantities remain.</p>'}</div>
                <div class="discount-mode-panel" data-discount-section="shared"><label class="field">Number of people sharing this meal<input class="input" type="number" min="2" max="99" name="diners" value="4"></label><small>One equal share is assigned per verified beneficiary. To include a second eligible diner, add another verified beneficiary.</small></div>
             </div>
             <div class="field" ${charge?'':'hidden'}><label>Late adjustment reason (required)</label><textarea class="textarea" name="reason" maxlength="300" placeholder="Guest presented verified ID at checkout"></textarea></div>
             <div class="discount-preview-calculation" id="discount-preview-calculation"></div>
             <button class="btn primary full" type="submit">${charge?'Confirm Audited Adjustment':'Apply Verified Discount'}</button>
            </form>`,`${btn('Cancel','modal-close')}`);
        const category=document.getElementById('discount-category');
        if(alreadyStatutory) category.value='senior';
        if(alreadyPromo) category.value='promo:'+entries.find(e=>e.kind==='promotion')?.promotionId;
        refreshDiscountForm();
    }
    function discountFormValues(form) {
        const v=Object.fromEntries(new FormData(form).entries());
        const order=data.orders.find(o=>o.id===v.orderId);
        const category=document.getElementById('discount-category')?.value || 'senior';
        const method=v.method || document.getElementById('discount-method')?.value || 'individual';
        const isPromo=category.startsWith('promo:');
        const current=discountEntries(order);
        const promo=isPromo?data.promotions.find(p=>p.id===category.slice(6) && p.active!==false && (!p.start||p.start<=today()) && (!p.end||p.end>=today())):null;
        const alreadyStatutory=current.some(e=>e.kind==='statutory'),alreadyPromo=current.some(e=>e.kind==='promotion');
        let eligibleGross=0,allocations=[],shares=1;
        const eligible=order?.items.map((i,index)=>({index,i,avail:eligibleQty(order,index)})).filter(x=>x.avail>0)||[];
        const errors=[];
        if (!order) return {errors:['Order not found.']};
        if(isPromo) {
            if(!promo||current.length) errors.push('Promotions cannot stack with statutory or other order discounts.');
            eligibleGross=discountMoney(order.items.filter(i=>{const target=String(promo?.scope||'all');return target==='all'||target.startsWith('category:')&&(i.category||data.menu.find(m=>Number(m.id)===Number(i.id))?.category)===target.slice(9)||target.startsWith('item:')&&String(i.id)===target.slice(5);}).reduce((sum,i)=>sum+Number(i.qty)*Number(i.price),0));
        } else {
            if(alreadyPromo) errors.push('A promotional discount is already on this order.');
            if(data.receiptSettings.taxMode==='unconfigured') errors.push('Configure the business tax registration status first.');
            if(current.some(e=>e.kind==='statutory' && e.taxMode!==data.receiptSettings.taxMode)) errors.push('Tax profile changed since the first beneficiary. Finish or correct this order with Admin.');
            if(!String(v.beneficiary||'').trim()) errors.push('Enter the verified beneficiary name.');
            if(!/^[a-zA-Z0-9]{4}$/.test(String(v.idLast4||''))) errors.push('Enter the last four alphanumeric ID characters.');
            if(current.some(x=>x.kind==='statutory' && x.name?.trim().toLowerCase()===String(v.beneficiary||'').trim().toLowerCase() && x.idLast4===v.idLast4)) errors.push('This beneficiary already has a statutory discount on this order.');
            if(alreadyStatutory && current.find(x=>x.kind==='statutory').method!==method) errors.push('Use the same allocation method for multiple beneficiaries on one order.');
            if(method==='individual') {
                if(alreadyStatutory) errors.push('Individual whole-order benefit has already been applied.');
                eligibleGross=discountMoney(eligible.reduce((n,x)=>n+x.avail*x.i.price,0));
                allocations=eligible.map(x=>({index:x.index,qty:x.avail,amount:discountMoney(x.avail*x.i.price)}));
            } else if(method==='items') {
                for(const {index,i,avail} of eligible) {
                    const qty=Number(v['item_'+index]||0);
                    if(!Number.isInteger(qty)||qty<0||qty>avail) errors.push('Eligible quantities must be whole numbers within the remaining item quantity.');
                    if(qty>0&&qty<=avail){const amt=discountMoney(qty*i.price);eligibleGross+=amt;allocations.push({index,qty,amount:amt});}
                }
                eligibleGross=discountMoney(eligibleGross);
            } else if(method==='shared') {
                const diners=Number(v.diners);
                if(!Number.isInteger(diners)||diners<2||diners>99) errors.push('Enter a valid group size between 2 and 99.');
                if(current.some(e=>e.method==='shared' && Number(e.diners)!==diners)) errors.push('Use the same group size for every eligible diner.');
                if(current.filter(e=>e.kind==='statutory'&&e.method==='shared').length>=diners) errors.push('All group meal shares have been allocated.');
                eligibleGross=discountMoney(eligible.reduce((n,x)=>n+Number(x.i.qty)*Number(x.i.price),0)/Math.max(1,diners));
                shares=1;
            }
            if(eligibleGross<.01) errors.push('Select an eligible purchase or share greater than zero.');
        }
        const result=discountCalculation(eligibleGross,data.receiptSettings.taxMode,promo?.rate||20,isPromo?'promotion':'statutory');
        if(result.discountAmount<=0) errors.push('Discount amount must be greater than zero.');
        if(discountMoney(result.discountAmount+result.vatRelief)>orderPayable(order)+.001) errors.push('Discount exceeds the unpaid order balance.');
        return {...result,errors,isPromo,promo,category,method,shares,allocations,order,v};
    }
    function refreshDiscountForm() {
        const form=document.getElementById('discount-apply-form'); if(!form) return;
        const category=document.getElementById('discount-category')?.value||'senior';
        const promo=category.startsWith('promo:');
        const stat=document.getElementById('discount-statutory-fields');if(stat)stat.hidden=promo;
        for(const field of ['beneficiary','idLast4']) {const input=form.querySelector('[name="'+field+'"]');if(input){input.required=!promo;input.disabled=promo;}}
        const method=form.elements.namedItem('method')?.value||'individual';
        form.querySelectorAll('[data-discount-section]').forEach(e=>e.hidden=promo||e.dataset.discountSection!==method);
        const d=discountFormValues(form),host=document.getElementById('discount-preview-calculation');if(!host)return;
        host.innerHTML=`<div class="discount-total-row"><span>Eligible portion</span><strong>${money(d.eligibleGross||0)}</strong></div><div class="discount-total-row"><span>Applicable VAT relief</span><strong>−${money(d.vatRelief||0)}</strong></div><div class="discount-total-row"><span>Discount amount</span><strong>−${money(d.discountAmount||0)}</strong></div><div class="discount-total-row emphasis"><span>New order amount</span><strong>${d.order?money(discountMoney(orderPayable(d.order)-Number(d.vatRelief||0)-Number(d.discountAmount||0))):'—'}</strong></div>${d.errors.length?'<small class="text-red">'+esc(d.errors[0])+'</small>':''}`;
    }
    function applyDiscountForm(v) {
        const order=data.orders.find(o=>o.id===v.orderId),charge=v.chargeId?data.charges.find(c=>c.id===v.chargeId):null;
        if(!canDiscountOrder(order,charge)){toast('This order is no longer eligible for adjustment.',true);return;}
        const form=document.getElementById('discount-apply-form'),d=discountFormValues(form);
        if(d.errors.length){toast(d.errors[0],true);refreshDiscountForm();return;}
        if(v.chargeId && d.isPromo){toast('Late adjustments here are limited to verified statutory discounts.',true);return;}
        const reason=String(v.reason||'').trim();
        if(charge && reason.length<5){toast('Please explain the late adjustment (at least five characters).',true);return;}
        if(!Array.isArray(order.discounts))order.discounts=[];
        const entry={id:uid('DSC'),kind:d.isPromo?'promotion':'statutory',type:d.isPromo?'Promotion':d.category==='pwd'?'PWD':'Senior Citizen',
            name:d.isPromo?d.promo.name:String(v.beneficiary||'').trim(),idLast4:d.isPromo?'':v.idLast4.toUpperCase(),method:d.isPromo?'promotion':d.method,
            eligibleGross:d.eligibleGross,vatRelief:d.vatRelief,discountAmount:d.discountAmount,rate:d.rate,taxMode:data.receiptSettings.taxMode,
            allocations:d.allocations,diners:Number(v.diners)||null,shares:d.shares,promotionId:d.promo?.id||'',at:new Date().toISOString(),verifiedBy:employeeLabel(),reason};
        order.discounts.push(entry);
        if(charge){charge.amount=orderPayable(order);charge.discountSummary=orderDiscountSummary(order);charge.taxDetails=orderTaxDetails(order);charge.orderItems=rbClone(order.items);charge.adjustedAt=entry.at;
            notify(['restaurant','admin'],'Room charge discount adjusted',`${order.id} · ${roomLabel(order.room)} · Now ${money(charge.amount)}`,{route:'roomcharges'});
        }
        recordDiscountEvent(order,entry,!!charge,charge);
        save();closeModal();render();
        if(charge) checkoutStay(charge.stayId); else if(order.status==='pending')viewOrder(order.id);else tableBill(order.id);
        toast((charge?'Late adjustment saved. ':'Discount saved. ')+'Total due: '+money(orderPayable(order)));
    }

    function roomChargeLineItems(charge) {
        if (charge.source !== 'restaurant') return [{ name: String(charge.label || 'Additional charge'), qty: 1, price: Number(charge.amount || 0), amount: Number(charge.amount || 0), chargeId: charge.id }];
        const linked = data.orders.find(order => order.id === charge.sourceId);
        const recorded = Array.isArray(charge.orderItems) && charge.orderItems.length ? charge.orderItems : linked?.items || [];
        if (!recorded.length) return [{ name: String(charge.label || 'Restaurant charge'), qty: 1, price: Number(charge.amount || 0), amount: Number(charge.amount || 0), chargeId: charge.id }];
        const items = recorded.map((item, index) => ({
            name: String(item.name || 'Menu item'),
            qty: Number(item.qty || 1),
            price: Number(item.price || 0),
            amount: Math.round(Number(item.qty || 1) * Number(item.price || 0) * 100) / 100,
            chargeId: charge.id,
            orderId: charge.sourceId,
            group: index === 0 ? String(charge.label || ('Restaurant order ' + charge.sourceId)) : ''
        }));
        const summary=charge.discountSummary || (linked ? orderDiscountSummary(linked) : null);
        if(summary) {
            if(summary.vatRelief) items.push({name:'Less: statutory VAT exemption',qty:1,price:-summary.vatRelief,amount:-summary.vatRelief,chargeId:charge.id,orderId:charge.sourceId});
            if(summary.statutoryDiscount) items.push({name:'Less: SC / PWD discount',qty:1,price:-summary.statutoryDiscount,amount:-summary.statutoryDiscount,chargeId:charge.id,orderId:charge.sourceId});
            if(summary.promoDiscount) items.push({name:'Less: promotional discount',qty:1,price:-summary.promoDiscount,amount:-summary.promoDiscount,chargeId:charge.id,orderId:charge.sourceId});
        }
        const sum = discountMoney(items.reduce((n, item) => n + item.amount, 0));
        if (Math.abs(sum - Number(charge.amount || 0)) > .011) return [{ name: String(charge.label || 'Restaurant charge'), qty: 1, price: Number(charge.amount || 0), amount: Number(charge.amount || 0), chargeId: charge.id }];
        return items;
    }
    function roomChargeReceiptItems(charges) {
        return charges.filter(c => c.status !== 'void').flatMap(roomChargeLineItems);
    }
    function roomChargeDetailsMarkup(charge) {
        if (charge.source !== 'restaurant') return '';
        const entries = roomChargeLineItems(charge);
        if (entries.length === 1 && !entries[0].orderId) return '';
        return `<div class="checkout-order-items">${entries.map(item => `<div><span>${esc(item.qty)} × ${esc(item.name)}</span><strong>${money(item.amount)}</strong></div>`).join('')}</div>`;
    }
    function rbPaymentLayout(payment, format) {
        return rbPublishedLayout(payment.area, format, payment.receiptLayoutRefs?.[format]);
    }
    function rbPaymentPreview(payment, format = '80') {
        const layout = rbPaymentLayout(payment, format);
        return rbLayoutMarkup({ ...layout, format }, rbContext('payment', payment), payment.receiptBranding || data.receiptSettings, false);
    }
    function rbBrandingPreview(area = 'restaurant', format = '80') {
        const settingsForm = document.getElementById('feature-receipt-form');
        const branding = settingsForm ? Object.fromEntries(new FormData(settingsForm).entries()) : data.receiptSettings;
        const layout = rbPublishedLayout(area, format);
        return rbLayoutMarkup({ ...layout, format }, rbDemoContext(area, branding), branding, false);
    }
    function updateReceiptPreviewSelect(control) {
        if (control.id === 'success-receipt-format' || control.id === 'history-receipt-format') {
            const payment = data.paymentRecords.find(p => p.id === control.dataset.paymentId);
            const host = document.getElementById(control.id === 'success-receipt-format' ? 'success-receipt-paper' : 'history-receipt-paper');
            if (payment && host) host.innerHTML = rbPaymentPreview(payment, control.value);
            return;
        }
        if (control.id === 'branding-preview-area' || control.id === 'branding-preview-format' || control.closest('#feature-receipt-form')) {
            const host = document.getElementById('branding-receipt-paper');
            if (host) host.innerHTML = rbBrandingPreview(document.getElementById('branding-preview-area')?.value || 'restaurant', document.getElementById('branding-preview-format')?.value || '80');
        }
    }
    function rbContext(kind, info) {
        const restaurant = kind !== 'payment' || info.area === 'restaurant';
        const order = info.orderId ? data.orders.find(o => o.id === info.orderId) : null;
        const rawItems = info.items || order?.items || [];
        const sourceItems = kind === 'payment' && info.area === 'frontdesk' && Array.isArray(rawItems)
            ? rawItems.flatMap(item => {
                const charge = item.chargeId ? data.charges.find(c => c.id === item.chargeId) : null;
                const isLegacyChargeSummary = charge?.source === 'restaurant' && !item.orderId
                    && Number(item.amount ?? Number(item.qty ?? 1) * Number(item.price || 0)) >= 0
                    && String(item.name || '').trim() === String(charge.label || '').trim()
                    && Math.abs(Number(item.amount ?? Number(item.qty ?? 1) * Number(item.price || 0)) - Number(charge.amount || 0)) < .011;
                return isLegacyChargeSummary ? roomChargeLineItems(charge) : [item];
            }) : rawItems;
        const items = sourceItems.map(it => ({ name: String(it.name || 'Charge'), qty: Number(it.qty ?? 1), price: Number(it.price ?? 0), amount: Number(it.amount ?? Number(it.qty ?? 1) * Number(it.price ?? 0)), group: String(it.group || '') }));
        const itemTotal = items.reduce((n,it)=>n+it.amount,0);
        const paid = kind !== 'bill';
        const applied = paid ? Number(info.amount ?? (order ? total(order) : itemTotal)) : 0;
        const billTotal = Number(kind === 'bill' ? orderPayable(info) : info.billTotal ?? (restaurant ? (order ? orderPayable(order) : itemTotal || applied) : info.originalBill ?? info.dueBefore ?? applied));
        const dueBefore = Number(kind === 'bill' ? billTotal : info.dueBefore ?? (restaurant ? billTotal : applied));
        const change = paid ? Number(info.change || 0) : 0;
        const cash = paid && (info.methodType === 'cash' || (info.methodType == null && /^cash(?:\s|$)/i.test(info.method || info.paymentMethod || '')));
        const tendered = paid ? Number(info.tendered ?? applied) : 0;
        const at = info.at || info.settledAt || info.created || new Date().toISOString();
        const location = restaurant ? `Table ${info.table || order?.table || '—'}` : `Room ${info.room || '—'}`;
        const taxDetails = kind==='bill' && info?.items ? orderTaxDetails(info) : rbTaxDetailsFor(info);
        const discountSummary = info.discountSummary || (kind === 'bill' && order ? orderDiscountSummary(order) : null) || (kind === 'bill' ? orderDiscountSummary(info) : null);
        const values = {
            discountAmount:rbCurrency(discountSummary?.statutoryDiscount||0),vatRelief:rbCurrency(discountSummary?.vatRelief||0),originalBill:rbCurrency(discountSummary?.originalBill??billTotal),promoDiscount:rbCurrency(discountSummary?.promoDiscount||0),
            receiptNo: info.paymentRecordId || info.id || 'SAMPLE-001',
            date: new Date(at).toLocaleString('en-PH', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
            cashier: info.employeeName || info.staffPaidBy || info.staff || 'Front Desk Staff',
            location, room: restaurant ? '' : String(info.room || ''), table: restaurant ? String(info.table || order?.table || '') : '',
            guest: info.guest || '', orderId: info.orderId || order?.id || '',
            billTotal: rbCurrency(billTotal), dueBefore: rbCurrency(dueBefore), previousPaid: rbCurrency(Math.max(0,billTotal-dueBefore)),
            subtotal: rbCurrency(itemTotal || billTotal), amountApplied: rbCurrency(applied),
            amountReceived: paid ? rbCurrency(tendered) : '', change: cash ? rbCurrency(change) : '',
            balance: paid && info.balance != null ? rbCurrency(info.balance) : paid && restaurant ? rbCurrency(0) : '',
            method: paid ? String(info.method || info.paymentMethod || 'Not recorded') : 'Not paid',
            reference: info.paymentReference || info.reference || '',
            tax: taxDetails.vatAmount == null ? '' : rbCurrency(taxDetails.vatAmount),
            vatableSales: taxDetails.vatableSales == null ? '' : rbCurrency(taxDetails.vatableSales),
            vatExemptSales: taxDetails.vatExemptSales == null ? '' : rbCurrency(taxDetails.vatExemptSales),
            zeroRatedSales: taxDetails.zeroRatedSales == null ? '' : rbCurrency(taxDetails.zeroRatedSales),
            vatAmount: taxDetails.vatAmount == null ? '' : rbCurrency(taxDetails.vatAmount),
            nonVatSales: taxDetails.nonVatSales == null ? '' : rbCurrency(taxDetails.nonVatSales),
            taxStatus: taxDetails.mode === 'vat' ? 'VAT registered (12% incl.)' : taxDetails.mode === 'nonvat' ? 'Non-VAT' : 'Not recorded',
            serviceType: restaurant ? 'DINE-IN' : 'FRONT DESK SETTLEMENT'
        };
        return {restaurant,paid,cash,change,applied,tendered,billTotal,dueBefore,items,values,taxDetails,discountSummary,hasTax: taxDetails.mode !== 'unconfigured', info};
    }
    function rbDemoContext(area = rbArea, branding = data.receiptSettings) {
        const cash = rbDemoMode !== 'gcash';
        const restaurant = area === 'restaurant';
        return rbContext('payment', { taxDetails: { ...rbTaxSnapshot(restaurant?1005:700, { taxMode: branding.taxMode }), example: true }, id:'PAY-000023', at:'2026-10-21T10:58:00', area, table:'01', room:101, guest:'Sample Guest', orderId:'R-1001', employeeName:'Sample Cashier', method: rbDemoMode === 'gcash' ? 'GCash' : 'Cash', methodType:cash ? 'cash':'noncash', items: restaurant ? [{name:'Chicken Adobo', qty:2, price:220},{name:'Grilled Fish',qty:1,price:320},{name:'Fresh Juice',qty:2,price:95},{name:'Garlic Rice',qty:1,price:55}] : [{name:'Motorbike Rental · 2 hours',qty:1,price:700}], billTotal:restaurant?1005:700, dueBefore:restaurant?1005:500, amount: rbDemoMode==='partial' ? 200 : restaurant?1005:500, tendered:rbDemoMode==='gcash' ? (restaurant?1005:500) : rbDemoMode==='partial'?200:restaurant?1100:600, change: cash ? (restaurant?95:100) : 0, balance: rbDemoMode==='partial'?300:0 });
    }
    let rbDemoMode = 'cash';
    function rbShow(b,ctx,editing=false) {
        if (b.visible === false) return false;
        return b.type==='discount' && !editing && !(ctx.discountSummary?.vatRelief||ctx.discountSummary?.statutoryDiscount||ctx.discountSummary?.promoDiscount) ? false : b.condition === 'cash' ? ctx.cash : b.condition === 'noncash' ? ctx.paid && !ctx.cash : b.condition === 'balance' ? Number(ctx.info.balance || 0)>0 : b.condition === 'restaurant' ? ctx.restaurant : b.condition === 'frontdesk' ? !ctx.restaurant : b.condition === 'has-tax' ? ctx.hasTax : b.condition === 'paid' ? ctx.paid : b.condition === 'unpaid' ? !ctx.paid : true;
    }
    function rbBlockMarkup(b,ctx,branding,editing=false) {
        const val = (source) => esc(rbValue(ctx,source));
        const pair = (label, value, heavy=false) => `<div class="rb-value-row ${heavy?'rb-strong-row':''}"><span>${esc(label)}</span><strong>${value || '—'}</strong></div>`;
        const block = (()=>{
            switch(b.type) {
                case 'header': return `<div class="rb-business">${branding.logoId && assetCache.has(branding.logoId) ? assetImg(branding.logoId,'rb-logo') : ''}<strong>${esc(branding.name || 'Your Resort')}</strong><small>${esc(branding.address || 'Cebu, Philippines')}</small>${branding.contact ? `<small>${esc(branding.contact)}</small>` : ''}${branding.branch ? `<small>Branch: ${esc(branding.branch)}</small>` : ''}${branding.tin ? `<small>TIN: ${esc(branding.tin)}</small>` : ''}${branding.registration ? `<small>${esc(branding.registration)}</small>` : ''}</div>`;
                case 'title': return `<div class="rb-title">${esc(ctx.paid ? b.text || 'PAYMENT ACKNOWLEDGEMENT' : 'UNPAID RESTAURANT BILL')}<small>NOT A TAX INVOICE</small></div>`;
                case 'metadata': return `<div class="rb-meta">${pair('Receipt No.',val('receiptNo'))}${pair('Date',val('date'))}${pair('Cashier',val('cashier'))}${pair('Location',val('location'))}${ctx.values.orderId?pair('Order',val('orderId')):''}</div>`;
                case 'items': return `<div class="rb-items"><div class="rb-items-head"><span>QTY / DESCRIPTION</span><span>AMOUNT</span></div>${ctx.items.length?ctx.items.filter(it=>!ctx.discountSummary || Number(it.amount)>=0).map(it=>`${it.group ? `<div class="rb-item-group">${esc(it.group)}</div>` : ''}<div class="rb-item"><span>${esc(it.qty)} × ${esc(it.name)}<small>${it.price ? rbCurrency(it.price)+' each' : ''}</small></span><strong>${rbCurrency(it.amount)}</strong></div>`).join(''):'<div class="rb-item">No item details recorded</div>'}</div>`;
                case 'discount': {
                    const d=ctx.discountSummary;
                    if(!d || !(d.vatRelief||d.statutoryDiscount||d.promoDiscount)) return editing?'<small class="rb-placeholder">Statutory / promotional discounts appear here when applicable.</small>':'';
                    return `<div class="rb-tax-breakdown"><div class="rb-tax-title">DISCOUNT BREAKDOWN</div>${pair('Original bill',rbCurrency(d.originalBill))}${d.vatRelief?pair('Less: statutory VAT exemption','−'+rbCurrency(d.vatRelief)):''}${d.statutoryDiscount?pair('Less: SC / PWD discount','−'+rbCurrency(d.statutoryDiscount)):''}${d.promoDiscount?pair('Less: promotional discount','−'+rbCurrency(d.promoDiscount)):''}${(d.entries||[]).filter(e=>e.kind==='statutory').map(e=>`<small class="rb-tax-note">${esc(e.type)} · ${esc(e.name)}${e.idLast4?' · ID ••••'+esc(e.idLast4):''}</small>`).join('')}</div>`;
                }
                case 'summary': return `${pair('ACTUAL BILL',rbCurrency(ctx.billTotal),true)}${!ctx.restaurant && ctx.dueBefore!==ctx.billTotal?pair('Due before payment',rbCurrency(ctx.dueBefore)):''}`;
                case 'payment': return ctx.paid ? `<div class="rb-meta">${pair('Payment method',val('method'))}${pair('Payment applied',val('amountApplied'),true)}${ctx.cash ? pair('Cash received',val('amountReceived'))+pair('CHANGE',val('change'),true) : pair('Amount received',val('amountReceived'))}${!ctx.restaurant && ctx.values.balance ? pair('Remaining balance',val('balance')) : ''}${ctx.values.reference ? pair('Reference No.',val('reference')) : ''}</div>` : pair('AMOUNT DUE',rbCurrency(ctx.billTotal),true);
                case 'tax': {
                    const t=ctx.taxDetails;
                    const taxTitle = `<div class="rb-tax-title">${t.example ? 'SAMPLE ' : ''}TAX INFORMATION</div>`;
                    if (t.mode === 'vat') return `<div class="rb-tax-breakdown">${taxTitle}${pair('VATable Sales',val('vatableSales'))}${pair('VAT-Exempt Sales',val('vatExemptSales'))}${pair('Zero-Rated Sales',val('zeroRatedSales'))}${pair('VAT Amount (12%)',val('vatAmount'))}<small class="rb-tax-note">VAT included in bill total${t.example ? ' · Preview values only' : ' · Standard-rated sales only'}</small></div>`;
                    if (t.mode === 'nonvat') return `<div class="rb-tax-breakdown">${taxTitle}${pair('Non-VAT Sales',val('nonVatSales'))}${pair('VAT Amount','Not applicable')}<small class="rb-tax-note">Business configured as Non-VAT registered</small></div>`;
                    if (t.mode === 'legacy') return `<div class="rb-tax-breakdown">${taxTitle}${pair('Recorded Tax',val('vatAmount'))}<small class="rb-tax-note">Historical record · Detailed VAT categories unavailable</small></div>`;
                    return `<div class="rb-tax-breakdown">${taxTitle}${pair('VATable Sales','—')}${pair('VAT-Exempt Sales','—')}${pair('Zero-Rated Sales','—')}${pair('VAT Amount','—')}<small class="rb-tax-note">Tax status not configured or not recorded · No VAT claimed</small></div>`;
                }
                case 'customer': return ctx.values.guest ? pair('Customer',val('guest')) : editing ? '<small class="rb-placeholder">Guest data not available for this sample.</small>':'';
                case 'footer': return `<div class="rb-footer">${esc(b.text || branding.footer || 'Thank you for visiting!')}<small>Payment acknowledgement only · Not a tax invoice</small></div>`;
                case 'text': return `<div class="rb-free-text">${esc(b.text || 'Your text here')}</div>`;
                case 'date': case 'number': case 'field': return pair(b.label || rbSourceLabel(b.source),val(b.source));
                case 'columns': return `<div class="rb-columns"><div style="width:${Number(b.columns||50)}%">${pair(b.leftLabel||rbSourceLabel(b.leftSource),val(b.leftSource))}</div><div style="width:${100-Number(b.columns||50)}%">${pair(b.rightLabel||rbSourceLabel(b.rightSource),val(b.rightSource))}</div></div>`;
                case 'divider': return '<div class="rb-dash"></div>';
                case 'spacer': return `<div style="height:${Math.max(4,Number(b.spacing||8))}px"></div>`;
                case 'image': return branding.logoId && assetCache.has(branding.logoId) ? assetImg(branding.logoId,'rb-logo') : '<small class="rb-placeholder">Upload a logo in Business Profile.</small>';
                case 'qr': return b.url ? `<div class="rb-qr-link">${esc(b.url)}</div>` : editing ? '<small class="rb-placeholder">Set an address (link only; QR graphics are not yet supported).</small>':'';
                default: return '';
            }
        })();
        if (!block) return '';
        const fontSize = Math.max(8,Math.min(24,Number(b.size||12)));
        const style = `font-size:${fontSize}px;text-align:${['left','center','right'].includes(b.align)?b.align:'left'};font-weight:${b.bold?'700':'400'};margin-bottom:${Math.max(0,Number(b.spacing||0))}px`;
        return `<div class="rb-receipt-block ${editing?'rb-editable':''} ${editing&&rbSelected===b.id?'selected':''}" ${editing?`data-action="rb-select" data-id="${esc(b.id)}" tabindex="0" role="button" aria-label="Edit ${esc(rbTypes.find(x=>x[0]===b.type)?.[1]||b.type)}"`:''} style="${style}">${block}</div>`;
    }
    function rbLayoutMarkup(layout, ctx, branding, editing=false) {
        return `<div class="rb-receipt-paper ${layout.format==='a4'?'rb-a4':''} ${layout.format==='58'?'rb-58':''}">${layout.blocks.filter(b=>editing || rbShow(b,ctx,editing)).map(b=> rbShow(b,ctx,editing) ? rbBlockMarkup(b,ctx,branding,editing) : editing ? `<div class="rb-hidden-block ${rbSelected===b.id?'selected':''}" data-action="rb-select" data-id="${esc(b.id)}">${esc(rbTypes.find(x=>x[0]===b.type)?.[1]||b.type)} · hidden for this example</div>` : '').join('')}</div>`;
    }
    function rbPrintDocument(layout,ctx,branding,format,title) {
        const paper=format==='a4'?'A4':format==='58'?'58mm':'80mm';
        return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)} · resortOS</title><style>@page{size:${paper==='A4'?'A4':paper+' 250mm'};margin:${format==='a4'?'15mm':'2mm'}}*{box-sizing:border-box}body{margin:0;background:#e9eff1;font:12px Arial,sans-serif;color:#161616}.rb-receipt-paper{background:#fff;width:${format==='a4'?'175mm':format==='58'?'48mm':'72mm'};margin:20px auto;padding:${format==='a4'?'12mm':'2mm'};min-height:120px;box-shadow:0 3px 20px #0002;overflow-wrap:anywhere}.rb-receipt-block{line-height:1.45}.rb-business,.rb-title{text-align:center}.rb-business strong,.rb-business small,.rb-title small{display:block}.rb-business strong{font-size:1.2em}.rb-business small,.rb-title small,.rb-item small{font-size:.79em}.rb-title{font-weight:700}.rb-title small{font-weight:400}.rb-footer small{display:block;margin-top:5px;font-size:.77em}.rb-value-row,.rb-item{display:flex;justify-content:space-between;gap:7px}.rb-value-row strong,.rb-item strong{text-align:right}.rb-strong-row{font-size:1.05em}.rb-item small{display:block}.rb-items-head{display:flex;justify-content:space-between;border-bottom:1px dashed #555;font-weight:700;margin-bottom:6px}.rb-item{margin:5px 0}.rb-item-group{margin:8px 0 3px;font-size:.83em;font-weight:700;overflow-wrap:anywhere}.rb-columns{display:flex;gap:4px}.rb-columns .rb-value-row{display:block}.rb-dash{border-top:1px dashed #333}.rb-logo{display:block;width:45px;max-height:45px;object-fit:contain;margin:auto}.rb-qr-link{word-break:break-all}.rb-placeholder{display:none}.rb-tax-title{font-size:.87em;font-weight:700;padding-bottom:4px}.rb-tax-note{display:block;color:#444;font-size:.78em;line-height:1.35;margin-top:5px}.rb-tax-breakdown .rb-value-row{margin:2px 0}.actions{text-align:center;padding:12px}.actions button{padding:11px 20px;background:#12323c;color:white;border:0;border-radius:7px;cursor:pointer;margin:4px}@media print{body{background:white}.rb-receipt-paper{padding:0;width:100%;margin:0;box-shadow:none}.actions{display:none}}</style></head><body>${rbLayoutMarkup({...layout,format},ctx,branding,false)}<div class="actions"><button onclick="window.print()">Print Receipt</button><button onclick="window.close()">Close</button></div></body></html>`;
    }
    function rbOpenPrint(html) {
        const w=window.open('','_blank');
        if(!w){toast('Allow pop-ups for receipt previews.',true);return;}
        w.document.open();w.document.write(html);w.document.close();
    }
    function rbTestPrint() {
        const ctx=rbDemoContext();
        rbOpenPrint(rbPrintDocument(rbWorking,ctx,data.receiptSettings,rbFormat,'Sample receipt'));
    }
    function rbFieldSelect(name,val) { return `<select class="select" data-rb-prop="${name}">${rbSources.map(([key,label])=>`<option value="${key}" ${val===key?'selected':''}>${esc(label)}</option>`).join('')}</select>`; }
    const rbPropText = (name,label,value) => `<label class="rb-property"><span>${esc(label)}</span><input class="input" data-rb-prop="${name}" value="${esc(value ?? '')}" maxlength="220"></label>`;
    function rbProperties() {
        const b=rbSelectedBlock();
        if(!b) return '<div class="rb-prop-empty">Select a receipt block to edit its content, appearance, and display rules.</div>';
        const name=rbTypes.find(x=>x[0]===b.type)?.[1]||b.type;
        let props='';
        if(['title','text','footer'].includes(b.type)) props+=rbPropText('text','Text',b.text);
        if(['field','date','number'].includes(b.type)) props+=rbPropText('label','Printed label',b.label)+`<label class="rb-property"><span>Automatic data source</span>${rbFieldSelect('source',b.source)}</label>`;
        if(b.type==='columns') props+=rbPropText('leftLabel','Left label',b.leftLabel)+`<label class="rb-property"><span>Left data</span>${rbFieldSelect('leftSource',b.leftSource)}</label>`+rbPropText('rightLabel','Right label',b.rightLabel)+`<label class="rb-property"><span>Right data</span>${rbFieldSelect('rightSource',b.rightSource)}</label><label class="rb-property"><span>Left column width: ${b.columns}%</span><input type="range" min="25" max="75" step="5" value="${b.columns}" data-rb-prop="columns"></label>`;
        if(b.type==='qr') props+=rbPropText('url','Website / feedback URL',b.url)+'<p class="rb-hint">V1 prints this as a URL, not a scannable QR image.</p>';
        if(b.type==='header'||b.type==='image') props+='<p class="rb-hint">Logo and business details are managed in Receipt Settings → Business Profile.</p>';
        if(['items','summary','payment','discount','tax','metadata','customer'].includes(b.type)) props+='<p class="rb-hint">This block pulls the actual recorded transaction values. The receipt design cannot alter payment amounts or calculate taxes.</p>';
        if(b.type==='tax') props+='<p class="rb-hint">Tax breakdown is always visible by default. Configure the tax registration status in Business Profile. VAT figures are only calculated for newly recorded payments using the configured standard VAT-inclusive model.</p>';
        props+=`<div class="rb-prop-subhead">Appearance</div><label class="rb-property"><span>Alignment</span><select class="select" data-rb-prop="align">${['left','center','right'].map(a=>`<option value="${a}" ${b.align===a?'selected':''}>${a[0].toUpperCase()+a.slice(1)}</option>`).join('')}</select></label><div class="rb-prop-grid"><label class="rb-property"><span>Font size (px)</span><input class="input" type="number" min="8" max="24" data-rb-prop="size" value="${b.size}"></label><label class="rb-property"><span>Space after (px)</span><input class="input" type="number" min="0" max="60" data-rb-prop="spacing" value="${b.spacing}"></label></div><label class="rb-prop-check"><input type="checkbox" data-rb-prop="bold" ${b.bold?'checked':''}> Bold text</label><div class="rb-prop-subhead">Display rules</div><label class="rb-property"><span>Show block when</span><select class="select" data-rb-prop="condition">${[['always','Always'],['cash','Cash payment'],['noncash','Non-cash payment'],['balance','Remaining balance'],['paid','Payment recorded'],['unpaid','Unpaid bill'],['restaurant','Restaurant only'],['frontdesk','Front Desk only'],['has-tax','Recorded tax data available']].map(([key,label])=>`<option value="${key}" ${b.condition===key?'selected':''}>${label}</option>`).join('')}</select></label><label class="rb-prop-check"><input type="checkbox" data-rb-prop="visible" ${b.visible!==false?'checked':''}> Enabled in this template</label>`;
        return `<div class="rb-prop-title"><strong>${esc(name)}</strong><small>${esc(b.id)}</small></div>${props}<div class="rb-prop-actions"><button data-action="rb-duplicate" class="btn small">Duplicate</button><button data-action="rb-delete" class="btn danger small">Remove</button></div>`;
    }
    function receiptBuilderPage() {
        if (!rbWorking || rbWorking.area!==rbArea || rbWorking.format!==rbFormat) rbLoadWorking();
        const published = data.receiptLayouts.versions.find(v=>v.id===data.receiptLayouts.published[rbKey()]);
        const blocks=rbWorking.blocks;
        return `<div class="rb-page ad-page"><div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / SYSTEM MANAGEMENT / RECEIPT BUILDER</span><h1>Design every <span>printed detail.</span></h1><p>Customize the Philippine-style payment acknowledgement without changing recorded transactions.</p></div><div class="rb-top-actions"><button class="btn" data-action="rb-branding">Business Profile</button><button class="btn" data-action="rb-undo" ${!rbUndoStack.length?'disabled':''}>↶ Undo</button><button class="btn" data-action="rb-redo" ${!rbRedoStack.length?'disabled':''}>↷ Redo</button><button class="btn" data-action="rb-test-print">Preview & Print</button><button class="btn" data-action="rb-save">Save Draft</button><button class="btn" data-action="rb-copy">Save as Copy</button><button class="btn primary" data-action="rb-publish">Publish Template</button></div></div>
        <div class="rb-toolbar"><label>Template name<input class="input" data-rb-layout-name maxlength="90" value="${esc(rbWorking.name)}"></label><label>Department<select class="select" data-rb-switch="area"><option value="restaurant" ${rbArea==='restaurant'?'selected':''}>Restaurant</option><option value="frontdesk" ${rbArea==='frontdesk'?'selected':''}>Front Desk</option></select></label><label>Paper format<select class="select" data-rb-switch="format">${rbFormats.map(([key,name])=>`<option value="${key}" ${rbFormat===key?'selected':''}>${name}</option>`).join('')}</select></label><label>Preview transaction<select class="select" data-rb-switch="demo"><option value="cash" ${rbDemoMode==='cash'?'selected':''}>Cash + Change</option><option value="gcash" ${rbDemoMode==='gcash'?'selected':''}>GCash / Non-cash</option><option value="partial" ${rbDemoMode==='partial'?'selected':''}>Partial Payment</option></select></label><div class="rb-saved-drafts"><small>Saved copies</small><select class="select" data-rb-saved-copy><option value="">Select a design...</option>${data.receiptLayouts.savedDrafts.filter(x=>x.key===rbKey()).map(x=>`<option value="${esc(x.id)}" ${rbActiveSavedId===x.id?'selected':''}>${esc(x.layout.name)}</option>`).join('')}</select>${rbActiveSavedId?'<button class="btn danger small" data-action="rb-delete-copy">Delete copy</button>':''}</div><div class="rb-toolbar-status"><span class="${rbDirty?'rb-dirty':''}">${rbDirty?'● Unsaved changes':'✓ Draft saved'}</span><small>Published ${published?new Date(published.created).toLocaleDateString('en-PH'):'—'}</small></div><button class="btn small" data-action="rb-reset">Restore published</button></div>
        <div class="rb-editor"><aside class="rb-sidebar rb-elements"><div class="rb-panel-heading"><strong>Elements</strong><small>Add a block, then drag it into position</small></div><div class="rb-element-grid">${rbTypes.map(([type,name])=>`<button class="rb-add-element" data-action="rb-add" data-id="${type}" draggable="true" data-rb-palette="${type}"><span>＋</span>${esc(name)}</button>`).join('')}</div></aside><section class="rb-stage"><div class="rb-stage-heading"><span>${esc(rbWorking.name)} · ${rbFormat==='a4'?'A4':rbFormat+' mm'}</span><small>Drag blocks or use ↑ ↓ to reorder</small></div><div class="rb-stage-paper" id="rb-preview">${rbLayoutMarkup(rbWorking,rbDemoContext(),data.receiptSettings,true)}</div><div class="rb-stack"><div class="rb-stack-title">Receipt section order</div>${blocks.map((b,i)=>`<div class="rb-stack-item ${rbSelected===b.id?'active':''}" data-rb-drag-id="${esc(b.id)}" draggable="true"><button data-action="rb-select" data-id="${esc(b.id)}"><span class="rb-grip">⠿</span>${esc(rbTypes.find(t=>t[0]===b.type)?.[1]||b.type)}${b.visible===false?' · Hidden':''}</button><button title="Move up" aria-label="Move block up" data-action="rb-move-up" data-id="${esc(b.id)}" ${!i?'disabled':''}>↑</button><button title="Move down" aria-label="Move block down" data-action="rb-move-down" data-id="${esc(b.id)}" ${i===blocks.length-1?'disabled':''}>↓</button></div>`).join('')}</div></section><aside class="rb-sidebar rb-properties"><div class="rb-panel-heading"><strong>Properties</strong><small>Selected receipt element</small></div>${rbProperties()}</aside></div>
        <div class="rb-guide-note"><strong>Publishing is safe:</strong> payment values come from real transactions. Each new receipt stores references to its published template versions, so editing later will not change historical reprints. Tax breakdown always appears in the default design; figures are recorded only after tax status is configured. These acknowledgements are not BIR sales invoices. Drafts and templates are browser-local in V1.</div></div>`;
    }
    function rbUpdatePreview() {
        const preview = document.getElementById('rb-preview');
        if (preview && rbWorking) preview.innerHTML = rbLayoutMarkup(rbWorking,rbDemoContext(),data.receiptSettings,true);
        const status = document.querySelector('.rb-toolbar-status > span');
        if(status){status.textContent = rbDirty?'● Unsaved changes':'✓ Draft saved'; status.className=rbDirty?'rb-dirty':'';}
        const undo=document.querySelector('[data-action="rb-undo"]'),redo=document.querySelector('[data-action="rb-redo"]');
        if(undo) undo.disabled=!rbUndoStack.length;
        if(redo) redo.disabled=!rbRedoStack.length;
    }
    function rbUpdateProp(el) {
        if(!rbWorking || !rbSelectedBlock()) return;
        const b=rbSelectedBlock(), k=el.dataset.rbProp;
        if(!Object.prototype.hasOwnProperty.call(b,k)) return;
        const newValue = ['visible','bold'].includes(k) ? el.checked : ['size','spacing','columns'].includes(k) ? Math.max(0,Number(el.value)||0) : String(el.value).slice(0,220);
        if(b[k]===newValue) return;
        rbHistory('property:'+k);
        b[k]=newValue;
        if(k==='size') b[k] = Math.min(24,Math.max(8,b[k]));
        if(k==='columns') b[k] = Math.min(75,Math.max(25,b[k]));
        rbDirty=true;
        rbUpdatePreview();
    }
    function rbAction(act,id) {
        if (!act.startsWith('rb-')) return false;
        if (!adminOnly()) { toast('Admin access required.',true); return true; }
        if(act==='rb-branding'){go('receiptsettings');return true;}
        if(act==='rb-undo'||act==='rb-redo'){rbUndoAction(act==='rb-undo'?'undo':'redo');return true;}
        if(act==='rb-copy'){
            const entry={id:uid('RBD'),key:rbKey(),created:new Date().toISOString(),layout:rbClone(rbWorking)};
            data.receiptLayouts.savedDrafts.push(entry);rbActiveSavedId=entry.id;
            data.receiptLayouts.drafts[rbKey()]=rbClone(rbWorking);
            save();rbDirty=false;render();toast('New named draft created.');return true;
        }
        if(act==='rb-load-copy'){
            const entry=data.receiptLayouts.savedDrafts.find(x=>x.id===id&&x.key===rbKey());
            if(!entry)return true;
            if(rbDirty&&!window.confirm('Discard unsaved changes to open this draft?'))return true;
            rbWorking=rbClone(entry.layout);rbSelected=rbWorking.blocks[0]?.id||'';rbActiveSavedId=entry.id;rbDirty=false;rbUndoStack=[];rbRedoStack=[];render();return true;
        }
        if(act==='rb-delete-copy'){
            if(!rbActiveSavedId||!window.confirm('Delete this saved draft copy? Published receipt versions remain unchanged.'))return true;
            data.receiptLayouts.savedDrafts=data.receiptLayouts.savedDrafts.filter(x=>x.id!==rbActiveSavedId);
            rbActiveSavedId='';save();render();toast('Saved draft copy deleted.');return true;
        }
        if(act==='rb-test-print'){rbTestPrint();return true;}
        if(act==='rb-save' || act==='rb-publish') {
            const name=rbWorking.name.trim();
            if(!name || !rbWorking.blocks.length){toast('Template needs a name and at least one block.',true);return true;}
            if(act==='rb-publish' && !rbWorking.blocks.some(b=>b.type==='tax' && b.visible!==false && b.condition==='always')) {
                toast('Add an enabled Tax Breakdown block with Always visibility before publishing.',true);return true;
            }
            data.receiptLayouts.drafts[rbKey()]=rbClone(rbWorking);
            if(rbActiveSavedId){const saved=data.receiptLayouts.savedDrafts.find(x=>x.id===rbActiveSavedId);if(saved) saved.layout=rbClone(rbWorking);}
            if(act==='rb-publish') {
                const version={id:uid('RBV'),key:rbKey(),created:new Date().toISOString(),layout:rbClone(rbWorking)};
                data.receiptLayouts.versions.push(version);
                data.receiptLayouts.published[rbKey()]=version.id;
                audit(`Published ${rbArea} ${rbFormat} receipt template`, 'Admin',{module:'System Management',type:'update',target:'Receipt Builder'});
            }
            save();rbDirty=false;render();toast(act==='rb-publish'?'Receipt template published for future payments.':'Receipt draft saved.');return true;
        }
        if(act==='rb-reset') {
            if(!window.confirm('Restore this draft from the published receipt design?')) return true;
            rbWorking=rbClone(rbPublishedLayout(rbArea,rbFormat));
            data.receiptLayouts.drafts[rbKey()]=rbClone(rbWorking);
            rbSelected=rbWorking.blocks[0]?.id||'';rbDirty=false;save();render();toast('Draft restored to published template.');return true;
        }
        if(act==='rb-select'){rbSelected=id;render();return true;}
        if(act==='rb-add') {
            if(!rbTypes.some(([type])=>type===id))return true;
            rbHistory();const b=rbBlock(id);rbWorking.blocks.push(b);rbSelected=b.id;rbDirty=true;render();return true;
        }
        const index=rbWorking?.blocks.findIndex(x=>x.id===(id||rbSelected))??-1;
        if(index<0)return true;
        rbHistory();
        if(act==='rb-duplicate') {const b=rbClone(rbWorking.blocks[index]);b.id=rbBlock(b.type).id;rbWorking.blocks.splice(index+1,0,b);rbSelected=b.id;}
        else if(act==='rb-delete') {rbWorking.blocks.splice(index,1);rbSelected=rbWorking.blocks[Math.min(index,rbWorking.blocks.length-1)]?.id||'';}
        else if(act==='rb-move-up' && index>0) {[rbWorking.blocks[index-1],rbWorking.blocks[index]]=[rbWorking.blocks[index],rbWorking.blocks[index-1]];}
        else if(act==='rb-move-down' && index<rbWorking.blocks.length-1) {[rbWorking.blocks[index+1],rbWorking.blocks[index]]=[rbWorking.blocks[index],rbWorking.blocks[index+1]];}
        else return true;
        rbDirty=true;render();return true;
    }
    function rbSwitch(el) {
        const key=el.dataset.rbSwitch, value=el.value;
        if(key==='demo'){rbDemoMode=value;render();return;}
        if(rbDirty && !window.confirm('Discard unsaved changes? Save your draft before switching.')){el.value=key==='area'?rbArea:rbFormat;return;}
        if(key==='area') rbArea=value==='frontdesk'?'frontdesk':'restaurant';
        if(key==='format') rbFormat=['58','80','a4'].includes(value)?value:'80';
        rbLoadWorking();render();
    }
    function rbMoveDrag(dragId,targetId) {
        const list=rbWorking.blocks;
        const i=list.findIndex(x=>x.id===dragId), j=list.findIndex(x=>x.id===targetId);
        if(i<0||j<0||i===j)return;
        rbHistory();const [block]=list.splice(i,1);list.splice(j,0,block);
        rbSelected=block.id;rbDirty=true;render();
    }

    let data = migrateFeatures(load()), role = 'frontdesk', route = 'dashboard', mobile = false, cart = {}, filter = 'all', search = '', orderDest = 'table', currentTable = '03', currentRoom = '', draftOrderId = null, menuCategory = null;
    let auditFilters = {
        query: '',
        module: 'all',
        type: 'all',
        staff: 'all',
        from: '',
        to: ''
    }, auditPageNum = 1;
    const save = () => localStorage.setItem(KEY, JSON.stringify(data));
    const stayFor = room => data.stays.find(s => s.active && Number(s.room) === Number(room));
    const total = o => o.items.reduce((n, i) => n + i.qty * i.price, 0);
    const remain = c => Math.max(0, Number(c.amount) - Number(c.paid || 0));
    const dueForStay = id => data.charges.filter(c => c.stayId === id && c.status !== 'void').reduce((n, c) => n + remain(c), 0);
    const roomLabel = id => `Room ${id}`;
    const occupied = () => data.stays.filter(s => s.active).length;
    const activeRooms = () => data.rooms.filter(r => r.active !== false);
    const vacantRooms = () => activeRooms().length - occupied();
    const pendingCharges = () => data.charges.filter(c => c.status !== 'void' && remain(c) > 0);
    function inferAuditType(action) {
        const a = String(action || '').toLowerCase();
        if (/ticket|support request/i.test(a))
            return 'support';
        if (/deleted|archived/.test(a))
            return 'remove';
        if (/voided|void order|reversal/.test(a))
            return 'void';
        if (/received|payment|settlement/.test(a))
            return 'payment';
        if (/checked out/.test(a))
            return 'checkout';
        if (/posted.*(charge|bill|service)/.test(a))
            return 'posting';
        if (/added.*items|created.*order|ready for payment|dining resumed/.test(a))
            return 'order';
        if (/registered.*stay/.test(a))
            return 'stay';
        if (/updated|edited/.test(a))
            return 'update';
        if (/added|created/.test(a))
            return 'create';
        return 'other';
    }
    function inferAuditModule(action, by) {
        if (by === 'Admin')
            return 'System Management';
        if (by === 'Front Desk')
            return 'Front Desk';
        if (by === 'Restaurant Staff' || by === 'Maria Santos' || by === 'Jose Reyes')
            return 'Restaurant';
        return /restaurant|table|order/i.test(action) ? 'Restaurant' : /room|stay|checkout|charge/i.test(action) ? 'Front Desk' : 'System Management';
    }
    function inferAuditTarget(action) {
        const s = String(action || '');
        const rm = s.match(/Room\s*\d+/i), order = s.match(/R-\d+/i), table = s.match(/Table\s*\d+/i);
        return rm ? rm[0] : order ? order[0] : table ? table[0] : '—';
    }
    function normalizeAuditEntry(a, i) {
        const action = String(a?.action || 'Recorded activity');
        const by = String(a?.by || 'Unknown');
        return {
            id: a?.id || ('LEGACY-' + (a?.time || 'unknown') + '-' + i),
            time: a?.time || new Date().toISOString(),
            by,
            action,
            module: a?.module || inferAuditModule(action, by),
            type: a?.type || inferAuditType(action),
            target: a?.target || inferAuditTarget(action),
            ...a
        };
    }
    const uid = p => p + '-' + (Date.now() % 1000000) + '-' + Math.floor(Math.random() * 1000);
    function audit(action, by, meta = {}) {
        if (['Front Desk', 'Restaurant Staff', 'Admin'].includes(by)) by = employeeLabel();
        const event = {
            id: uid('EVT'),
            time: new Date().toISOString(),
            by,
            action,
            module: inferAuditModule(action, by),
            type: inferAuditType(action),
            target: inferAuditTarget(action),
            ...meta
        };
        data.audit.unshift(event);
        return event;
    }
    let bellOpen = false, notificationShow = 'all', notificationToastTimer = null;
    let ticketFilters = { query: '', status: 'all', category: 'all', priority: 'all', department: 'all', attention: 'all', view: 'mine' };
    function unreadNotifications(r = role) {
        return (data.notifications || []).filter(n => n.role === r && !n.read).length;
    }
    function notify(roles, title, body, opts = {}) {
        const allowed = [...new Set(Array.isArray(roles) ? roles : [roles])].filter(r => navs[r]);
        for (const targetRole of allowed) {
            const n = {
                id: uid('NTF'),
                role: targetRole,
                title,
                body,
                kind: opts.kind || 'info',
                route: opts.route || 'dashboard',
                entityId: opts.entityId || '',
                created: new Date().toISOString(),
                read: false
            };
            data.notifications.unshift(n);
            if (targetRole === role)
                showNotificationToast(n);
        }
        if (data.notifications.length > 500)
            data.notifications = data.notifications.slice(0, 500);
    }
    function showNotificationToast(n) {
        const root = document.getElementById('notify-toast-root');
        if (!root)
            return;
        root.innerHTML = `<div class="notification-toast ${esc(n.kind)}" role="status"><div class="notification-toast-icon">${n.kind === 'warning' ? '!' : n.kind === 'success' ? '✓' : '🔔'}</div><div><strong>${esc(n.title)}</strong><p>${esc(n.body)}</p></div></div>`;
        clearTimeout(notificationToastTimer);
        notificationToastTimer = setTimeout(() => {
            root.innerHTML = '';
        }, 4500);
    }
    function bellMarkup() {
        const arr = (data.notifications || []).filter(n => n.role === role && (notificationShow === 'all' || !n.read));
        const unread = unreadNotifications();
        return `<div class="notification-popover" role="dialog" aria-label="Notifications"><div class="notification-popover-head"><div><h3>Notifications</h3><small>${unread} unread · ${esc(HELP_ROLES[role])}</small></div><button class="icon-btn" data-action="notify-toggle" aria-label="Close notifications">×</button></div><div class="notification-controls"><button data-action="notify-filter" data-id="all" class="notification-filter ${notificationShow === 'all' ? 'active' : ''}">All</button><button data-action="notify-filter" data-id="unread" class="notification-filter ${notificationShow === 'unread' ? 'active' : ''}">Unread</button><button data-action="notify-read-all" ${unread ? '' : 'disabled'}>Mark all read</button></div><div class="notification-scroll">${arr.length ? arr.slice(0, 100).map(n => `<button class="notification-entry ${n.read ? '' : 'unread'}" data-action="notify-open" data-id="${esc(n.id)}"><span class="notification-entry-icon ${esc(n.kind)}">${n.kind === 'warning' ? '!' : n.kind === 'success' ? '✓' : '●'}</span><span><strong>${esc(n.title)}</strong><span>${esc(n.body)}</span><small>${prettyTime(n.created)} · ${n.read ? 'Read' : 'New'}</small></span></button>`).join('') : `<div class="notification-empty"><strong>You're all caught up</strong><p>${notificationShow === 'unread' ? 'No unread notifications.' : 'Updates from your departments will appear here.'}</p></div>`}</div><div class="notification-foot">Changes appear instantly in this browser. Cross-device delivery requires the backend.</div></div>`;
    }
    function syncBell() {
        if (bellOpen) {
            const toastRoot = document.getElementById('notify-toast-root');
            if (toastRoot)
                toastRoot.innerHTML = '';
        }
        const count = unreadNotifications();
        document.querySelectorAll('.notify-count').forEach(el => {
            el.textContent = count > 99 ? '99+' : count;
            el.hidden = !count;
        });
        let p = document.getElementById('notify-popover-root');
        if (p)
            p.innerHTML = bellOpen ? bellMarkup() : '';
    }
    function notifyNavigate(n) {
        n.read = true;
        save();
        bellOpen = false;
        const target = n.route || 'dashboard';
        if (!routeAllowed(target)) {
            go('dashboard');
            return;
        }
        closeModal();
        go(target);
        if (n.entityId) {
            if (target === 'tickets')
                openTicket(n.entityId);
            if (role === 'restaurant' && target === 'tables')
                openTable(n.entityId);
            if (role === 'frontdesk' && target === 'rooms') {
                const st = stayFor(n.entityId);
                if (st)
                    viewStay(st.id);
            }
        }
    }
    function badge(x) {
        let key = {
            unpaid: 'amber',
            partial: 'violet',
            settled: 'green',
            posted: 'green',
            pending: 'amber',
            awaiting_payment: 'violet',
            paid: 'green',
            void: 'red',
            vacant: 'neutral',
            occupied: 'green',
            active: 'green'
        }[x] || 'neutral';
        return `<span class="badge ${key}">${esc(x === 'awaiting_payment' ? 'Waiting for payment' : x[0].toUpperCase() + x.slice(1))}</span>`;
    }
    function btn(label, act, opts = {}) {
        return `<button type="button" class="btn ${opts.primary ? 'primary' : ''} ${opts.danger ? 'danger' : ''} ${opts.small ? 'small' : ''} ${opts.full ? 'full' : ''}" data-action="${esc(act)}" ${opts.id ? `data-id="${esc(opts.id)}"` : ''}>${label}</button>`;
    }
    const premiumIconPaths = {
        dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
        rooms: '<path d="M3 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M3 21h18M17 9h2a2 2 0 0 1 2 2v10M9 12h.01M7 7h6"/>',
        stays: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 13h18M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>',
        charges: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/>',
        checkout: '<path d="M4 12h16M14 6l6 6-6 6"/><path d="M4 5h7M4 19h7"/>',
        tickets: '<path d="M4 5h16a2 2 0 0 1 2 2v3a3 3 0 0 0 0 6v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a3 3 0 0 0 0-6V7a2 2 0 0 1 2-2Z"/><path d="M13 5v2m0 4v2m0 4v2"/>',
        tables: '<rect x="4" y="6" width="16" height="9" rx="2"/><path d="M7 15v6m10-6v6M2 10h2m16 0h2"/>',
        orders: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3.5h6M9 9h6M9 13h6M9 17h4"/>',
        roomcharges: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 8h10M7 12h6M7 16h10"/>',
        audit: '<path d="M5 4h14v16H5zM9 9h6M9 13h6M9 17h4"/>',
        system: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m19.4 15 .4 1.4-2.3 2.3-1.4-.4-1.4.8-.4 1.5h-3.2l-.4-1.5-1.4-.8-1.4.4-2.3-2.3.4-1.4L5.2 13l-1.5-.4V9.4L5.2 9l.8-1.4-.4-1.4 2.3-2.3 1.4.4 1.4-.8.4-1.5h3.2l.4 1.5 1.4.8 1.4-.4 2.3 2.3-.4 1.4.8 1.4 1.5.4v3.2l-1.5.4Z"/>',
        receipt: '<path d="M5 3h14v18l-3.5-2-3.5 2-3.5-2L5 21V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
        up: '<path d="m7 17 10-10M8 7h9v9"/>',
        check: '<path d="m5 12 4 4L19 6"/>',
        checkcircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
        bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
        sparkle: '<path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/>',
        wallet: '<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M3 9h18M16 15h2"/>',
        right: '<path d="m9 18 6-6-6-6"/>',
        alert: '<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3v.01"/>',
        users: '<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 20v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8"/>',
        support: '<path d="M3 12a9 9 0 0 1 18 0M3 12v6a2 2 0 0 0 2 2h2v-8H3Zm18 0v6a2 2 0 0 1-2 2h-2v-8h4Z"/>',
        layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
        corner: '<path d="M5 5h14v14H5zM9 12h6M12 9v6"/>'
    };
    function premiumIcon(name, size = 20) {
        return `<svg class="ui-line-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${premiumIconPaths[name] || premiumIconPaths.layers}</svg>`;
    }
    function tile(name, desc, act) {
        return `<button class="action-tile" data-action="${act}"><span><strong>${name}</strong><small>${desc}</small></span><span>›</span></button>`;
    }
    function kpi(label, value, desc, c = '') {
        return `<div class="card metric"><div class="metric-top"><span class="metric-symbol ${c}">◆</span>${label}</div><div class="metric-number">${value}</div><div class="metric-desc">${desc}</div></div>`;
    }
    function header(name, desc, actions = '') {
        return `<header class="page-header"><div><h1>${name}</h1><p>${desc}</p></div>${actions ? `<div class="header-cta">${actions}</div>` : ''}</header>`;
    }
    function card(name, desc, body, more = '') {
        return `<section class="card"><div class="card-head"><div><h2>${name}</h2>${desc ? `<p class="sub">${desc}</p>` : ''}</div>${more}</div>${body}</section>`;
    }
    function table(head, rows) {
        return `<div class="table-wrap"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.join('') : `<tr><td colspan="${head.length}"><div class="empty"><strong>Nothing to show yet</strong>Records will appear here as you work.</div></td></tr>`}</tbody></table></div>`;
    }
    const employee = () => data.employees.find(x => x.id === currentEmployeeId && x.active) || data.employees.find(x => x.role === 'admin' && x.active) || data.employees.find(x => x.active);
    let currentEmployeeId = sessionStorage.getItem('resortOS-demo-employee') || 'EMP-001';
    const employeeLabel = () => employee()?.name || 'Demo Employee';
    const hasAccess = r => !!employee()?.access?.includes(r);
    const adminOnly = () => role === 'admin' && employee()?.role === 'admin';
    const canVoid = () => role === 'admin' || employee()?.capabilities?.voidOrder !== false;
    const categoryActive = name => data.categories.find(c => c.name === name)?.active !== false;
    const activeMethods = () => data.paymentMethods.filter(p => p.active !== false);
    const methodOptions = selected => activeMethods().map(p => `<option value="${esc(p.id)}" ${p.id === selected ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
    const selectedMethod = id => data.paymentMethods.find(x => x.id === id && x.active !== false);
    const isCashMethod = method => method?.type === 'cash' || (!method?.type && /^cash(?:\s|$)/i.test(String(method?.name || method || '').trim()));
    const peso2 = n => '₱' + Number(Math.round(Number(n || 0) * 100) / 100).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    function paymentInputs(due, amount = '', kind = 'frontdesk') {
        const initial = amount === '' ? '' : Number(amount).toFixed(2);
        return `<div class="payment-simple"><div class="field"><label data-payment-label for="pay-entry-amount">Cash received (₱)</label><input class="input" id="pay-entry-amount" name="amount" data-payment-amount type="number" inputmode="decimal" step="0.01" min="0.01" value="${esc(initial)}" placeholder="Enter amount handed over" required><small class="text-muted" data-payment-explainer>Enter the money received. Only cash payments allow change. Partial payments are supported at Front Desk.</small></div><div class="field"><label for="pay-entry-method">Payment method</label><select id="pay-entry-method" class="select" name="method">${methodOptions()}</select><small class="text-muted">Non-cash payments cannot exceed the amount due.</small></div></div><div class="payment-breakdown" role="status" aria-live="polite"><div><span>Amount applied</span><strong data-payment-applied>${peso2(0)}</strong></div><div data-cash-change><span>Change to return</span><strong class="payment-change" data-payment-change>${peso2(0)}</strong></div><div><span>Balance after payment</span><strong data-payment-remaining>${peso2(due)}</strong></div><small data-payment-message>${kind === 'restaurant' ? 'Restaurant bills must be paid in full.' : 'Only the amount applied reduces the guest balance.'}</small></div>`;
    }
    function paymentMath(form) {
        const due = Math.round(Number(form?.dataset.due || 0) * 100) / 100;
        const tendered = Math.round(Number(form?.elements.amount.value || 0) * 100) / 100;
        const method = selectedMethod(form?.elements.method.value);
        const cash = isCashMethod(method);
        const full = form?.dataset.paymentKind === 'restaurant';
        const amount = cash ? Math.min(due, tendered) : tendered;
        const change = cash ? Math.max(0, Math.round((tendered - due) * 100) / 100) : 0;
        const remaining = Math.max(0, Math.round((due - amount) * 100) / 100);
        const valid = !!method && Number.isFinite(tendered) && tendered > 0 && (cash || tendered <= due) && (!full || tendered >= due) && due > 0;
        return { due, tendered, amount, change, remaining, cash, full, method, valid };
    }
    function updatePaymentCalculator(form) {
        if (!form?.matches('[data-payment-calculator]')) return;
        const calc = paymentMath(form);
        const field = form.elements.amount;
        const label = form.querySelector('[data-payment-label]');
        if (label) label.textContent = calc.cash ? 'Cash received (₱)' : 'Amount received (₱)';
        const changeRow = form.querySelector('[data-cash-change]');
        if (changeRow) changeRow.hidden = !calc.cash;
        const explainer = form.querySelector('[data-payment-explainer]');
        if (explainer) explainer.textContent = calc.cash ? 'Enter the cash handed over, even if it exceeds the bill.' : 'Enter the amount actually received through this method. Payments cannot exceed the bill.';
        if (field) { field.max = calc.cash ? '' : String(calc.due); field.placeholder = calc.cash ? 'Enter cash handed over' : 'Enter exact amount received'; }
        const values = [['[data-payment-applied]', calc.amount], ['[data-payment-change]', calc.change], ['[data-payment-remaining]', calc.remaining]];
        values.forEach(([query, val]) => { const target = form.querySelector(query); if (target) target.textContent = peso2(Math.max(0, val)); });
        const hint = form.querySelector('[data-payment-message]');
        if (hint) hint.textContent = calc.full && calc.tendered < calc.due ? `Restaurant payment requires ${peso2(calc.due)}. Enter sufficient cash or the full non-cash amount.` : !calc.cash && calc.tendered > calc.due ? 'This payment method cannot receive more than the amount due.' : calc.cash && calc.change > 0 ? `Return ${peso2(calc.change)} in cash change. Only ${peso2(calc.amount)} will be recorded as payment.` : calc.full ? 'Restaurant orders require full payment before the table is released.' : 'The applied amount will reduce the outstanding charges; partial payment is allowed.';
    }
    const assetCache = new Map();
    let assetDB = null;
    const assetDatabase = () => new Promise((resolve, reject) => {
        if (assetDB) { resolve(assetDB); return; }
        const req = indexedDB.open('resortOS-images-v1', 1);
        req.onupgradeneeded = () => req.result.createObjectStore('images', { keyPath: 'id' });
        req.onsuccess = () => { assetDB = req.result; resolve(assetDB); };
        req.onerror = () => reject(req.error);
    });
    async function loadAssets() {
        try {
            const db = await assetDatabase();
            const rows = await new Promise((resolve, reject) => { const req = db.transaction('images', 'readonly').objectStore('images').getAll(); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); });
            rows.forEach(row => assetCache.set(row.id, row.data));
            render();
        } catch { toast('Image storage is not available in this browser.', true); }
    }
    const assetImg = (id, className = '') => id && assetCache.has(id) ? `<img class="${className}" src="${assetCache.get(id)}" alt="">` : `<span class="asset-placeholder ${className}">▧</span>`;
    async function saveImage(file) {
        if (!file || !file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) throw Error('Choose a JPG, PNG or WebP image smaller than 8 MB.');
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(Error('Could not read image.')); reader.readAsDataURL(file);
        });
        const image = await new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => reject(Error('Invalid image.')); img.src = dataUrl; });
        const size = Math.min(1, 1100 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(image.width * size)); canvas.height = Math.max(1, Math.round(image.height * size));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', .78);
        const id = uid('IMG');
        const db = await assetDatabase();
        await new Promise((resolve, reject) => { const req = db.transaction('images', 'readwrite').objectStore('images').put({ id, data: compressed }); req.onsuccess = resolve; req.onerror = () => reject(req.error); });
        assetCache.set(id, compressed);
        return id;
    }
    const imageField = (id = '') => `<div class="field"><label>Photo (optional)</label><div class="asset-input-preview" id="asset-preview">${assetImg(id, 'asset-thumb')}</div><input class="input" type="file" data-asset-file accept="image/png,image/jpeg,image/webp"><input name="imageId" type="hidden" value="${esc(id)}"><small class="text-muted">JPG, PNG or WebP up to 8 MB. Photo is stored on this device.</small>${id ? '<button type="button" class="btn small" data-action="asset-clear">Clear photo</button>' : ''}</div>`;
    const nextRecordId = prefix => prefix + '-' + String((data.paymentRecords.length ? Math.max(0, ...data.paymentRecords.map(p => Number(String(p.id).split('-').at(-1)) || 0)) : 0) + 1).padStart(6, '0');
    function recordPayment(info) {
        const payment = { id: nextRecordId('PAY'), at: new Date().toISOString(), employeeId: employee()?.id || '', employeeName: employeeLabel(), receiptBranding: { ...data.receiptSettings }, receiptLayoutRefs: rbReferences(info.area), ...info, taxDetails: info.taxDetails || rbTaxSnapshot(info.billTotal ?? info.dueBefore ?? info.amount, data.receiptSettings) };
        data.paymentRecords.unshift(payment);
        return payment;
    }
    const stateBadge = active => active !== false ? badge('active') : '<span class="badge neutral">Inactive</span>';
    const toggleButton = (kind, item) => item.active !== false ? btn('Deactivate', 'feature-disable', { id: kind + ':' + item.id, small: true, danger: true }) : btn('Activate', 'activate-item', { id: kind + ':' + item.id, small: true });
    function paymentsPage() {
        const active=data.paymentMethods.filter(m=>m.active!==false).length;
        return `<div class="ad-page ad-config-page"><div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / PAYMENT METHODS</span><h1>One payment setup. <span>Every department.</span></h1><p>Manage shared payment methods, classify cash vs non-cash and retain the original method on saved receipts.</p></div>${btn('+ Add Payment Method','feature-edit-payment',{primary:true})}</div><div class="ad-metric-grid">${[['All methods',data.paymentMethods.length,'Configured options'],['Active methods',active,'Selectable for new payments'],['Cash methods',data.paymentMethods.filter(isCashMethod).length,'Change calculations enabled'],['Non-cash',data.paymentMethods.filter(m=>!isCashMethod(m)).length,'No cash change']].map(([label,n,desc])=>`<article class="ad-metric"><div class="ad-metric-head"><span>${label}</span></div><strong>${n}</strong><small>${desc}</small></article>`).join('')}</div><section class="ad-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">PAYMENT CONFIGURATION</span><h2>Available methods</h2><p>Inactive methods disappear from new payment screens, but remain in transaction history.</p></div></div>${table(['Payment method','Classification','Status','Actions'],data.paymentMethods.map(m=>`<tr><td><strong>${esc(m.name)}</strong></td><td>${isCashMethod(m)?'<span class="badge green">Cash · Change</span>':'<span class="badge neutral">Non-cash</span>'}</td><td>${stateBadge(m.active)}</td><td>${btn('Edit','feature-edit-payment',{id:m.id,small:true})} ${toggleButton('payment',m)}</td></tr>`))}</section><div class="ad-info-foot">${premiumIcon('checkcircle',17)} resortOS records external payments only; it does not move money.</div></div>`;
    }
        function categoriesPage() {
        const categories=[...data.categories].sort((a,b)=>a.sort-b.sort);
        return `<div class="ad-page ad-config-page"><div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / RESTAURANT CATEGORIES</span><h1>A menu that feels <span>considered.</span></h1><p>Build beautiful menu sections with optional photos, ordering and active/inactive controls.</p></div>${btn('+ Add Category','feature-edit-category',{primary:true})}</div><div class="ad-metric-grid">${[['All categories',categories.length,'Saved ordering groups'],['Active',categories.filter(c=>c.active!==false).length,'Visible to restaurant staff'],['Menu items',data.menu.length,'Across every category'],['With images',categories.filter(c=>c.imageId).length,'Photo-backed groups']].map(([label,n,desc])=>`<article class="ad-metric"><div class="ad-metric-head"><span>${label}</span></div><strong>${n}</strong><small>${desc}</small></article>`).join('')}</div><section class="ad-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">MENU ORGANIZATION</span><h2>Categories directory</h2><p>Deactivation hides the category from new orders but preserves historical item records.</p></div></div>${table(['Image','Category','Food items','Status','Actions'],categories.map(c=>`<tr><td>${assetImg(c.imageId,'list-thumb')}</td><td><strong>${esc(c.name)}</strong></td><td>${data.menu.filter(i=>i.category===c.name).length}</td><td>${stateBadge(c.active)}</td><td>${btn('Edit','feature-edit-category',{id:c.id,small:true})} ${toggleButton('category',c)} ${btn('↑','feature-order-category',{id:c.id,small:true})}</td></tr>`))}</section></div>`;
    }
        function usersPage() {
        const staff=data.employees;
        return `<div class="ad-page ad-config-page"><div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / PEOPLE & PERMISSIONS</span><h1>The right access for <span>every teammate.</span></h1><p>Keep operational access flexible while protecting every Admin-only action.</p></div>${btn('+ Add Employee','feature-edit-employee',{primary:true})}</div><div class="ad-metric-grid">${[['Employees',staff.length,'Saved staff records'],['Active',staff.filter(e=>e.active!==false).length,'Available demo identities'],['Multi-department',staff.filter(e=>e.role!=='admin'&&e.access.includes('frontdesk')&&e.access.includes('restaurant')).length,'Can help in both departments'],['Administrators',staff.filter(e=>e.role==='admin').length,'Admin-only capabilities protected']].map(([label,n,desc])=>`<article class="ad-metric"><div class="ad-metric-head"><span>${label}</span></div><strong>${n}</strong><small>${desc}</small></article>`).join('')}</div><div class="ad-info-foot">${premiumIcon('alert',17)} This is a browser prototype. Demo account switching is not secure authentication.</div><section class="ad-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">EMPLOYEE DIRECTORY</span><h2>Team and dashboard access</h2><p>Deactivated staff remain in historical payments, tickets and the audit trail.</p></div></div>${table(['Employee','Primary role','Workspace access','Status','Actions'],staff.map(e=>`<tr><td><strong>${esc(e.name)}</strong><small>${esc(e.department||'')} · ${esc(e.id)}</small></td><td>${esc(e.role==='admin'?'Administrator':e.role==='frontdesk'?'Front Desk':'Restaurant')}</td><td><div class="ad-access-pills">${e.access.filter(r=>r!=='admin').map(r=>`<span class="badge neutral">${r==='frontdesk'?'Front Desk':'Restaurant'}</span>`).join(' ')||'Management only'}</div></td><td>${stateBadge(e.active)}</td><td>${btn('View / Edit','feature-edit-employee',{id:e.id,small:true})} ${e.role!=='admin'?toggleButton('employee',e):''}</td></tr>`))}</section></div>`;
    }
        function receiptSettingsPage() {
        const x=data.receiptSettings;
        return `<div class="ad-page ad-config-page"><div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / RECEIPT SETTINGS</span><h1>Every printed detail, <span>on brand.</span></h1><p>Customize the resort identity on thermal and A4 bills and payment acknowledgments.</p></div></div><div class="rb-branding-jump"><button class="btn primary" data-nav="receiptbuilder">Open Receipt Builder →</button><span>Design, arrange and publish receipt layouts in the visual editor.</span></div><div class="ad-branding-layout"><section class="ad-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">PRINT CONFIGURATION</span><h2>Branding information</h2><p>Changes apply to new receipts; saved payment records retain original transaction details.</p></div></div><form id="feature-receipt-form"><div class="field"><label>Resort name</label><input class="input" name="name" maxlength="100" required value="${esc(x.name)}"></div><div class="field"><label>Address</label><input class="input" name="address" maxlength="200" value="${esc(x.address)}"></div><div class="field"><label>Contact details</label><input class="input" name="contact" maxlength="100" value="${esc(x.contact)}"></div><div class="form-grid"><div class="field"><label>Registered branch (optional)</label><input class="input" name="branch" maxlength="80" value="${esc(x.branch || '')}"></div><div class="field"><label>Registered TIN (optional)</label><input class="input" name="tin" maxlength="45" value="${esc(x.tin || '')}"></div></div><div class="field"><label>Permit / registration text (optional, use genuine details only)</label><input class="input" name="registration" maxlength="150" value="${esc(x.registration || '')}"></div><div class="field"><label>Tax registration status</label><select class="select" name="taxMode"><option value="unconfigured" ${x.taxMode==='unconfigured'?'selected':''}>Not configured — do not calculate VAT</option><option value="vat" ${x.taxMode==='vat'?'selected':''}>VAT registered — standard 12% VAT-inclusive sales</option><option value="nonvat" ${x.taxMode==='nonvat'?'selected':''}>Non-VAT registered — no VAT charged</option></select><small class="text-muted">Only select VAT registered if your business is actually VAT registered. The 12% model currently treats ALL charges as standard VATable, VAT-inclusive sales. Statutory discounts for verified qualifying restaurant sales use a simplified VAT-inclusive allocation model; mixed tax treatments and other exemptions require independent review. This is a payment acknowledgement, not an official BIR invoice.</small></div><div class="field"><label>Footer message</label><input class="input" name="footer" maxlength="140" value="${esc(x.footer)}"></div>${imageField(x.logoId||'').replace('name="imageId"','name="logoId"')}<button type="submit" class="btn primary">Save Receipt Settings</button></form></section><aside class="ad-panel ad-branding-preview"><span class="ad-section-kicker">PUBLISHED RECEIPT PREVIEW</span><div class="branding-receipt-controls"><label>Department<select id="branding-preview-area" class="select"><option value="restaurant">Restaurant</option><option value="frontdesk">Front Desk</option></select></label><label>Paper size<select id="branding-preview-format" class="select"><option value="80">80 mm</option><option value="58">58 mm</option><option value="a4">A4</option></select></label></div><div class="branding-receipt-stage" id="branding-receipt-paper">${rbLayoutMarkup({ ...rbPublishedLayout('restaurant','80'), format:'80' }, rbDemoContext('restaurant',x), x, false)}</div><p>Uses the same published layout as receipts printed after payment. Example values are only for preview; changes in this form appear here while editing.</p></aside></div></div>`;
    }
        function editFeature(kind, id) {
        if (!adminOnly()) return;
        if (kind === 'payment') {
            const m = data.paymentMethods.find(x => x.id === id);
            showModal(m ? 'Edit Payment Method' : 'Add Payment Method', 'Accepted for both Front Desk and Restaurant', `<form id="feature-payment-form"><input type="hidden" name="id" value="${esc(m?.id || '')}"><div class="field"><label>Payment method name</label><input class="input" name="name" maxlength="75" value="${esc(m?.name || '')}" required placeholder="e.g. GCash, Landbank Transfer"></div><div class="field"><label>Payment type</label><select class="select" name="type"><option value="cash" ${m?.type === 'cash' ? 'selected' : ''}>Cash — calculate change</option><option value="noncash" ${m?.type !== 'cash' ? 'selected' : ''}>Non-cash — no change</option></select><small class="text-muted">Change is given only for cash payments.</small></div><div class="field"><label>Status</label><select class="select" name="active"><option value="true" ${m?.active !== false ? 'selected' : ''}>Active</option><option value="false" ${m?.active === false ? 'selected' : ''}>Inactive</option></select></div><button class="btn primary full" type="submit">Save Payment Method</button></form>`);
        }
        if (kind === 'category') {
            const c = data.categories.find(x => x.id === id);
            showModal(c ? 'Edit Menu Category' : 'Add Menu Category', 'Category changes retain historical orders', `<form id="feature-category-form"><input type="hidden" name="id" value="${esc(c?.id || '')}"><div class="field"><label>Category name</label><input class="input" name="name" maxlength="70" required value="${esc(c?.name || '')}"></div>${imageField(c?.imageId || '')}<div class="field"><label>Status</label><select class="select" name="active"><option value="true" ${c?.active !== false ? 'selected' : ''}>Active</option><option value="false" ${c?.active === false ? 'selected' : ''}>Inactive</option></select></div><button class="btn primary full" type="submit">Save Category</button></form>`);
        }
        if (kind === 'employee') {
            const e = data.employees.find(x => x.id === id);
            const isAdmin = e?.role === 'admin';
            const primary = e?.role || 'frontdesk';
            showModal(e ? 'Employee Profile' : 'Add Employee', 'Configure operational department access. Admin accounts remain separate.', `<form id="feature-employee-form"><input type="hidden" name="id" value="${esc(e?.id || '')}"><div class="field"><label>Employee full name</label><input class="input" name="name" maxlength="90" required value="${esc(e?.name || '')}"></div><div class="field"><label>Department / position</label><input class="input" name="department" maxlength="90" value="${esc(e?.department || '')}"></div><div class="field"><label>Primary role</label><select class="select" name="role" ${isAdmin ? 'disabled' : ''}><option value="frontdesk" ${primary === 'frontdesk' ? 'selected' : ''}>Front Desk</option><option value="restaurant" ${primary === 'restaurant' ? 'selected' : ''}>Restaurant</option>${isAdmin ? '<option value="admin" selected>Administrator</option>' : ''}</select></div>${isAdmin ? '<div class="notice">This built-in demo Admin account cannot be converted into an employee account.</div>' : `<div class="field"><label>Authorized dashboards</label><label class="check-label"><input type="checkbox" name="frontdesk" ${e?.access.includes('frontdesk') || !e && primary === 'frontdesk' ? 'checked' : ''}> Front Desk</label><label class="check-label"><input type="checkbox" name="restaurant" ${e?.access.includes('restaurant') || !e && primary === 'restaurant' ? 'checked' : ''}> Restaurant</label></div><div class="field"><label>Additional operational permission</label><label class="check-label"><input type="checkbox" name="voidOrder" ${e?.capabilities?.voidOrder !== false ? 'checked' : ''}> May void restaurant orders (only while working in Restaurant)</label><label class="check-label"><input type="checkbox" name="lateDiscount" ${e?.capabilities?.lateDiscount === true ? 'checked' : ''}> May apply verified late statutory discounts to unpaid restaurant room charges (Front Desk dashboard only)</label></div>`}<div class="field"><label>Account status</label><select class="select" name="active" ${isAdmin ? 'disabled' : ''}><option value="true" ${e?.active !== false ? 'selected' : ''}>Active</option><option value="false" ${e?.active === false ? 'selected' : ''}>Inactive</option></select></div><div class="notice">This is a local demo identity; no password authentication or private staff login is provided.</div></form>`, `<button class="btn" type="button" data-action="modal-close">Cancel</button><button class="btn primary" type="submit" form="feature-employee-form">Save Employee</button>`);
        }
    }
    function toggleFeature(value, active) {
        if (!adminOnly()) return;
        const [kind, id] = String(value).split(':');
        const arr = kind === 'payment' ? data.paymentMethods : kind === 'category' ? data.categories : kind === 'employee' ? data.employees : kind === 'room' ? data.rooms : kind === 'table' ? data.tables : kind === 'menu' ? data.menu : kind === 'service' ? data.services : null;
        const item = arr?.find(x => String(x.id) === id);
        if (!item || kind === 'employee' && item.role === 'admin') return;
        if (!active && kind === 'payment' && activeMethods().length < 2) { toast('Keep at least one payment method active.', true); return; }
        if (!active && kind === 'room' && stayFor(id)) { toast('Check out the guest before deactivating this room.', true); return; }
        if (!active && kind === 'table' && tableOpenOrders(id).length) { toast('Finish the table order before deactivating it.', true); return; }
        if (!active && kind === 'employee' && item.id === currentEmployeeId) { toast('Switch to another employee before deactivating this account.', true); return; }
        item.active = active;
        audit(`${active ? 'Activated' : 'Deactivated'} ${kind} ${item.name || item.id}`, 'Admin', { module: 'System Management', type: 'update', target: kind + ' #' + id });
        if (['category', 'menu', 'table'].includes(kind)) notify(['restaurant'], 'Restaurant settings changed', `${item.name || id} is now ${active ? 'active' : 'inactive'}`, { route: 'orders' });
        if (kind === 'payment') notify(['restaurant', 'frontdesk'], 'Payment methods updated', `${item.name} is now ${active ? 'active' : 'inactive'}`, { route: 'dashboard' });
        save(); render(); toast(`${kind} ${active ? 'activated' : 'deactivated'}.`);
    }
    function paymentHistory(stayId) {
        const s = data.stays.find(x => x.id === stayId);
        const arr = data.paymentRecords.filter(x => x.area === 'frontdesk' && x.stayId === stayId);
        showModal(`${s ? roomLabel(s.room) : 'Room'} · Payment History`, 'Each saved payment can be printed again without changing its transaction.', arr.length ? table(['Receipt', 'Date', 'Amount', 'Method', 'Action'], arr.map(p => `<tr><td>${esc(p.id)}</td><td>${esc(prettyTime(p.at))}</td><td>${money(p.amount)}</td><td>${esc(p.method)}</td><td>${btn('Print Receipt', 'receipt-payment', { id: p.id, small: true })}</td></tr>`)) : '<div class="empty">No V1 payment receipts recorded yet. Earlier audit entries remain available in Audit Log.</div>');
    }
    let receiptArchiveFrom = '', receiptArchiveTo = '';
    function receiptArchiveRecords() {
        const modern = data.paymentRecords.map(p => ({ kind: 'payment', id: p.id, at: p.at, area: p.area, amount: Number(p.amount || 0), billTotal: p.billTotal == null ? null : Number(p.billTotal), tendered: p.tendered == null ? null : Number(p.tendered), change: p.change == null ? null : Number(p.change), cash: p.methodType === 'cash' || (p.methodType == null && /^cash(?:\s|$)/i.test(p.method || '')), balance: p.balance == null ? null : Number(p.balance), method: p.method || 'Not recorded', employee: p.employeeName || '', location: p.area === 'restaurant' ? 'Table ' + (p.table || '—') : roomLabel(p.room || '—'), orderId: p.orderId || '' }));
        const legacy = data.orders.filter(o => o.status === 'paid' && !o.paymentRecordId).map(o => ({ kind: 'order', id: o.id, at: o.settledAt || o.created, area: 'restaurant', amount: orderPayable(o), billTotal: orderPayable(o), tendered: null, change: null, cash: /^cash(?:\s|$)/i.test(o.paymentMethod || ''), balance: null, method: o.paymentMethod || 'Not recorded', employee: o.staffPaidBy || o.staff || '', location: 'Table ' + (o.table || '—'), orderId: o.id }));
        return [...modern, ...legacy].filter(p => role === 'admin' || role === 'frontdesk' || p.area === role).sort((a, b) => new Date(b.at) - new Date(a.at));
    }
    function receiptArchiveMatches() {
        const q = search.toLowerCase().trim();
        return receiptArchiveRecords().filter(p => (filter === 'all' || p.area === filter) && (!receiptArchiveFrom || String(p.at).slice(0, 10) >= receiptArchiveFrom) && (!receiptArchiveTo || String(p.at).slice(0, 10) <= receiptArchiveTo) && (!q || [p.id, p.method, p.location, p.employee, p.orderId, p.amount].join(' ').toLowerCase().includes(q)));
    }
    function receiptArchivePage() {
        const all = receiptArchiveRecords(), matches = receiptArchiveMatches();
        const filters = role !== 'restaurant' ? `<select class="select" data-filter aria-label="Receipt department"><option value="all" ${filter === 'all' ? 'selected' : ''}>Both departments</option><option value="frontdesk" ${filter === 'frontdesk' ? 'selected' : ''}>Front Desk</option><option value="restaurant" ${filter === 'restaurant' ? 'selected' : ''}>Restaurant</option></select>` : '';
        const entries = matches.map(p => `<tr><td><strong>${esc(p.id)}</strong></td><td>${esc(new Date(p.at).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }))}</td><td>${esc(p.area === 'frontdesk' ? 'Front Desk' : 'Restaurant')}</td><td>${esc(p.location)}</td><td>${esc(p.method)}</td><td>${esc(p.employee)}</td><td>${p.billTotal == null ? '—' : money(p.billTotal)}</td><td>${p.tendered == null ? '—' : money(p.tendered)}</td><td>${p.cash ? (p.change == null ? '—' : money(p.change)) : '—'}</td><td>${btn('View / Reprint', p.kind === 'order' ? 'receipt-order' : 'receipt-payment', { id: p.id, small: true })}</td></tr>`);
        const stat = (icon, label, value, detail, kind = '') => `<article class="shared-stat-card ${kind}"><div class="shared-stat-top"><span class="shared-stat-icon">${premiumIcon(icon,18)}</span><span class="shared-stat-label">${label}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
        return `${header('Receipt History', 'Search saved payments from Front Desk and Restaurant, preview and reprint when needed.', btn('Export CSV', 'receipt-archive-export', { small: true }))}
        <div class="shared-stat-grid receipt-stat-grid">${stat('receipt','Saved receipts',all.length,'Payment records retained in this browser')}${stat('search','Matching receipts',matches.length,'Filtered results','green')}${stat('wallet','Total in results',money(matches.reduce((n, p) => n + p.amount, 0)),'Payments applied, excluding cash change','purple')}</div>
        <section class="card section-space receipt-history-shell"><div class="card-head"><div><h2>Receipt archive</h2><p class="sub">Reprinting keeps the original payment record. Bills and acknowledgments stay reviewable for follow-up and guest questions.</p></div><span class="audit-match-count">${matches.length} of ${all.length} receipts</span></div>
        <div class="receipt-archive-filters"><input class="input" data-search placeholder="Search receipt, staff, room, method…" value="${esc(search)}" aria-label="Search receipts">${filters}<label>From <input class="input" type="date" data-receipt-date="from" value="${esc(receiptArchiveFrom)}"></label><label>To <input class="input" type="date" data-receipt-date="to" value="${esc(receiptArchiveTo)}"></label>${btn('Clear Filters', 'receipt-archive-clear', { small: true })}</div>
        ${table(['Receipt', 'Date / time', 'Department', 'Room / table', 'Method', 'Employee', 'Actual bill', 'Amount paid', 'Change', 'Action'], entries)}<div class="receipt-archive-footnote">Showing ${matches.length} of ${all.length} receipt records. Amount paid shows money received before any cash change is returned. Older demo records may lack original payment details.</div></section>
        <div class="notice section-space">V1 saves receipts in this browser only. Clearing browser data can erase them. For reliable permanent and multi-device retention, use a backed-up server database before real resort deployment.</div>`;
    }
    function exportReceiptsCsv() {
        const cols = ['Receipt', 'Timestamp', 'Department', 'Location', 'Order', 'Employee', 'Method', 'Actual Bill (PHP)', 'Amount Paid (PHP)', 'Change (PHP)'];
        const quote = v => { let x = String(v ?? ''); if (/^[=+@\-]/.test(x.trimStart())) x = "'" + x; return '"' + x.replace(/"/g, '""') + '"'; };
        const rows = [cols, ...receiptArchiveMatches().map(p => [p.id, p.at, p.area, p.location, p.orderId, p.employee, p.method, p.billTotal == null ? '' : p.billTotal.toFixed(2), p.tendered == null ? '' : p.tendered.toFixed(2), p.cash && p.change != null ? p.change.toFixed(2) : ''])];
        const blob = new Blob(['\uFEFF' + rows.map(r => r.map(quote).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = 'resortOS-receipt-history-' + today() + '.csv'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 500);
        toast('Receipt history exported.');
    }
    function receiptPrompt(kind, id) {
        const rec = kind === 'bill' ? data.orders.find(x => x.id === id) : kind === 'order' ? data.orders.find(x => x.id === id && x.status === 'paid') : data.paymentRecords.find(x => x.id === id);
        if (!rec) { toast('This receipt is not available.', true); return; }
        showModal(kind === 'bill' ? 'Print Restaurant Bill' : 'Print Payment Acknowledgment', 'Choose a paper format, then preview and print.', `<form id="feature-print-form"><input type="hidden" name="kind" value="${esc(kind)}"><input type="hidden" name="id" value="${esc(id)}"><div class="field"><label>Paper format</label><select class="select" name="format" ${kind === 'payment' ? `id="history-receipt-format" data-payment-id="${esc(rec.id)}"` : ''}><option value="80">80 mm thermal receipt</option><option value="58">58 mm thermal receipt</option><option value="a4">A4 paper</option></select></div>${kind === 'payment' ? `<div class="rb-payment-summary">${[['Actual bill',rec.billTotal],['Due before payment',rec.dueBefore],['Payment applied',rec.amount],['Amount received',rec.tendered],['Cash change',rec.methodType==='noncash'?null:rec.change],['Balance after payment',rec.balance]].filter(([label,value])=>value!=null).map(([label,value])=>`<div><span>${label}</span><strong>${money(value)}</strong></div>`).join('')}</div>` : ''}${kind === 'payment' ? `<div class="history-receipt-stage" id="history-receipt-paper">${rbPaymentPreview(rec, '80')}</div>` : ''}<div class="notice">Bills are marked UNPAID. Payment acknowledgments are issued only after an external payment is confirmed. These are not official tax invoices.</div><button class="btn primary full" type="submit">Open Print Preview</button></form>`);
    }
    function openReceiptPrint(kind, id, format) {
        const info = kind === 'bill' ? data.orders.find(x => x.id === id) : kind === 'order' ? data.orders.find(x => x.id === id && x.status === 'paid') : data.paymentRecords.find(x => x.id === id);
        if (!info) { toast('This receipt is not available.', true); return; }
        const area = kind === 'payment' ? info.area : 'restaurant';
        const layout = kind === 'payment' ? rbPaymentLayout(info, format) : rbPublishedLayout(area, format);
        const branding = kind === 'payment' ? info.receiptBranding || data.receiptSettings : data.receiptSettings;
        rbOpenPrint(rbPrintDocument(layout, rbContext(kind, info), branding, format, info.paymentRecordId || info.id));
    }
    function featureAction(act, id) {
        if (act.startsWith('rb-')) return rbAction(act, id);
        if (act === 'asset-clear') {
            const form = document.querySelector('#modal-root form') || document.querySelector('#feature-receipt-form');
            const field = form?.querySelector('[name=imageId], [name=logoId]');
            if (field) field.value = '';
            const preview = form?.querySelector('#asset-preview');
            if (preview) preview.innerHTML = assetImg('', 'asset-thumb');
            return true;
        }
        if (act === 'ticket-ready') {
            const t = data.tickets.find(x => x.id === id);
            if (!t || adminOnly() || t.assignedTo !== employee()?.id || ['review', 'resolved'].includes(t.status)) return true;
            t.status = 'review'; t.readyAt = new Date().toISOString(); t.updatedAt = t.readyAt;
            t.history.push({ at: t.readyAt, by: employeeLabel(), detail: 'Work completed; requested Admin review' });
            audit(`Requested Admin resolution review for ${t.id}`, employeeLabel(), { module: 'Support & Issues', type: 'support', target: t.id });
            notify(['admin'], `Ticket ${t.id} ready for review`, t.subject, { route: 'tickets', entityId: t.id });
            save(); render(); openTicket(id); return true;
        }
        if (act === 'receipt-history') { paymentHistory(id); return true; }
        if (act === 'receipt-archive-clear') { search = ''; filter = 'all'; receiptArchiveFrom = ''; receiptArchiveTo = ''; render(); return true; }
        if (act === 'receipt-archive-export') { exportReceiptsCsv(); return true; }
        if (act === 'receipt-payment') { receiptPrompt('payment', id); return true; }
        if (act === 'receipt-order') { const order = data.orders.find(x => x.id === id); receiptPrompt(order?.paymentRecordId ? 'payment' : 'order', order?.paymentRecordId || id); return true; }
        if (act === 'receipt-bill') { receiptPrompt('bill', id); return true; }
        if (act === 'feature-edit-payment') { editFeature('payment', id); return true; }
        if (act === 'feature-edit-category') { editFeature('category', id); return true; }
        if (act === 'feature-edit-employee') { editFeature('employee', id); return true; }
        if (act === 'feature-order-category') {
            if (!adminOnly()) return true;
            const sorted = [...data.categories].sort((a, b) => a.sort - b.sort), i = sorted.findIndex(x => x.id === id);
            if (i > 0) { [sorted[i].sort, sorted[i - 1].sort] = [sorted[i - 1].sort, sorted[i].sort]; audit('Reordered menu category ' + sorted[i].name, 'Admin', { module: 'System Management' }); save(); render(); }
            return true;
        }
        if (act === 'feature-disable') { toggleFeature(id, false); return true; }
        if (act === 'activate-item') { toggleFeature(id, true); return true; }
        return false;
    }
    function featureSubmit(id, v) {
        if (!['feature-payment-form', 'feature-category-form', 'feature-employee-form', 'feature-receipt-form', 'feature-print-form'].includes(id)) return false;
        if (id === 'feature-print-form') { openReceiptPrint(v.kind, v.id, v.format); return true; }
        if (!adminOnly()) { toast('Admin access required.', true); return true; }
        if (id === 'feature-payment-form') {
            const name = String(v.name || '').trim();
            if (!name || data.paymentMethods.some(x => x.name.toLowerCase() === name.toLowerCase() && x.id !== v.id)) { toast('Enter a unique payment method name.', true); return true; }
            const item = data.paymentMethods.find(x => x.id === v.id);
            if (item) { item.name = name; item.type = v.type === 'cash' ? 'cash' : 'noncash'; item.active = v.active === 'true'; }
            else data.paymentMethods.push({ id: uid('PM'), name, type: v.type === 'cash' ? 'cash' : 'noncash', active: v.active === 'true' });
            if (!activeMethods().length) { if (item) item.active = true; else data.paymentMethods.at(-1).active = true; toast('At least one payment method must stay active.', true); return true; }
            audit(`${item ? 'Updated' : 'Created'} payment method ${name}`, 'Admin', { module: 'System Management', type: 'update', target: name });
            notify(['frontdesk', 'restaurant'], 'Payment methods changed', name, { route: 'dashboard' });
        }
        if (id === 'feature-category-form') {
            const name = String(v.name || '').trim();
            if (!name || data.categories.some(x => x.name.toLowerCase() === name.toLowerCase() && x.id !== v.id)) { toast('Enter a unique category name.', true); return true; }
            const c = data.categories.find(x => x.id === v.id);
            if (c) { const old = c.name; c.name = name; c.active = v.active === 'true'; c.imageId = v.imageId || ''; data.menu.filter(x => x.category === old).forEach(x => x.category = name); }
            else data.categories.push({ id: uid('CAT'), name, active: v.active === 'true', imageId: v.imageId || '', sort: data.categories.length });
            audit(`${c ? 'Updated' : 'Created'} menu category ${name}`, 'Admin', { module: 'System Management', type: 'update', target: name });
            notify(['restaurant'], 'Restaurant categories updated', name, { route: 'orders' });
        }
        if (id === 'feature-employee-form') {
            const name = String(v.name || '').trim(), old = data.employees.find(x => x.id === v.id);
            if (!name) { toast('Enter an employee name.', true); return true; }
            if (old?.role === 'admin') { old.name = name; old.department = v.department || 'Administration'; }
            else {
                const base = ['frontdesk', 'restaurant'].includes(v.role) ? v.role : 'frontdesk';
                const access = ['frontdesk', 'restaurant'].filter(r => v[r] === 'on');
                if (!access.includes(base)) { toast('The primary department must remain accessible.', true); return true; }
                const updated = { name, department: String(v.department || '').trim(), role: base, access, active: v.active !== 'false', capabilities: { voidOrder: v.voidOrder === 'on', lateDiscount: v.lateDiscount === 'on' } };
                if (old) Object.assign(old, updated);
                else data.employees.push({ id: uid('EMP'), ...updated });
            }
            audit(`${old ? 'Updated' : 'Added'} employee ${name}`, 'Admin', { module: 'System Management', type: 'update', target: old?.id || name });
        }
        if (id === 'feature-receipt-form') {
            data.receiptSettings = { name: String(v.name || 'Resort').trim(), address: String(v.address || '').trim(), contact: String(v.contact || '').trim(), tin: String(v.tin || '').trim(), branch: String(v.branch || '').trim(), registration: String(v.registration || '').trim(), footer: String(v.footer || '').trim(), logoId: v.logoId || '', taxMode: ['vat','nonvat'].includes(v.taxMode) ? v.taxMode : 'unconfigured' };
            audit('Updated receipt branding and tax profile', 'Admin', { module: 'System Management', type: 'update', target: 'Receipt Settings' });
        }
        save(); closeModal(); render(); toast('Changes saved.'); return true;
    }
    const navs = {
        frontdesk: [
            ['dashboard', '▦', 'Dashboard'],
            ['rooms', '▤', 'Rooms'],
            ['stays', '◎', 'Room Stays'],
            ['charges', '◇', 'Charges'],
            ['checkout', '➜', 'Checkout'],
            ['tickets', '✉', 'Support & Issues']
        ],
        restaurant: [
            ['dashboard', '▦', 'Dashboard'],
            ['tables', '▦', 'Tables'],
            ['orders', '▤', 'Orders'],
            ['roomcharges', '◇', 'Room Charges'],
            ['tickets', '✉', 'Support & Issues']
        ],
        admin: [
            ['dashboard', '▦', 'Dashboard'],
            ['audit', '◎', 'Audit Log'],
            ['system', '⚙', 'System Management'],
            ['tickets', '✉', 'Support & Issues']
        ]
    };
    let chargesTab = 'unpaid';
    let fdRoomFilter = 'all', fdStayFilter = 'active';
    let roomChargesTab = 'charges';
    const secondaryRoutes = {
        frontdesk: ['balances', 'addservice', 'receipts', 'help'],
        restaurant: ['neworder', 'posts', 'cash', 'receipts', 'help'],
        admin: ['rooms', 'tables', 'menu', 'categories', 'services', 'users', 'payments', 'discounts', 'receiptsettings', 'receiptbuilder', 'receipts', 'help']
    };
    function routeAllowed(target) {
        if (!hasAccess(role)) return false;
        return navs[role].some(a => a[0] === target) || secondaryRoutes[role].includes(target);
    }
    function navSelected(id) {
        if (route === id)
            return true;
        if (role === 'admin' && id === 'system')
            return ['rooms', 'tables', 'menu', 'categories', 'services', 'users', 'payments', 'discounts', 'receiptsettings', 'receiptbuilder', 'receipts'].includes(route);
        if (role === 'frontdesk' && id === 'charges')
            return ['balances', 'addservice'].includes(route);
        if (role === 'restaurant') {
            if (id === 'tables')
                return ['neworder', 'cash'].includes(route);
            if (id === 'roomcharges')
                return route === 'posts';
        }
        return false;
    }
    function go(next, preserveDraft = false) {
        if (!routeAllowed(next) && next !== 'dashboard') return;
        if (role === 'frontdesk' && ['balances', 'addservice'].includes(next)) {
            chargesTab = next === 'balances' ? 'unpaid' : 'services';
            next = 'charges';
        }
        if (role === 'restaurant' && next === 'posts') {
            roomChargesTab = 'posts';
            next = 'roomcharges';
        }
        if (next === 'neworder' && !preserveDraft) {
            cart = {};
            draftOrderId = null;
            menuCategory = null;
            restaurantMenuQuery = '';
        }
        route = next;
        filter = 'all';
        search = '';
        mobile = false;
        render();
        if(helpMode==='panel' && smartView==='home' && !helpSelected) helpRenderRoot();
        window.scrollTo(0, 0);
        if (helpMode === 'adaptive') requestAnimationFrame(smartGuideSync);
    }
    function setRole(r, preserveSmartHelp = false) {
        if (!navs[r])
            return;
        if (!hasAccess(r)) { toast('This employee is not authorized for that dashboard.', true); return; }
        role = r;
        ticketFilters = { query: '', status: 'all', category: 'all', priority: 'all', department: 'all', attention: 'all', view: r === 'admin' ? 'all' : 'mine' };
        bellOpen = false;
        notificationShow = 'all';
        go('dashboard');
        if (preserveSmartHelp) {
            helpSelected = '';
            smart744LastVerified=null;smart744Transcript=[];if(smartQuestion)smartRunQuestion(smartQuestion);else smartAnswer=null;
            if (helpMode === 'panel') helpRenderRoot();
        } else helpOnRoleChange();
    }
    const adminFamilyMeta = {
        system: {kicker:'SYSTEM MANAGEMENT'},
        audit: {kicker:'RECORDS & ACCOUNTABILITY', title:'Audit <span>Log.</span>', intro:'Review recorded staff actions, payment changes, and corrections.', lead:'Every action, <em>clearly traceable.</em>', detail:'Find a specific event, review its history and export evidence without leaving the management workspace.'},
        receipts: {kicker:'RECEIPT ARCHIVE', title:'Receipt <span>History.</span>', intro:'Review and reprint recorded payment acknowledgments.', lead:'Every receipt, <em>right where you need it.</em>', detail:'Search your records by date, department, employee or transaction, without recording payment twice.'},
        tickets: {kicker:'ADMIN SUPPORT CENTER', title:'Support & <span>Issues.</span>', intro:'Assign, review and resolve employee requests in one place.', lead:'Every request, <em>properly followed up.</em>', detail:'See unresolved work, identify urgent issues and keep employee communications organized.'},
        rooms: {kicker:'PROPERTY SETUP', title:'Rooms <span>Manager.</span>', intro:'Maintain the room inventory that Front Desk uses.', lead:'Rooms configured, <em>history preserved.</em>', detail:'Manage room availability and deactivate unused rooms without losing past stay records.'},
        tables: {kicker:'RESTAURANT SETUP', title:'Tables <span>Manager.</span>', intro:'Maintain the restaurant table list and availability.', lead:'Tables ready for <em>smooth service.</em>', detail:'Manage your dining spaces in one place. Active orders continue to use their original table references.'},
        menu: {kicker:'RESTAURANT CONFIGURATION', title:'Restaurant <span>Menu.</span>', intro:'Manage dishes, pricing, descriptions, images and availability.', lead:'A menu that <em>stays organized.</em>', detail:'Food and category updates appear in the Restaurant ordering screen while historical orders are retained.'},
        services: {kicker:'FRONT DESK CONFIGURATION', title:'Service <span>Catalog.</span>', intro:'Configure additional services and incidental charges.', lead:'Extra services, <em>fully in control.</em>', detail:'Configure service amounts and availability while preserving posted charge history.'},
        users: {kicker:'TEAM & ACCESS', lead:'People first. <em>Permissions made clear.</em>', detail:'Regular employees can access the operational dashboards they need; Admin permissions stay reserved.'},
        payments: {kicker:'PAYMENT CONFIGURATION', lead:'One shared setup. <em>Every payment method.</em>', detail:'Methods are shared between Front Desk and Restaurant. Only cash payments display change.'},
        categories: {kicker:'RESTAURANT CONFIGURATION', lead:'A considered menu. <em>From the first category.</em>', detail:'Category photos, ordering and active states stay consistent across Admin and Restaurant.'},
        receiptsettings: {kicker:'PRINTING & BRANDING', lead:'One resort identity. <em>Every printed receipt.</em>', detail:'Keep thermal and A4 acknowledgments clear and consistent with your resort branding.'}
    };
    function adminFamilyCounts(route) {
        switch (route) {
            case 'rooms': return [['Rooms',data.rooms.length],['Active rooms',data.rooms.filter(x=>x.active!==false).length],['Occupied',data.rooms.filter(r=>!!stayFor(r.id)).length]];
            case 'tables': return [['Tables',data.tables.length],['Active',data.tables.filter(x=>x.active!==false).length],['In service',data.tables.filter(t=>tableState(t.id)!=='vacant' && t.active!==false).length]];
            case 'menu': return [['Menu items',data.menu.length],['Active',data.menu.filter(x=>x.active!==false).length],['Categories',data.categories.filter(x=>x.active!==false).length]];
            case 'services': return [['Services',data.services.length],['Active',data.services.filter(x=>x.active!==false).length],['Charges',data.charges.filter(x=>x.source!=='restaurant').length]];
            case 'receiptsettings': return [['Print formats','3'],['Receipts saved',data.paymentRecords.length],['Departments','2']];
            default: return [];
        }
    }
    function adminFamilyHero(meta, counts = []) {
        const side = counts.length ? `<div class="ad-family-stat-grid">${counts.map(([name,value])=>`<div class="ad-family-stat"><strong>${esc(String(value))}</strong><small>${esc(name)}</small></div>`).join('')}</div>` : '';
        return `<section class="ad-family-overview"><div class="ad-family-copy"><span class="ad-family-kicker">${meta.kicker || 'ADMINISTRATION'}</span><h2>${meta.lead || 'Everything in one <em>clear workspace.</em>'}</h2><p>${meta.detail || ''}</p></div>${side}</section>`;
    }
    function adminUnifyMarkup(pageId, markup) {
        const meta = adminFamilyMeta[pageId];
        const frame = document.createElement('div');
        frame.innerHTML = markup;
        if (!meta) {
            frame.querySelector('.ad-page')?.classList.add('ad-family-page');
            return frame.innerHTML;
        }
        const existing = frame.querySelector('.ad-page');
        if (existing) {
            existing.classList.add('ad-family-page');
            if (pageId === 'receiptsettings') {
                const header = existing.querySelector('.ad-page-header');
                if (header) header.insertAdjacentHTML('afterend', adminFamilyHero(meta,adminFamilyCounts(pageId)));
            } else if (['payments','categories','users'].includes(pageId)) {
                const stats = existing.querySelector('.ad-metric-grid');
                const header = existing.querySelector('.ad-page-header');
                if (stats && header) {
                    const placeholder = document.createElement('div');
                    placeholder.innerHTML=adminFamilyHero(meta);
                    const hero = placeholder.firstElementChild;
                    const slot = document.createElement('div');
                    slot.className='ad-family-stat-slot';
                    hero.appendChild(slot);
                    slot.appendChild(stats);
                    header.insertAdjacentElement('afterend',hero);
                }
            } else if (pageId === 'system') {
                const band = existing.querySelector('.ad-system-hero');
                if (band) band.classList.add('ad-family-overview');
            }
            return frame.innerHTML;
        }
        const originalHeader = frame.querySelector('header.page-header');
        let action = '';
        if (originalHeader) {
            action=originalHeader.querySelector('.header-cta')?.innerHTML || '';
            originalHeader.remove();
        }
        const oldStats = frame.querySelector('.shared-stat-grid');
        const overview = document.createElement('div');
        overview.innerHTML=adminFamilyHero(meta,oldStats?[]:adminFamilyCounts(pageId));
        const hero=overview.firstElementChild;
        if (oldStats) {
            const slot=document.createElement('div');
            slot.className='ad-family-stat-slot';
            hero.appendChild(slot);
            slot.appendChild(oldStats);
        }
        const page = document.createElement('div');
        page.className='ad-page ad-family-page ad-family-'+pageId;
        page.innerHTML=`<div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / ${meta.kicker}</span><h1>${meta.title}</h1><p>${meta.intro}</p></div>${action?`<div class="ad-family-actions">${action}</div>`:''}</div>`;
        page.appendChild(hero);
        while(frame.firstChild) page.appendChild(frame.firstChild);
        const ret = document.createElement('div');
        ret.appendChild(page);
        return ret.innerHTML;
    }
    function render() {
        const names = {
            frontdesk: 'Front Desk',
            restaurant: 'Restaurant',
            admin: 'Administration'
        };
        const map = {
            dashboard: dashboard,
            rooms: rooms,
            stays: stays,
            balances: balances,
            addservice: servicePage,
            charges: chargesPage,
            checkout: checkout,
            tables: tablesPage,
            orders: orders,
            neworder: newOrder,
            roomcharges: roomChargesPage,
            posts: posts,
            cash: cash,
            menu: menuPage,
            services: servicesPage,
            users: usersPage,
            categories: categoriesPage,
            payments: paymentsPage,
            receiptsettings: receiptSettingsPage,
            receiptbuilder: receiptBuilderPage,
            discounts: discountsPage,
            receipts: receiptArchivePage,
            audit: auditPage,
            system: systemManagementPage,
            help: helpCenter,
            tickets: ticketsPage
        };
        const app = document.getElementById('app');
        app.innerHTML = `<div class="app premium-app"><aside class="sidebar ${mobile ? 'open' : ''}"><div class="brand"><div class="brand-mark">r<span>✦</span></div><div class="brand-type"><strong>resort<span>OS</span></strong><small>THE OPERATIONS SUITE</small></div></div><div class="sidebar-workspace"><span class="sidebar-workspace-dot"></span>${names[role]} workspace</div><div class="side-eyebrow">WORKSPACE</div><nav class="nav" aria-label="Main navigation">${navs[role].filter(([id]) => id !== 'tickets').map(([id, icon, label]) => `<button class="nav-item ${navSelected(id) ? 'active' : ''}" data-nav="${id}" ${route === id ? 'aria-current="page"' : ''}><span class="nav-icon">${premiumIcon(id, 19)}</span><span class="nav-label">${label}</span>${navSelected(id) ? '<span class="nav-current-dot"></span>' : ''}</button>`).join('')}</nav><div class="sidebar-bottom"><div class="sidebar-bottom-label">ASSISTANCE</div><nav class="nav-support" aria-label="Support">${navs[role].filter(([id]) => id === 'tickets').map(([id, icon, label]) => `<button class="nav-item ${navSelected(id) ? 'active' : ''}" data-nav="${id}" aria-label="${esc(ticketSidebarLabel())}"><span class="nav-icon">${premiumIcon('support',19)}</span><span class="nav-label">${label}</span>${ticketAttentionMarkup()}</button>`).join('')}</nav><div class="side-footer"><span class="staff-avatar">${esc(employeeLabel().split(/\s+/).slice(0,2).map(x => x[0] || '').join('').toUpperCase())}</span><span class="staff-copy"><strong>${esc(employeeLabel())}</strong><small>${role === 'frontdesk' ? 'Front Desk operations' : role === 'restaurant' ? 'Restaurant operations' : 'System administration'}</small></span><span class="staff-presence" title="Demo account"></span></div></div></aside>${mobile ? '<div class="sidebar-backdrop" data-action="close-menu"></div>' : ''}<main class="main"><div class="topbar"><div class="topbar-left"><button class="mobile-menu" data-action="toggle-menu" aria-label="Menu">☰</button><div class="topbar-trail"><span class="topbar-trail-root">RESORT OPERATIONS</span><span class="topbar-trail-separator">/</span><span class="topbar-trail-current">${names[role]}${route !== 'dashboard' ? ' / ' + route.replace(/([A-Z])/g, ' $1') : ' / Overview'}</span></div></div><div class="top-actions"><span class="topbar-day">${premiumIcon('calendar',15)} ${new Date().toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'})}</span><div class="notification-button-wrap"><button class="notify-bell" data-action="notify-toggle" type="button" aria-label="Notifications" title="Notifications">${premiumIcon('bell',19)}<span class="notify-count" ${unreadNotifications() ? '' : 'hidden'}>${unreadNotifications()}</span></button><div id="notify-popover-root"></div></div><button class="top-help-button" data-action="help-open" type="button" title="Help with this page" aria-label="Help with this page"><span class="top-help-glyph">?</span><span>Help</span></button><span class="topbar-divider"></span><select class="role-switch employee-switch" id="employee-switch" aria-label="Demo employee">${data.employees.filter(e => e.active).map(e => `<option value="${esc(e.id)}" ${employee()?.id === e.id ? 'selected' : ''}>${esc(e.name)}${e.role === 'admin' ? ' (Admin demo)' : ''}</option>`).join('')}</select><select class="role-switch" id="role-switch" aria-label="Switch dashboard">${['frontdesk', 'restaurant', 'admin'].filter(hasAccess).map(r => `<option value="${r}" ${role === r ? 'selected' : ''}>${r === 'frontdesk' ? 'Front Desk' : r === 'restaurant' ? 'Restaurant' : 'Admin'}</option>`).join('')}</select></div></div><div class="content ${role === 'frontdesk' ? 'fd-premium-content' : role === 'restaurant' ? 'rs-premium-content' : role === 'admin' ? 'ad-premium-content' : ''}">${role === 'admin' && [
            'rooms',
            'tables',
            'menu',
            'services',
            'users', 'categories', 'payments', 'discounts', 'receiptsettings', 'receiptbuilder'
        ].includes(route) ? `<div class="settings-return">${btn('← System Management', 'nav-system', { small: true })}<span>System Management / ${esc(({
            rooms: 'Rooms Manager',
            tables: 'Tables Manager',
            menu: 'Restaurant Menu',
            services: 'Service Catalog',
            users: 'Employees & Roles',
            categories: 'Menu Categories',
            payments: 'Payment Methods',
            receiptsettings: 'Receipt Settings',
            receiptbuilder: 'Receipt Builder',
            discounts: 'Discount Management'
        })[route])}</span></div>` : ''}${role === 'admin' ? adminUnifyMarkup(route, (map[route] || dashboard)()) : (map[route] || dashboard)()}</div></main></div>`;
        if (route === 'addservice' || (role === 'frontdesk' && route === 'charges' && chargesTab === 'services'))
            syncServiceForm();
        helpInsertHints(app);
        syncBell();
        if (helpMode === 'guide') requestAnimationFrame(helpPositionSpotlight);
        if (helpMode === 'adaptive') requestAnimationFrame(smartGuideSync);
        if (helpMode === 'explore') requestAnimationFrame(()=>{smartExploreItems=smartExploreCollect();smartExploreSelected=-1;smartExploreRender();});
        if (route === 'help' && helpSelected) {
            const target = document.getElementById('help-center-detail');
            if (target)
                target.innerHTML = helpArticleMarkup(helpSelected);
        }
    }
    const HELP_ROLES = {
        frontdesk: 'Front Desk',
        restaurant: 'Restaurant',
        admin: 'Administration'
    };
    const HELP_CATEGORIES = {
        start: 'Getting Started',
        tasks: 'How to Do Things',
        terms: 'Understanding the System',
        fixes: 'Problems & Solutions'
    };
    const HELP_ARTICLES = [];
    function helpAdd(id, role, category, title, summary, steps, note = '', routes = [], keywords = '', related = []) {
        HELP_ARTICLES.push({
            id,
            role,
            category,
            title,
            summary,
            steps,
            note,
            routes,
            keywords,
            related
        });
    }
    helpAdd('fd-overview', 'frontdesk', 'start', 'Understand the Front Desk dashboard', 'See occupied rooms, vacant rooms, and guests who still owe incidental charges.', [
        'Use the summary cards to monitor occupancy and unpaid balances.',
        'Choose Rooms to check a room and its active stay.',
        'Choose Charges, then Unpaid Balances, to see charges still due.',
        'Use the quick actions for routine Front Desk work.'
    ], 'Room rental and accommodation payments are NOT handled in resortOS.', ['dashboard', 'rooms'], 'summary rooms vacancy dashboard');
    helpAdd('fd-register', 'frontdesk', 'tasks', 'Register a guest stay', 'Assign a vacant room to a guest before posting room charges.', [
        'Choose Rooms or Room Stays, then Register Stay.',
        'Select a vacant room.',
        'Enter the guest name (optional), check-in date, and expected checkout date.',
        'Choose Register Stay to save the stay.'
    ], 'Registering a stay does not charge accommodation fees.', ['rooms', 'stays'], 'register booking check-in guest arrival');
    helpAdd('fd-room-status', 'frontdesk', 'terms', 'What do room statuses mean?', 'Understand vacant, occupied, and unpaid room information.', [
        'Vacant means there is no active guest stay in the room.',
        'Occupied means the room has an active stay.',
        'The amount labeled unpaid includes only outstanding restaurant and additional service charges.',
        'Open View to see the stay details and charges.'
    ], 'If a room balance seems wrong, reopen its stay details and review recorded payments.', ['rooms'], 'vacant occupied balance room status');
    helpAdd('fd-charges', 'frontdesk', 'tasks', 'View restaurant and service charges', 'Check what a guest owes without opening each charge separately.', [
        'Choose Rooms and select View on an occupied room.',
        'Select View Charges to see all additional services and room-posted restaurant orders.',
        'Check each charge’s total, payments recorded, and remaining amount.',
        'Use Review Checkout for a single combined payment and checkout flow.'
    ], 'Do not record accommodation charges here.', ['rooms', 'balances', 'checkout'], 'bill outstanding list view charges restaurant service');
    helpAdd('fd-service', 'frontdesk', 'tasks', 'Add an additional service charge', 'Post an extra service to an active guest stay.', [
        'Open Charges, choose Service Charges, then use the additional service form.',
        'Select the active room and a service from the catalog.',
        'Set the quantity. Enter extra duration or units only if that service requires them.',
        'Check the calculated amount and save the charge.'
    ], 'Only post services the guest asked to charge to the room. If they pay directly, do not post that service here.', ['addservice'], 'add service motorbike rental towels quantity hours duration');
    helpAdd('fd-duration', 'frontdesk', 'terms', 'Why do some services show a duration field?', 'Different services use different pricing rules.', [
        'For a simple item such as Extra Towels, set only the quantity.',
        'For a rental such as Motorbike Rental, set quantity and the required duration.',
        'Check the price calculation before saving.',
        'Ask Admin if a service has the wrong pricing fields.'
    ], 'Admin configures optional duration or additional-units fields in the Service Catalog.', ['addservice'], 'duration units rental hours service fields');
    helpAdd('fd-outstanding', 'frontdesk', 'terms', 'What is an outstanding balance?', 'An outstanding balance is the total unpaid amount posted to the active stay.', [
        'Open Charges → Unpaid Balances, or review a guest’s stay.',
        'Read Total, Paid, and Due to understand each charge.',
        'If a payment was already collected, record it before checking out.',
        'Reopen the room details after recording payment to verify the updated amount.'
    ], 'Outstanding balances exclude the accommodation fee.', ['balances', 'rooms'], 'due bill unpaid owe balance');
    helpAdd('fd-payment', 'frontdesk', 'tasks', 'Record a full or partial payment', 'Enter the money already received from the guest, without leaving the checkout flow.', [
        'Choose Checkout and open the guest’s Review Checkout window.',
        'Review all the room’s restaurant and additional service charges.',
        'Enter one Amount received value and choose the external payment method.',
        'Select Record Payment, then review the remaining balance in the same window.',
        'If the balance reaches zero, choose Complete Checkout when the guest is leaving.'
    ], 'Do not record a payment until the money was actually collected outside the app. Partial payments are supported.', ['checkout', 'balances'], 'payment cash card received settle settle balance partial checkout');
    helpAdd('fd-checkout', 'frontdesk', 'tasks', 'Check out a guest', 'Complete checkout after checking and collecting outstanding incidental charges.', [
        'Choose Checkout and select the guest’s room.',
        'Review all charges together in the checkout window.',
        'If any balance is unpaid, record the actual payment received.',
        'When the remaining incidental balance is ₱0, choose Complete Checkout.'
    ], 'Checkout never processes accommodation fees; those are handled separately.', ['checkout'], 'checkout check out depart review bill');
    helpAdd('fd-checkout-block', 'frontdesk', 'fixes', 'Why can’t I complete checkout?', 'An active stay cannot be checked out while incidental charges remain unpaid.', [
        'In the checkout window, look at Still to pay.',
        'Review the charges below to see what remains.',
        'Record only payment that has actually been received.',
        'If you cannot resolve the balance, leave the stay active and contact your supervisor.'
    ], 'Never record a fake payment to clear a balance.', ['checkout'], 'cant cannot checkout unpaid blocked error');
    helpAdd('fd-wrong-balance', 'frontdesk', 'fixes', 'The room and stay show different balances', 'Check for a stale screen or incorrectly recorded payment.', [
        'Reopen the room’s View / Stay Details window.',
        'Compare the amount due against each unpaid charge under View Charges.',
        'Refresh the Rooms page if the card was open behind a payment window.',
        'If the figures still do not agree, stop checkout and ask your supervisor to review the transaction history.'
    ], 'Do not create another payment just to correct a display mismatch.', ['rooms', 'balances'], 'bug stale wrong discrepancy zero vs card amount');
    helpAdd('rs-overview', 'restaurant', 'start', 'Understand the Restaurant dashboard', 'Find open tables, pending restaurant orders, room charges, and today’s posts.', [
        'Start at Dashboard to see the shift summary.',
        'Choose Tables to see each table and its current status.',
        'Choose Orders to review order history.',
        'Open Room Charges and switch between Room Charges and Today’s Posts to review bills sent to occupied guest rooms.'
    ], 'The payment destination is chosen only when the guest finishes dining.', ['dashboard', 'tables'], 'restaurant navigation dashboard');
    helpAdd('rs-table-status', 'restaurant', 'terms', 'What do restaurant table statuses mean?', 'Table status tells you what action to take next.', [
        'Vacant: ready to start a new order.',
        'Occupied: guests are dining; add items to the existing order.',
        'Waiting for payment: guests asked for the bill; choose payment or return to Continue Dining.',
        'After payment or posting to a room, the table becomes available.'
    ], 'Never create a second live order for the same occupied table.', ['tables'], 'occupied vacant waiting table status');
    helpAdd('rs-start', 'restaurant', 'tasks', 'Open a table and take the first order', 'Create the first order at an available dining table.', [
        'Choose Tables and select a vacant table, or use the New Order action on Tables or Dashboard.',
        'Add menu items and set their quantities.',
        'Review the total, then save the order.',
        'Leave the table Occupied while the guests are still dining.'
    ], 'Do not ask the guest to choose cash or room posting when first taking the order.', ['tables', 'neworder'], 'new order start table menu waiter');
    helpAdd('rs-add', 'restaurant', 'tasks', 'Add items to an occupied table', 'Keep one ongoing order and increase its total when guests order more.', [
        'Choose Tables and open the Occupied table.',
        'Select Add Items, or open New Order from the Tables or Orders page.',
        'The existing order will be detected automatically.',
        'Add only the new items, review the combined total, and save.'
    ], 'Example: existing ₱500 + new ₱900 = ₱1,400. Old items must not be overwritten.', ['tables', 'neworder'], 'add more items existing ongoing total append reorder');
    helpAdd('rs-ready', 'restaurant', 'tasks', 'Mark a table Ready for Bill', 'Use this only when guests say they have finished dining.', [
        'Choose Tables and open the occupied table.',
        'Check the current order and select Mark Waiting for Payment.',
        'The table changes to Waiting for payment.',
        'Choose Payment only when the guests are ready to settle.'
    ], 'Saving a new order does not automatically make it ready for payment.', ['tables'], 'bill ready finish dining waiter');
    helpAdd('rs-continue', 'restaurant', 'tasks', 'Continue Dining after asking for the bill', 'Return a waiting table to active service when guests order again.', [
        'Open a table marked Waiting for payment.',
        'Choose Continue Dining.',
        'Once it is Occupied again, choose Add Items.',
        'When guests finish, select Mark Waiting for Payment again.'
    ], 'This keeps the existing items and order total.', ['tables'], 'resume continue waiting payment new items');
    helpAdd('rs-cash', 'restaurant', 'tasks', 'Record a payment at the restaurant', 'Settle a restaurant bill directly after the guests finish.', [
        'Choose Tables and open a table Waiting for payment.',
        'Select Choose Payment and then Pay at Restaurant.',
        'Confirm the money was received and select the payment method.',
        'Record payment to finish the order and free the table.'
    ], 'Do not record a payment before it is actually received.', ['tables', 'cash'], 'cash card restaurant table pay payment receipt');
    helpAdd('rs-post', 'restaurant', 'tasks', 'Post a restaurant bill to a guest room', 'Send the finished meal bill to an active resort stay.', [
        'Open the table after it is marked Waiting for Payment.',
        'Select Choose Payment, then Post to Guest Room.',
        'Choose the correct occupied guest room and verify the active stay.',
        'Confirm posting; the charge will appear for Front Desk.'
    ], 'Front Desk collects and records settlement of room-posted restaurant charges later.', ['tables', 'roomcharges'], 'post room stay charge payment restaurant bill');
    helpAdd('rs-void', 'restaurant', 'tasks', 'Void an incorrect restaurant order', 'Correct an incorrect charge with a recorded reason.', [
        'Open Orders and select View on the relevant order.',
        'Select Void Order if your role permits this action.',
        'Enter the reason for the correction, then confirm.',
        'Check the order history and repost correctly if needed.'
    ], 'Voiding does not collect, settle, or automatically refund a payment. The reason is recorded for audit review.', ['orders'], 'void delete mistake cancel refund correct');
    helpAdd('rs-posts', 'restaurant', 'tasks', 'Review today’s room postings', 'Verify what the restaurant has posted to guest rooms today.', [
        'Choose Room Charges, then select Today’s Posts.',
        'Find the order, room, amount, and posting status.',
        'Select an order to see its detail and audit information.',
        'Contact Front Desk for settlement questions.'
    ], 'Do not try to mark a guest-room posting paid from the restaurant dashboard.', ['posts', 'roomcharges'], 'room charge history today posted');
    helpAdd('rs-invalid-room', 'restaurant', 'fixes', 'Why can’t I post to this room?', 'Only rooms with an active guest stay can receive restaurant charges.', [
        'Check the selected room number and guest details.',
        'Choose a room listed as having an active stay.',
        'If the guest should be checked in but is not listed, ask Front Desk to verify the registration.',
        'Retry posting only after the correct active stay is available.'
    ], 'Never post to a different room simply to bypass the error.', ['tables', 'roomcharges'], 'room not active vacant unavailable error posting');
    helpAdd('rs-existing-order', 'restaurant', 'fixes', 'This table already has an order', 'Add to its ongoing bill instead of starting another order.', [
        'Open the occupied table from Tables or choose it on New Order.',
        'Select Add Items rather than creating a second order.',
        'The existing total is kept and new item totals are added.',
        'If the table is Waiting for payment, select Continue Dining first.'
    ], 'The total must include all saved items plus new items.', ['tables', 'neworder'], 'duplicate existing open order error total');
    helpAdd('ad-overview', 'admin', 'start', 'Understand the Admin dashboard', 'Find resort configuration, operational overview, and recent employee activity.', [
        'Open Dashboard to review current resort data.',
        'Open Audit Log to investigate actions.',
        'Open System Management to configure rooms, tables, menu items, services, and roles.'
    ], 'Administration tools are separated from daily Front Desk and Restaurant tasks.', ['dashboard', 'system'], 'admin quick start navigation');
    helpAdd('ad-system', 'admin', 'tasks', 'Find system settings', 'All editing and configuration tools are grouped in one place.', [
        'Choose System Management in the sidebar.',
        'Choose Rooms Manager, Tables Manager, Restaurant Menu, Service Catalog, or Users & Roles.',
        'Make the needed changes and save.',
        'Use ← System Management to return to the list.'
    ], 'Changes to configured items should be traceable through Audit Log records.', ['system'], 'management settings configure edit');
    helpAdd('ad-rooms', 'admin', 'tasks', 'Add or manage resort rooms', 'Maintain the list of rooms available to Front Desk.', [
        'Open System Management and choose Rooms Manager.',
        'Select Add Room and enter the room number.',
        'Save the new room, then verify it appears in the list.'
    ], 'Room management does not enable accommodation payment processing.', ['system', 'rooms'], 'admin add new room inventory');
    helpAdd('ad-tables', 'admin', 'tasks', 'Add, rename, or disable a restaurant table', 'Configure dining tables without disturbing active bills.', [
        'Choose System Management → Tables Manager.',
        'Choose Add Table or Edit for an existing table.',
        'Set the identifier, display name, and active/inactive status.',
        'Save and verify the updated table.'
    ], 'A table with an unfinished order cannot be disabled.', ['system', 'tables'], 'admin add table rename disable');
    helpAdd('ad-menu', 'admin', 'tasks', 'Update a restaurant menu item', 'Control the items and prices shown to Restaurant Staff.', [
        'Choose System Management → Restaurant Menu.',
        'Select Add Item or Edit on an existing menu item.',
        'Set the name, category, price, and status.',
        'Save and check that the new values appear.'
    ], 'Changing a menu price should generate an Audit Log event recording the old and new values.', ['system', 'menu'], 'admin price menu edit food');
    helpAdd('ad-service', 'admin', 'tasks', 'Configure an additional service', 'Set rate, quantity rules, and optional duration fields.', [
        'Choose System Management → Service Catalog.',
        'Add a new service or select Edit.',
        'Choose the pricing unit and whether an extra duration/units field is needed.',
        'If enabled, name the field clearly, such as Rental duration (hours).',
        'Set the rate, check its active status, and Save.'
    ], 'For Extra Towels, use quantity only. For Motorbike Rental, enable the duration field.', ['system', 'services'], 'service catalog duration units price towels rental admin');
    helpAdd('ad-users', 'admin', 'tasks', 'Manage users and roles', 'Manage employees and authorized Front Desk/Restaurant dashboards without granting Admin permissions.', [
        'Open System Management → Employees & Roles.',
        'Add employees and select their permitted Front Desk and Restaurant dashboards.',
        'In this prototype, select a demo employee in the header to see their available dashboards.'
    ], 'Demo account switching is not authentication. Production role checks need a secure backend.', ['users', 'system'], 'users permissions staff employee account login');
    helpAdd('ad-audit', 'admin', 'tasks', 'Find an employee action in Audit Log', 'Locate, filter, and inspect transactions and changes.', [
        'Choose Audit Log from the sidebar.',
        'Use Search to enter an employee, room, table, order, or action.',
        'Filter by work area, action type, employee, or date.',
        'Choose View Details on a matching event to inspect the record.',
        'Use Export CSV to export the current filtered results.'
    ], 'Audit records are read-only in the app and should not be edited or deleted.', ['audit'], 'filter payment employee view details search export log activity');
    helpAdd('ad-audit-terms', 'admin', 'terms', 'How to read an audit record', 'Understand employee, action, timestamp, target, and before/after changes.', [
        'Date / Time tells you when the system recorded the event.',
        'Employee / User identifies the role or person recorded for the event.',
        'Action Type groups events such as Payment, Posting, Void, and Update.',
        'View Details shows the target, amount, method, reason, and old/new values where available.'
    ], 'In the V1 prototype some older actions use generic role labels. Authenticated staff identities need a backend.', ['audit'], 'audit colors fields timestamps record');
    helpAdd('ad-audit-safety', 'admin', 'fixes', 'Why can’t I edit an audit record?', 'An audit trail exists to preserve a reliable record of staff actions.', [
        'Find the event in Audit Log and choose View Details.',
        'Review the recorded information; it is intentionally read-only.',
        'If the underlying transaction was wrong, correct it using the permitted operational workflow.',
        'The correction should generate a new event rather than overwrite the original.'
    ], 'Browser-stored V1 logs are not tamper-resistant. Production audit records must be written and protected on the server.', ['audit'], 'cant delete edit audit tamper history');
    helpAdd('fd-notifications', 'frontdesk', 'tasks', 'Use Front Desk notifications', 'Follow up when the restaurant posts or voids a guest room charge.', [
        'Look for the bell icon in the upper right of the screen.',
        'Click it to review new restaurant charges or important changes.',
        'Select a notification to open the related page.',
        'Mark notifications read after reviewing them.'
    ], 'Notifications only synchronize within this browser prototype. A backend will make them live between separate computers.', ['dashboard', 'rooms'], 'notification bell alert live room charges');
    helpAdd('rs-notifications', 'restaurant', 'tasks', 'Use Restaurant notifications', 'See menu changes, table updates, and payments for posted room charges.', [
        'Watch the bell in the top-right corner for unread messages.',
        'Click the bell and filter to Unread if needed.',
        'Select a notification to open the relevant page.',
        'Mark all read to clear the badge.'
    ], 'Pop-up notifications are brief and do not stop you from taking orders.', ['dashboard', 'tables'], 'notification bell menu room paid alert');
    helpAdd('ad-notifications', 'admin', 'tasks', 'Use Admin notifications', 'See important restaurant posting and system configuration changes.', [
        'Open the notification bell in the top bar.',
        'Filter to Unread to see new updates.',
        'Select an alert to open Audit Log or its related screen.',
        'Review Audit Log for the full evidence of employee activity.'
    ], 'Notifications are not a substitute for the complete audit trail.', ['dashboard', 'audit'], 'notification bell administrator alerts');
    helpAdd('ad-remove', 'admin', 'tasks', 'Deactivate or reactivate a configured item', 'Hide records from new activity while retaining their history.', [
        'Open System Management and select Rooms, Tables, Restaurant Menu, or Service Catalog.',
        'Choose Deactivate on the item you want to change.',
        'The system blocks occupied rooms and tables in active use, and preserves all records as inactive.',
        'Provide a reason and confirm the action.',
        'Review Audit Log and reactivate the record whenever needed.'
    ], 'Inactive items remain in Admin management and can be reactivated. Permanent deletion is unavailable.', ['system', 'audit'], 'delete remove archive table menu service room history');
    helpAdd('fd-tickets', 'frontdesk', 'tasks', 'Report an issue or ask for assistance', 'Send a question or report an operational problem to Admin.', [
        'Open Support & Issues from the sidebar.',
        'Select Create Ticket, choose a category, and describe the issue.',
        'Check who can see it: private is the default for questions and system problems; operational issues default to My Department.',
        'Submit the ticket and use My Tickets for replies or Shared Issues for common problems.',
        'Reply if Admin asks for more information or reopen the ticket if the problem continues.'
    ], 'Urgent safety incidents must also be reported directly to resort management.', ['tickets'], 'ticket support help issue question problem report maintenance');
    helpAdd('rs-tickets', 'restaurant', 'tasks', 'Report a restaurant or system problem', 'Tell management about damaged equipment, software issues, or questions.', [
        'Open Support & Issues in the sidebar.',
        'Select Create Ticket and choose the appropriate issue category.',
        'For a resort issue, enter the location and describe the problem.',
        'Choose Only me & Admin, My Department, or All Staff; operational issues suggest My Department automatically.',
        'Use My Tickets for private replies or Shared Issues for public management updates.'
    ], 'For a safety emergency, contact management immediately instead of waiting for a ticket reply.', ['tickets'], 'ticket support issue problem equipment restaurant maintenance question');
    helpAdd('ad-tickets', 'admin', 'tasks', 'Review and respond to employee tickets', 'Use Support & Issues to follow up on requests and operational problems.', [
        'Open Support & Issues from the Admin sidebar.',
        'Search by ticket number, subject, or description, and filter by priority, department, category, or status.',
        'Choose View Ticket to read the original report and the conversation.',
        'Reply privately to the employee, or publish an official update for shared audiences.',
        'Change status, priority or visibility as needed; changing visibility requires a reason recorded in Audit Log.',
        'Keep resolved tickets for future reference; important changes are recorded in Audit Log.'
    ], 'Ticket history is preserved. Browser-only V1 tickets are not synchronized between separate computers.', ['tickets'], 'ticket support admin request reply status priority filter');

    helpAdd('fd-receipts-new', 'frontdesk', 'tasks', 'Find and reprint a Front Desk receipt', 'Look up a recorded payment and print its existing acknowledgement without taking another payment.', [
        'Open Receipt History from Front Desk.',
        'Search or filter the saved payments to locate the correct transaction.',
        'Select View/Reprint to inspect the existing payment acknowledgement.',
        'Choose the appropriate print format and print only if needed.'
    ], 'Reprinting does not record another payment. If a payment result is uncertain, verify Receipt History before trying to collect again.', ['receipts'], 'receipt history print reprint duplicate transaction acknowledgement proof paid');
    helpAdd('rs-receipts-new', 'restaurant', 'tasks', 'Find and reprint a Restaurant receipt', 'Review saved restaurant payment records and print a prior acknowledgement.', [
        'Open Receipt History in the Restaurant workspace.',
        'Locate the correct table payment using the available search and filters.',
        'Open View/Reprint for the original recorded payment.',
        'Preview the receipt and choose a printing format.'
    ], 'Receipt reprinting does not settle an order again. Verify payment status first if a transaction is uncertain.', ['receipts'], 'receipt history reprint printer confirmation cash order payment');
    helpAdd('ad-receipts-new', 'admin', 'tasks', 'Review payment receipts across departments', 'Find Front Desk and Restaurant acknowledgements in one receipt archive.', [
        'Open Receipt History from System Management.',
        'Use search, date and department filters to narrow the records.',
        'Select View/Reprint on the relevant saved payment.',
        'Review the original transaction without creating a new settlement.'
    ], 'Historical receipt details reflect their saved payment records. The browser prototype is not permanent backed-up accounting storage.', ['receipts'], 'receipt history reprint export department print audit');
    helpAdd('ad-builder-new', 'admin', 'tasks', 'Customize a receipt in Receipt Builder', 'Edit the printable layout for a department and paper format without changing payment amounts.', [
        'Open System Management, then Receipt Builder.',
        'Choose Restaurant or Front Desk and select 58 mm, 80 mm, or A4.',
        'Add or select blocks and use the preview to review their appearance.',
        'Save Draft or Save as Copy while experimenting.',
        'Use Publish Template when the layout is ready for future receipts.'
    ], 'Receipt Builder changes presentation, not recorded money or tax calculations. Save changes before leaving the editor.', ['receiptbuilder'], 'receipt builder customize template preview publish draft design thermal 58 80 a4');
    helpAdd('ad-receipt-settings-new', 'admin', 'tasks', 'Update Receipt Settings and resort branding', 'Configure the resort identity and tax profile used for payment acknowledgements.', [
        'Open System Management, then Receipt Settings.',
        'Review resort name, address, contact information and other business details.',
        'Check tax configuration against the resort actual registration.',
        'Save the settings and preview a receipt to verify the display.'
    ], 'Do not guess official tax registration data. This browser prototype is not a certified invoicing system.', ['receiptsettings'], 'receipt settings logo business profile tin branding contact vat tax');
    helpAdd('ad-discount-new', 'admin', 'tasks', 'Manage promotional and statutory discount settings', 'Review discount options and eligibility rules for resortOS.', [
        'Open System Management and select Discount Management.',
        'Review active promotional rules and the supported statutory discount workflow.',
        'Check each rule and eligible item classification before making changes.',
        'Use available management controls to save authorized adjustments.',
        'Review resulting transactions and discounts in the appropriate records.'
    ], 'Senior Citizen and PWD eligibility and VAT treatment must follow applicable requirements; resortOS does not verify legal entitlement automatically.', ['discounts'], 'discount management senior citizen pwd promo promotion voucher eligibility rates');
    helpAdd('rs-discount-new', 'restaurant', 'tasks', 'Apply a Senior Citizen or PWD discount to an order', 'Apply supported discounts before the restaurant bill is settled.', [
        'Open the relevant pending or awaiting-payment order or its bill.',
        'Choose Apply Discount.',
        'Select the appropriate supported discount and enter the requested eligible information.',
        'Review the calculated discount breakdown and authorize the change.',
        'Return to checkout and verify the updated amount before recording payment.'
    ], 'Do not apply discounts after payment in this workflow. Use only verified entitlement and correct eligible items.', ['orders','tables'], 'sc pwd senior citizen discount exemption bill VAT calculate apply');
    helpAdd('fd-late-discount-new', 'frontdesk', 'tasks', 'Apply a permitted late discount to a room charge', 'Adjust an eligible unpaid room-posted restaurant charge before Front Desk settlement.', [
        'Open an active stay and review its outstanding room charges.',
        'Locate a qualifying unpaid Restaurant charge.',
        'If your staff capability allows it, choose Apply Late Discount.',
        'Review the verified statutory eligibility and confirmation.',
        'Check the revised balance before recording any settlement.'
    ], 'Late discount controls are permission-restricted and apply only to eligible unpaid charges. Do not retry a payment until its outcome is verified.', ['rooms','charges','checkout'], 'late discount room posted restaurant senior citizen pwd unpaid authorization');
    helpAdd('ad-methods-new', 'admin', 'tasks', 'Configure cash and non-cash payment methods', 'Maintain shared external payment methods used by Front Desk and Restaurant.', [
        'Open System Management and select Payment Methods.',
        'Find or add the applicable method.',
        'Classify it as Cash or Non-cash, then set its active status.',
        'Save your changes and verify the method in the payment form.'
    ], 'Only methods classified as Cash calculate change. Non-cash received amounts must not exceed the balance due.', ['payments'], 'gcash bank transfer cash card payment method classification change noncash');
    helpAdd('fd-payment-error-new', 'frontdesk', 'fixes', 'Why does a Front Desk payment amount fail?', 'Understand amount and method validation before recording a settlement.', [
        'Check the outstanding balance on the active charge or checkout.',
        'Confirm that the selected payment method is active and correct.',
        'For non-cash payments, the received amount cannot exceed the amount due.',
        'For cash payments, check the tendered amount and any calculated change.',
        'If you already attempted payment, check Receipt History before retrying.'
    ], 'A rejected form is not proof of a recorded payment. If the result is uncertain, verify payment records before entering another transaction.', ['charges','checkout','receipts'], 'invalid amount check received method payment fail error cash gcash tendered');
    helpAdd('rs-payment-error-new', 'restaurant', 'fixes', 'Why can’t I complete a Restaurant payment?', 'Check common restaurant checkout validation problems safely.', [
        'Confirm the order is ready for payment and review the final amount after discounts.',
        'Select an active payment method.',
        'For non-cash payment, do not enter more than the balance due.',
        'For cash, check that the tendered amount covers the amount due.',
        'If payment might have succeeded, inspect Receipt History before retrying.'
    ], 'Never record the payment twice because its confirmation window failed to appear.', ['tables','orders','receipts'], 'cash payment received invalid method error checkout failed confirm gcash');
    helpAdd('ad-help-navigation-new', 'admin', 'start', 'Get help while managing resortOS', 'Use the Help button to find answers and navigate to supported features.', [
        'Click Help in the upper right of the current page.',
        'Review suggestions related to your current screen.',
        'Ask a question or browse the existing Help Articles.',
        'Open the detailed article or select a relevant destination.',
        'If guidance cannot resolve the issue, create a Support & Issues ticket.'
    ], 'Live navigation guides and Explore This Page are available in SmartHelp.', ['system'], 'smarthelp search assistant where how help article questions');
    const HELP_RELATIONSHIPS = {
        'fd-checkout': ['fd-payment', 'fd-checkout-block', 'fd-charges'],
        'fd-payment': ['fd-outstanding', 'fd-checkout'],
        'fd-service': ['fd-duration', 'fd-charges'],
        'fd-outstanding': ['fd-charges', 'fd-payment'],
        'rs-start': ['rs-add', 'rs-table-status', 'rs-ready'],
        'rs-add': ['rs-existing-order', 'rs-ready'],
        'rs-ready': ['rs-continue', 'rs-cash', 'rs-post'],
        'rs-post': ['rs-invalid-room', 'rs-posts'],
        'rs-table-status': ['rs-start', 'rs-ready'],
        'ad-system': ['ad-tables', 'ad-menu', 'ad-service'],
        'ad-audit': ['ad-audit-terms', 'ad-audit-safety'],
        'ad-service': ['fd-duration']
    };
    for (const article of HELP_ARTICLES) {
        article.related = (HELP_RELATIONSHIPS[article.id] || []).filter(id => HELP_ARTICLES.some(x => x.id === id && x.role === article.role));
    }


    helpAdd('fd-checkout-troubleshoot-v5','frontdesk','fixes','Checkout cannot proceed or the room still has a balance','Check the active stay, unpaid extra charges, and recorded settlements before attempting checkout.',[
        'Open Checkout and verify you selected the correct active stay.',
        'Review the outstanding charges. Accommodation payments are outside resortOS.',
        'If a recent settlement seemed to fail, inspect Receipt History before recording any further payment.',
        'Only complete checkout after the app confirms the required balance and guest stay status.'
    ],'Never create a second payment merely because the confirmation window did not appear.',['checkout','balances'],'cannot checkout unpaid partial balance receipt duplicate');
    helpAdd('fd-charge-unavailable-v5','frontdesk','fixes','Why can’t I post an additional service?','A room must have an eligible active stay before it can receive additional charges.',[
        'Confirm that the room has an active stay and the room is not inactive.',
        'Check that the service is active and quantity or duration fields are filled correctly.',
        'Review the amount calculated before saving.',
        'If the charge may already have saved, inspect the stay charge history before retrying.'
    ],'Direct cash sales and accommodation fees are not entered as additional room charges.',['charges','addservice'],'service disabled duration quantity room occupied posted error');
    helpAdd('fd-receipt-troubleshoot-v5','frontdesk','fixes','Payment receipt is missing or will not reprint','Find the existing settlement in Receipt History before treating a missing preview as a failed payment.',[
        'Open Receipt History and clear search or date filters.',
        'Search the payment reference, room, or date.',
        'Use View/Reprint on the existing payment. This does not collect another payment.',
        'If the payment record is missing, check the stay balance and audit history before asking Admin to investigate.'
    ],'A blank preview is not proof that money was not recorded.',['receipts','checkout'],'missing receipt payment reprint preview printed blank');
    helpAdd('fd-late-discount-troubleshoot-v5','frontdesk','fixes','Late discount is unavailable for a room charge','Late statutory discounts require eligible unpaid restaurant charges and the necessary staff permission.',[
        'Open the active stay and review its room-posted restaurant charges.',
        'Confirm the charge is eligible, unpaid, and not already discounted in a conflicting way.',
        'Ask an authorized staff member to review the required supporting details and discount permission.',
        'Never change the guest bill through a manual workaround.'
    ],'Only eligible purchases qualify; follow your organization’s discount compliance policy.',['charges','checkout'],'late discount eligible permission unpaid restaurant senior pwd');
    helpAdd('rs-checkout-troubleshoot-v5','restaurant','fixes','Checkout button is unavailable for a table','A restaurant order must be in the correct checkout state before staff can record or post its bill.',[
        'Open Tables and locate the intended active table order.',
        'Review the order items and confirm the table is ready to pay.',
        'Apply authorized eligible discounts before settlement.',
        'Choose restaurant payment or room posting only after verifying the correct destination and total.'
    ],'Never use another table’s order to bypass an unavailable action.',['tables','orders'],'checkout table unavailable pending awaiting payment ready order');
    helpAdd('rs-room-post-troubleshoot-v5','restaurant','fixes','Cannot post a restaurant order to a guest room','The destination room must have an eligible active stay, and the order must be ready for posting.',[
        'Open the intended table and review its bill.',
        'Verify an eligible occupied room and that the guest authorized room posting.',
        'Confirm the correct room in the posting dialog.',
        'If posting seemed to fail, inspect Room Charges before trying a second time.'
    ],'Room posting is not payment collection; Front Desk settles the posted balance later.',['roomcharges','tables'],'cannot post room guest active stay occupied posting');
    helpAdd('rs-discount-troubleshoot-v5','restaurant','fixes','Why was a restaurant discount rejected?','Discounts depend on an eligible purchase, valid beneficiary details, permissions and applicable discount rules.',[
        'Check the order is still unpaid and eligible for the selected discount.',
        'Review the beneficiary, number of eligible diners or items, and any required documentation.',
        'Read the discount preview before confirming.',
        'If the system rejects the discount, do not add a manual negative-price menu item as a workaround.'
    ],'Eligibility and tax calculations should be reviewed according to applicable resort policy and law.',['orders','tables'],'discount invalid eligible proof pwd senior percentage');
    helpAdd('rs-cart-troubleshoot-v5','restaurant','fixes','Restaurant cart items disappeared after changing tables','Switching tables can reset the currently unsaved ordering draft.',[
        'Select the intended table before choosing items.',
        'Add menu items and check quantities.',
        'Save the table order before moving to another table.',
        'Check Orders to see whether a prior order was actually saved.'
    ],'An unsaved draft is not a confirmed order.',['neworder','tables'],'cart reset vanished items switch table draft unsaved');
    helpAdd('rs-receipt-troubleshoot-v5','restaurant','fixes','Restaurant payment recorded but receipt is not visible','Use Receipt History to verify the existing payment before repeating checkout.',[
        'Open Restaurant Receipt History and clear any active filters.',
        'Look for the order or payment reference.',
        'If the payment exists, choose View/Reprint instead of collecting payment again.',
        'If you cannot find the record, request management assistance with the transaction reference.'
    ],'Do not pay the same restaurant order twice to force a receipt preview.',['receipts','tables'],'receipt reprint restaurant payment recorded absent');
    helpAdd('ad-employee-access-troubleshoot-v5','admin','fixes','Staff member cannot access the expected dashboard','Inspect the employee’s active status and department access, then make only authorized changes.',[
        'Open System Management → Employees & Roles.',
        'Find the correct employee account and inspect its active status.',
        'Check the operational dashboard permissions.',
        'Save an authorized correction, then verify the employee can select the intended dashboard.'
    ],'Cross-department operational access does not grant Admin privileges.',['users'],'employee forbidden permission inactive restaurant front desk dashboard');
    helpAdd('ad-payment-method-troubleshoot-v5','admin','fixes','Payment method does not appear at checkout','Inactive payment methods are not offered for new payments.',[
        'Open System Management → Payment Methods.',
        'Find the desired payment method and check whether it is active.',
        'Confirm it has the correct Cash or Non-cash classification.',
        'Save an authorized correction, then reopen the payment selection.'
    ],'Do not change old recorded payment methods or historic receipts.',['payments'],'gcash unavailable payment method hidden cash classification');
    helpAdd('ad-receipt-builder-troubleshoot-v5','admin','fixes','Receipt Builder changes are not appearing on printed receipts','Saved drafts and published layouts can differ; check the active format and publication state.',[
        'Open Receipt Builder and confirm Restaurant or Front Desk and the correct 58 mm, 80 mm or A4 format.',
        'Review and save the working draft.',
        'Publish the intended layout using the available controls.',
        'Preview the correct receipt format and confirm the published template before reprinting.'
    ],'Avoid discarding an unsaved Receipt Builder draft when leaving this page.',['receiptbuilder'],'receipt builder template draft publish not update print');
    helpAdd('ad-tickets-troubleshoot-v5','admin','fixes','Support ticket or update is missing','Verify filters and visibility before assuming a ticket was lost.',[
        'Open Support & Issues and clear search or status filters.',
        'Check active and resolved views as applicable.',
        'Confirm the creator and visibility of the ticket.',
        'Review its history to see updates, assignments and resolution.'
    ],'Only authorized Admin employees can resolve tickets.',['tickets'],'ticket missing resolved filter notification update');
    helpAdd('ad-discount-troubleshoot-v5','admin','fixes','Discount or promotion is not being offered','Check eligibility, promotion activity and validity dates before changing configuration.',[
        'Open Discount Management.',
        'Review whether the promotion is active and its start and end dates.',
        'Check the intended menu or category scope.',
        'Verify the purchasing workflow uses an eligible order; review audit history if an adjustment was already saved.'
    ],'Existing transactions and applied statutory discounts require careful review.',['discounts'],'promotion inactive expiration wrong item eligible discount');

    let smartView = 'home', smartQuestion = '', smartAnswer = null, smartRecent = [], smartAnswerBeforeArticle = 'home';
    let smartAskCategory = 'foryou', smartAskDraft = '';
    let smartLibrarySection='articles', smartGuideSection='tasks', smartHelpExpanded=false;

    let smartLastError=null, smartSupportDraft=null;
    const smartRecoveryRules=[
        {id:'payment',pattern:/amount received|payment method|non.cash|tendered|amount.*(invalid|exceed)|payment.*(invalid|failed)/i,title:'Payment amount or method needs attention',reason:'resortOS rejected the entered payment details. This does not confirm that a payment was recorded.',fix:['Check the outstanding balance and selected payment method.','Cash may allow change, but non-cash payments cannot exceed the amount due.','Before submitting again, check Receipt History if the result is uncertain.'],roles:{frontdesk:'fd-payment-error-new',restaurant:'rs-payment-error-new'}},
        {id:'room',pattern:/room.*(unavailable|occupied|inactive|stay)|stay.*(unavailable|active)/i,title:'Room or stay is not eligible',reason:'The selected room or stay is not available for the requested action.',fix:['Verify the room and active stay in Front Desk.','Do not select a different guest room merely to bypass this restriction.'],roles:{frontdesk:'fd-charge-unavailable-v5',restaurant:'rs-room-post-troubleshoot-v5'}},
        {id:'discount',pattern:/discount|beneficiary|eligible|statutory|promotion/i,title:'Discount eligibility needs review',reason:'The discount could not be accepted under the current application rules.',fix:['Confirm the order or charge is unpaid and eligible.','Review permissions, beneficiary details and the discount preview.','Do not create a manual negative charge as a workaround.'],roles:{restaurant:'rs-discount-troubleshoot-v5',frontdesk:'fd-late-discount-troubleshoot-v5',admin:'ad-discount-troubleshoot-v5'}},
        {id:'permission',pattern:/access required|not authorized|permission|forbidden|inactive staff/i,title:'Access is restricted',reason:'The current employee identity is not authorized for this action.',fix:['Check that you are using the intended authorized dashboard.','Ask an Admin to review staff status and operational permissions.'],roles:{admin:'ad-employee-access-troubleshoot-v5'}},
        {id:'order',pattern:/cart|table.*(unavailable|occupied)|order.*(save|valid|item)/i,title:'Restaurant order needs review',reason:'The order is not in the required state for that action.',fix:['Confirm the correct table before adding items.','Review items and quantities, then check whether an order was already saved.'],roles:{restaurant:'rs-cart-troubleshoot-v5'}},
        {id:'required',pattern:/required|complete.*field|valid.*(name|quantity|date|range)|subject.*description/i,title:'Required information is missing or invalid',reason:'The application needs corrected information before it can save.',fix:['Review the highlighted or required form fields.','Correct invalid values and check the entries before saving again.'],roles:{frontdesk:'fd-charge-unavailable-v5',restaurant:'rs-checkout-troubleshoot-v5',admin:'ad-employee-access-troubleshoot-v5'}}
    ];
    function smartRecoveryMatch(message){return smartRecoveryRules.find(r=>r.pattern.test(String(message||'')))||null;}
    function smartRecoveryMarkup(message,compact=false){
        const rule=smartRecoveryMatch(message), article=rule&&helpAllowed(rule.roles[role]);
        if(!message)return `<div class="smart-fallback"><strong>No recent validation error detected</strong><p>SmartHelp can explain a validation message after resortOS displays it. You can also search the Problems & Solutions articles or describe the issue to Support.</p></div>`;
        return `<section class="smart-recovery" role="status"><span class="smart-recovery-eyebrow">APPLICATION MESSAGE</span><p class="smart-recovery-quote">${esc(String(message).slice(0,180))}</p><h3>${esc(rule?.title||'Let’s review this issue')}</h3><p>${esc(rule?.reason||'resortOS reported an error, but SmartHelp does not have a verified explanation for this exact message. Do not assume the operation succeeded or failed without checking its records.')}</p>${rule?`<ol>${rule.fix.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`:''}<div class="smart-recovery-actions">${article?`<button type="button" class="smart-btn" data-action="help-article" data-id="${esc(article.id)}">Read troubleshooting article</button>`:''}<button type="button" class="smart-btn smart-primary" data-action="help-smart-support">Ask Support</button></div></section>`;
    }
    function smartTroubleMarkup(){
        const latest=smartLastError&&smartLastError.role===role&&Date.now()-smartLastError.at<1200000?smartLastError:null;
        const fixes=HELP_ARTICLES.filter(a=>a.role===role&&a.category==='fixes');
        return `<div class="smart-panel-topline"><h2>Troubleshooting</h2><p>Explain real resortOS validation messages and find a safe way forward.</p></div><button type="button" class="smart-ask-back" data-action="help-smart-tab" data-id="ask">← Back to Ask SmartHelp</button>${smartRecoveryMarkup(latest?.message||'')}<section class="smart-section"><h3>Common problems</h3>${fixes.map(smartTopicMarkup).join('')}</section><button type="button" class="smart-support" data-action="help-smart-support">Problem still unresolved? Prepare a support ticket →</button>`;
    }
    function smartSupportStart(){
        if(document.querySelector('#modal-root .modal')) {toast('Finish or close the current window before creating a support ticket. Your current details are preserved.',true);return;}
        const guide=smartGuide&&smartGuides.find(g=>g.id===smartGuide.id);
        const question=String(smartQuestion||smartGuide?.inlineQuestion||'').trim();
        const context=guide?.title||helpAllowed(helpSelected)?.title||helpNavName(route);
        const summary=question?question.slice(0,95):smartLastError?.role===role&&Date.now()-smartLastError.at<1200000?'A recent resortOS validation message needs help':'Help using '+context;
        smartSupportDraft={role,context:String(context).slice(0,85),question:summary,route};
        if(helpMode==='adaptive'&&smartGuide)smartGuidePause();
        openNewTicket();
    }

    const smartNlpAliases = {
        employees:'employee', employee:'employee', staff:'employee', workers:'employee', worker:'employee', personnel:'employee', cashier:'employee', cashiers:'employee', users:'employee', colleague:'employee', teammates:'employee', teammate:'employee', accounts:'account',
        add:'create', adding:'create', added:'create', create:'create', creating:'create', created:'create', register:'create', registering:'create', setup:'create', set:'create', new:'create', make:'create', making:'create', apply:'create', applying:'create', record:'create', recording:'create', hire:'create', insert:'create',
        update:'edit', modify:'edit', change:'edit', changing:'edit', customize:'edit', adjust:'edit', rename:'edit', modify:'edit', edited:'edit', editing:'edit',
        remove:'deactivate', delete:'deactivate', deactivate:'deactivate', disable:'deactivate', disablement:'deactivate', inactive:'inactive', terminate:'deactivate', archive:'deactivate',
        enable:'activate', reactivate:'activate', restore:'activate', activated:'activate',
        find:'find', locate:'find', search:'find', look:'find', view:'find', see:'find', show:'find', where:'find', access:'find', open:'find',
        print:'reprint', printing:'reprint', printed:'reprint', reprint:'reprint', duplicate:'reprint',
        bills:'bill', billing:'bill', orders:'order', ordered:'order', tables:'table', meals:'menu', food:'menu', dishes:'menu', items:'item', categories:'category',
        rooms:'room', stays:'stay', guests:'guest', reservations:'stay', checkin:'checkin', checkout:'checkout',
        receipts:'receipt', acknowledgement:'receipt', acknowledgment:'receipt', invoices:'receipt',
        payments:'payment', paying:'payment', pay:'payment', paid:'payment', settle:'payment', settling:'payment', settlement:'payment', collect:'payment', collecting:'payment', tender:'payment',
        balances:'balance', outstanding:'balance', unpaid:'balance', discounts:'discount', discounted:'discount', pwd:'discount', senior:'discount', seniors:'discount', vat:'vat', vatfree:'vat',
        promotions:'promotion', promos:'promotion', promo:'promotion',
        errors:'error', erroneous:'error', failed:'error', fails:'error', failing:'error', invalid:'error', broken:'error', stuck:'error', problem:'error', problems:'error', wrong:'error', issue:'issue', issues:'issue',
        cannot:'cannot', cant:'cannot', couldnt:'cannot', unable:'cannot', wont:'cannot', doesnt:'cannot', denied:'cannot',
        methods:'method', gcash:'gcash', transfer:'bank', debit:'card', credit:'card',
        tickets:'ticket', complaints:'ticket', notifications:'notification', alerts:'notification', bell:'notification',
        permissions:'permission', privileges:'permission', roles:'permission', rights:'permission',
        reports:'audit', logs:'audit', histories:'history', history:'history',
        services:'service', towels:'service', laundry:'service', rental:'service', charges:'charge', charged:'charge',
        settings:'settings', templates:'template', layouts:'layout', builder:'builder'
    };
    const smartNlpPhrases = [
        [/\bfront\s+desk\b/g,'frontdesk'],[/\bcheck[ -]?in\b/g,'checkin'],[/\bcheck[ -]?out\b/g,'checkout'],
        [/\breceipt\s+builder\b/g,'receiptbuilder'],[/\breceipt\s+settings\b/g,'receiptsettings'],
        [/\bpayment\s+methods?\b/g,'paymentmethod'],[/\broom\s+charges?\b/g,'roomcharge'],
        [/\broom\s+(?:postings?|posts?)\b/g,'roompost'],[/\bsenior\s+citizen\b/g,'senior'],
        [/\b(?:support\s+and\s+issues|support\s+ticket)\b/g,'ticket'],[/\bteam\s+member\b/g,'employee'],
        [/\b(?:set\s+up|setting\s+up)\b/g,'setup'],[/\b(?:log\s+in|sign\s+in)\b/g,'login'],
        [/\b(?:money\s+back|cash\s+change)\b/g,'change'],[/\b(?:late\s+discount)\b/g,'latediscount']
    ];
    const smartIntentDefinitions = [
        {id:'employee.create',topic:'employee',actions:['create'],objects:['employee'],articles:{admin:'ad-users'},guide:'op-ad-employee',priority:9,answer:'Open System Management → Employees & Roles, choose Add Employee, enter staff details, assign permitted departments, and review before saving.'},
        {id:'employee.deactivate',topic:'employee',actions:['deactivate'],objects:['employee'],articles:{admin:'ad-remove'},guide:'ad-users',priority:9,answer:'In Employees & Roles, locate the staff member and use the available Active/Inactive control. Historical records must be retained.'},
        {id:'employee.activate',topic:'employee',actions:['activate'],objects:['employee'],articles:{admin:'ad-users'},guide:'ad-users',priority:9,answer:'An Admin can open Employees & Roles, find the inactive staff member, and reactivate their access when appropriate.'},
        {id:'employee.permissions',topic:'employee',actions:['permission','edit','manage','find'],objects:['employee','permission'],articles:{admin:'ad-users'},guide:'ad-users',priority:8,answer:'Manage Front Desk and Restaurant access through System Management → Employees & Roles. Regular staff must not receive Admin privileges.'},
        {id:'employee.find',topic:'employee',actions:['find','manage'],objects:['employee'],articles:{admin:'ad-users'},guide:'ad-users',priority:3},
        {id:'receipt.builder',topic:'receiptbuilder',objects:['receiptbuilder','template','layout'],actions:['edit','create','find','manage','design','preview'],articles:{admin:'ad-builder-new'},guide:'ad-builder',priority:10},
        {id:'receipt.settings',topic:'receiptsettings',objects:['receiptsettings','branding'],actions:['edit','find','manage','create'],articles:{admin:'ad-receipt-settings-new'},guide:'op-ad-receipt-settings',priority:10},
        {id:'receipt.reprint',topic:'receipt',objects:['receipt'],actions:['reprint','find','history'],articles:{frontdesk:'fd-receipts-new',restaurant:'rs-receipts-new',admin:'ad-receipts-new'},guides:{frontdesk:'op-fd-reprint',restaurant:'op-rs-reprint',admin:'ad-receipts'},priority:5},
        {id:'receipt.error',topic:'receipt',objects:['receipt'],actions:['error','cannot'],articles:{frontdesk:'fd-receipt-troubleshoot-v5',restaurant:'rs-receipts-new',admin:'ad-receipts-new'},priority:11},
        {id:'payment.method',topic:'payment',objects:['paymentmethod','method'],actions:['create','edit','manage','find','activate','deactivate'],articles:{admin:'ad-methods-new'},guide:'ad-methods',priority:12},
        {id:'payment.error',topic:'payment',objects:['payment','balance'],actions:['error','cannot'],articles:{frontdesk:'fd-payment-error-new',restaurant:'rs-payment-error-new',admin:'ad-payment-troubleshoot-v5'},priority:11},
        {id:'payment.record',topic:'payment',objects:['payment','balance'],actions:['create','payment','find'],articles:{frontdesk:'fd-payment',restaurant:'rs-cash'},guides:{frontdesk:'op-fd-payment',restaurant:'op-rs-payment'},priority:4},
        {id:'discount.apply',topic:'discount',objects:['discount','latediscount'],actions:['create','edit','find','manage'],articles:{frontdesk:'fd-late-discount-new',restaurant:'rs-discount-new',admin:'ad-discount-new'},guides:{restaurant:'op-rs-discount',frontdesk:'fd-charges',admin:'ad-discounts'},priority:5},
        {id:'discount.error',topic:'discount',objects:['discount','latediscount'],actions:['error','cannot'],articles:{frontdesk:'fd-late-discount-troubleshoot-v5',restaurant:'rs-discount-troubleshoot-v5',admin:'ad-discount-troubleshoot-v5'},priority:11},
        {id:'promotion.manage',topic:'promotion',objects:['promotion'],actions:['create','edit','manage','find','deactivate'],articles:{admin:'ad-discount-new'},guide:'op-ad-promotion',priority:8},
        {id:'stay.create',topic:'stay',objects:['stay','checkin','guest'],actions:['create','checkin'],articles:{frontdesk:'fd-register'},guide:'op-fd-register',priority:7},
        {id:'stay.checkout',topic:'stay',objects:['checkout','stay'],actions:['checkout','payment','find'],articles:{frontdesk:'fd-checkout'},guide:'fd-checkout',priority:6},
        {id:'stay.checkout-error',topic:'stay',objects:['checkout'],actions:['error','cannot'],articles:{frontdesk:'fd-checkout-troubleshoot-v5'},priority:12},
        {id:'room.status',topic:'room',objects:['room'],actions:['find','manage','status'],articles:{frontdesk:'fd-room-status',admin:'ad-rooms'},guides:{frontdesk:'fd-rooms',admin:'ad-rooms'},priority:3},
        {id:'room.create',topic:'room',objects:['room'],actions:['create','edit','activate','deactivate'],articles:{admin:'ad-rooms'},guide:'ad-rooms',priority:8},
        {id:'charge.post',topic:'charge',objects:['charge','service','roomcharge'],actions:['create','manage','payment'],articles:{frontdesk:'fd-service'},guide:'op-fd-service',priority:4},
        {id:'order.create',topic:'order',objects:['order','menu','item','table'],actions:['create'],articles:{restaurant:'rs-start'},guide:'op-rs-order',priority:3},
        {id:'order.additems',topic:'order',objects:['order','item','menu','cart'],actions:['create','edit'],articles:{restaurant:'rs-add'},guide:'op-rs-order',priority:5},
        {id:'order.void',topic:'order',objects:['order'],actions:['deactivate','void','cancel'],articles:{restaurant:'rs-void'},priority:11},
        {id:'order.roompost',topic:'order',objects:['roompost','roomcharge','order'],actions:['post','create'],articles:{restaurant:'rs-post'},guide:'op-rs-room',priority:10},
        {id:'table.manage',topic:'table',objects:['table'],actions:['create','edit','deactivate','activate'],articles:{admin:'ad-tables'},priority:7},
        {id:'table.status',topic:'table',objects:['table'],actions:['find','manage','status'],articles:{restaurant:'rs-table-status'},guide:'rs-tables',priority:2},
        {id:'menu.manage',topic:'menu',objects:['menu','item','category'],actions:['edit','create','manage','deactivate','activate'],articles:{admin:'ad-menu'},guide:'ad-menu',priority:7},
        {id:'service.manage',topic:'service',objects:['service'],actions:['create','edit','manage'],articles:{admin:'ad-service',frontdesk:'fd-service'},guides:{frontdesk:'op-fd-service'},priority:4},
        {id:'audit.search',topic:'audit',objects:['audit','history'],actions:['find','manage','reprint'],articles:{admin:'ad-audit'},guide:'ad-audit',priority:6},
        {id:'ticket.create',topic:'ticket',objects:['ticket','issue'],actions:['create','find'],articles:{frontdesk:'fd-tickets',restaurant:'rs-tickets',admin:'ad-tickets'},guides:{frontdesk:'op-fd-ticket',restaurant:'op-rs-ticket',admin:'ad-support'},priority:5},
        {id:'ticket.resolve',topic:'ticket',objects:['ticket','issue'],actions:['edit','resolve','manage'],articles:{admin:'ad-tickets'},guide:'ad-support',priority:7},
        {id:'notification.view',topic:'notification',objects:['notification'],actions:['find','manage'],articles:{frontdesk:'fd-notifications',restaurant:'rs-notifications',admin:'ad-notifications'},priority:7}
    ];
    // Phase 7.4.3: manually source-audited, default-deny capability registry.
    // Entries are pinned to implemented UI action anchors and existing Help article IDs.
    // This is a client-side Help authorization policy, NOT a server security boundary.
    const smart743Registry=Object.freeze([{"id":"employee.create","object":"employee","action":"create","roles":["admin"],"articles":{"admin":"ad-users"},"codeAnchor":"feature-edit-employee","review":"source-audited","kind":"instructional"},{"id":"employee.deactivate","object":"employee","action":"deactivate","roles":["admin"],"articles":{"admin":"ad-remove"},"codeAnchor":"feature-edit-employee","review":"source-audited","kind":"instructional"},{"id":"employee.activate","object":"employee","action":"activate","roles":["admin"],"articles":{"admin":"ad-users"},"codeAnchor":"feature-edit-employee","review":"source-audited","kind":"instructional"},{"id":"employee.permissions","object":"employee","action":"permissions","roles":["admin"],"articles":{"admin":"ad-users"},"codeAnchor":"feature-edit-employee","review":"source-audited","kind":"instructional"},{"id":"employee.find","object":"employee","action":"find","roles":["admin"],"articles":{"admin":"ad-users"},"codeAnchor":"nav-users","review":"source-audited","kind":"instructional"},{"id":"receipt.builder","object":"receipt","action":"design","roles":["admin"],"articles":{"admin":"ad-builder-new"},"codeAnchor":"receiptBuilderPage","review":"source-audited","kind":"instructional"},{"id":"receipt.settings","object":"receipt","action":"configure","roles":["admin"],"articles":{"admin":"ad-receipt-settings-new"},"codeAnchor":"receiptSettingsPage","review":"source-audited","kind":"instructional"},{"id":"receipt.reprint","object":"receipt","action":"reprint","roles":["frontdesk","restaurant","admin"],"articles":{"frontdesk":"fd-receipts-new","restaurant":"rs-receipts-new","admin":"ad-receipts-new"},"codeAnchor":"receipt-payment","review":"source-audited","kind":"instructional"},{"id":"receipt.error","object":"receipt","action":"troubleshoot","roles":["frontdesk","restaurant","admin"],"articles":{"frontdesk":"fd-receipt-troubleshoot-v5","restaurant":"rs-receipt-troubleshoot-v5","admin":"ad-receipts-new"},"codeAnchor":"receiptPrompt","review":"source-audited","kind":"troubleshooting"},{"id":"payment.method","object":"payment_method","action":"configure","roles":["admin"],"articles":{"admin":"ad-methods-new"},"codeAnchor":"feature-edit-payment","review":"source-audited","kind":"instructional"},{"id":"payment.error","object":"payment","action":"troubleshoot","roles":["frontdesk","restaurant"],"articles":{"frontdesk":"fd-payment-error-new","restaurant":"rs-payment-error-new"},"codeAnchor":"payment-form","review":"source-audited","kind":"troubleshooting"},{"id":"payment.record","object":"payment","action":"record","roles":["frontdesk","restaurant"],"articles":{"frontdesk":"fd-payment","restaurant":"rs-cash"},"codeAnchor":"payment-form","review":"source-audited","kind":"instructional"},{"id":"discount.apply","object":"discount","action":"apply","roles":["frontdesk","restaurant"],"articles":{"frontdesk":"fd-late-discount-new","restaurant":"rs-discount-new"},"codeAnchor":"discount-order","review":"source-audited","kind":"instructional"},{"id":"discount.error","object":"discount","action":"troubleshoot","roles":["frontdesk","restaurant","admin"],"articles":{"frontdesk":"fd-late-discount-troubleshoot-v5","restaurant":"rs-discount-troubleshoot-v5","admin":"ad-discount-troubleshoot-v5"},"codeAnchor":"discount-apply-form","review":"source-audited","kind":"troubleshooting"},{"id":"promotion.manage","object":"promotion","action":"manage","roles":["admin"],"articles":{"admin":"ad-discount-new"},"codeAnchor":"promotion-form","review":"source-audited","kind":"instructional"},{"id":"stay.create","object":"stay","action":"register","roles":["frontdesk"],"articles":{"frontdesk":"fd-register"},"codeAnchor":"register-stay","review":"source-audited","kind":"instructional"},{"id":"stay.checkout","object":"stay","action":"checkout","roles":["frontdesk"],"articles":{"frontdesk":"fd-checkout"},"codeAnchor":"checkout-stay","review":"source-audited","kind":"instructional"},{"id":"stay.checkout-error","object":"stay","action":"troubleshoot_checkout","roles":["frontdesk"],"articles":{"frontdesk":"fd-checkout-troubleshoot-v5"},"codeAnchor":"confirm-checkout","review":"source-audited","kind":"troubleshooting"},{"id":"room.status","object":"room","action":"view_status","roles":["frontdesk","admin"],"articles":{"frontdesk":"fd-room-status","admin":"ad-rooms"},"codeAnchor":"fd-room-filter","review":"source-audited","kind":"instructional"},{"id":"room.create","object":"room","action":"manage","roles":["admin"],"articles":{"admin":"ad-rooms"},"codeAnchor":"add-room","review":"source-audited","kind":"instructional"},{"id":"charge.post","object":"charge","action":"post","roles":["frontdesk"],"articles":{"frontdesk":"fd-service"},"codeAnchor":"case 'service-form'","review":"source-audited","kind":"instructional"},{"id":"order.create","object":"order","action":"create","roles":["restaurant"],"articles":{"restaurant":"rs-start"},"codeAnchor":"new-for-table","review":"source-audited","kind":"instructional"},{"id":"order.additems","object":"order","action":"add_items","roles":["restaurant"],"articles":{"restaurant":"rs-add"},"codeAnchor":"table-add-items","review":"source-audited","kind":"instructional"},{"id":"order.void","object":"order","action":"void","roles":["restaurant"],"articles":{"restaurant":"rs-void"},"codeAnchor":"void-order","review":"source-audited","kind":"instructional"},{"id":"order.roompost","object":"order","action":"post_room","roles":["restaurant"],"articles":{"restaurant":"rs-post"},"codeAnchor":"post-table-form","review":"source-audited","kind":"instructional"},{"id":"table.manage","object":"table","action":"manage","roles":["admin"],"articles":{"admin":"ad-tables"},"codeAnchor":"edit-table","review":"source-audited","kind":"instructional"},{"id":"table.status","object":"table","action":"view_status","roles":["restaurant"],"articles":{"restaurant":"rs-table-status"},"codeAnchor":"rs-table-filter","review":"source-audited","kind":"instructional"},{"id":"menu.manage","object":"menu","action":"manage","roles":["admin"],"articles":{"admin":"ad-menu"},"codeAnchor":"catalog-form","review":"source-audited","kind":"instructional"},{"id":"service.manage","object":"service_catalog","action":"manage","roles":["admin"],"articles":{"admin":"ad-service"},"codeAnchor":"edit-catalog-service","review":"source-audited","kind":"instructional"},{"id":"audit.search","object":"audit","action":"search","roles":["admin"],"articles":{"admin":"ad-audit"},"codeAnchor":"view-audit","review":"source-audited","kind":"instructional"},{"id":"ticket.create","object":"ticket","action":"create","roles":["frontdesk","restaurant","admin"],"articles":{"frontdesk":"fd-tickets","restaurant":"rs-tickets","admin":"ad-tickets"},"codeAnchor":"ticket-create","review":"source-audited","kind":"instructional"},{"id":"ticket.resolve","object":"ticket","action":"resolve","roles":["admin"],"articles":{"admin":"ad-tickets"},"codeAnchor":"ticket-manage-form","review":"source-audited","kind":"instructional"},{"id":"notification.view","object":"notification","action":"view","roles":["frontdesk","restaurant","admin"],"articles":{"frontdesk":"fd-notifications","restaurant":"rs-notifications","admin":"ad-notifications"},"codeAnchor":"notify-toggle","review":"source-audited","kind":"instructional"}].map(entry=>Object.freeze({...entry,roles:Object.freeze(entry.roles),articles:Object.freeze(entry.articles)})));
    const smart743ById=new Map(smart743Registry.map(entry=>[entry.id,entry]));
    // PHASE 7.4.4 SAFETY POLICY BEGIN
    // Every operational answer requires a source-audited capability, a matching
    // object AND action in the user's words, a role-specific article and a
    // successful registry audit. MiniLM may rank hints, but it cannot create
    // evidence or authorize a procedure. This is NOT server-side security.
    const smart744PolicyVersion='7.4.4-safety-enforcement-v1';
    let smart744LastVerified=null;
    let smart744Transcript=[];
    function smart744Policy(question, context=null){
        const q=String(question||'').toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
        const has=re=>re.test(q);
        const result=(id,reason,source='safety-policy')=>({id,reason,source});
        if(!q)return result('__clarify__','Please describe the resortOS task or screen');
        if(q.length>240)return result('__clarify__','Please ask about one task at a time');
        const boundary=smart74Boundary(q,'');
        // Legacy boundary rules can veto explicit unsupported subjects, but their
        // broad no-evidence/ambiguous guesses must not suppress a well-formed
        // current question before its object/action pairs are parsed.
        if(boundary && /outside the verified resortOS capability catalog|Feature or subject is outside/i.test(boundary.reason))return result('__unsupported__',boundary.reason);
        const scope=smart73Scope(q,'');
        if(scope && (scope.status==='unknown' && /Unsupported resortOS feature|No verified resortOS function/i.test(scope.reason)))return result('__unsupported__',scope.reason);
        if(scope?.reason==='Multiple independent workflows; ask which to address first')return result('__clarify__',scope.reason);
        if(has(/\b(?:deactivate|create|enable|configure|record|void|remove|change|manage|edit)\b.{0,50}\b(?:employee|staff|account|room|table|order)\b.{0,24}\b(?:and|then)\b.{0,40}\b(?:configure|edit|create|update|deactivate|enable|change)\b.{0,30}\b(?:receipts?|payment|menu|staff|employee|account|table|room|tickets?)\b/))return result('__clarify__','Please ask about one operation at a time');
        // Unverified integrations and sensitive operations must never be
        // transformed into the superficially similar *local* feature.
        if(has(/\b(?:api|webhook|quickbooks|xero|stripe|paypal|woocommerce|shopify|zapier|external integration|third.party|import.*(?:spreadsheet|csv)|export.*(?:accounting|bank)|synchroni[sz]e.*external|automatically (?:buy|charge|bill|refund|send|email|text|pay|purchase)|refund|reverse a payment|delete.*permanently|erase.*(?:history|records)|override.*permissions?|bypass.*(?:role|authorization|access)|impersonat\w*|view.*(?:password|pin|secret))\b/))return result('__unsupported__','That integration, irreversible operation, or access bypass is not registered');
        if(has(/\b(?:attendance|biometric|facial recognition|gps tracking|gps location|live location|track.*location|video surveillance|cctv|keycard|hotel reservations? online|booking website|tax filing|national income tax|income taxes|income tax|tax returns?|taxes|tax payments?|property taxes?|passport renewal|visa|immigration office|inventory purchasing|supermarket ordering|delivery application|currency converter|currency exchange|government (?:form|permit)|business permit|health records?|health database|allergies|medical database|housekeeping scheduling|housekeeping tasks?|housekeeping robot|robotic housekeeping|cleaner scheduling|room (?:rates?|pricing)|accommodation.rate|accommodation rate|accommodation deposits?|nightly|retail (?:sale|shop)|walk.in retail|sell (?:stocks|groceries|lottery|retail)|lottery|et?sy|facebook|instagram|social media|top up|top.up|wallet balance|live feeds?|security cameras?|security camera|smart (?:lights?|lighting|locks?)|electronic door|elevator|physical fire alarm|fire alarm|weather radar|weather forecast|parking cameras?|share.market|market trading|financial trading|plane tickets?|airport taxi|automatically reserve|welcome message|text.*guest|online credit.card|credit.card charge|payment wallet|directly accept.*gcash|withdraw real money|transfer cash|bank account|utility bill payment|electronic lock|hardware control|remotely.*(?:program|unlock|lock)|refund|financial transactions? permanently)\b/))return result('__unsupported__','Not part of the verified SmartHelp capabilities');
        if(has(/\b(?:delete|erase|wipe|purge|permanently remove)\b/) && has(/\b(?:the previous one|that one|it|this one|the other one)\b/) && !has(/\b(?:employee|staff|room|order|audit|receipt|menu|ticket|table|payment|charge)\b/))return result('__clarify__','Which record are you referring to?');
        if(has(/\b(?:delete|erase|wipe|purge|permanently remove)\b/) && !has(/\b(?:without|rather than|instead of|not|never)\b.{0,35}\b(?:delete|erase|wipe|purge|remove)\b/))return result('__unsupported__','Permanent deletion is not a verified workflow');
        // Only a very narrow, read-only repeat of an already authorized
        // instruction can reuse prior context. Never infer the object of an
        // action from 'it', 'that', 'the other one', etc.
        if(has(/^(?:can you )?(?:repeat|show|explain|summari[sz]e) (?:those|the|your|that|same) (?:steps|instructions|procedure)(?: again)?\??$|^(?:what were (?:those|the) steps\??)$/)){
            if(context?.id && context.employeeId===String(employee()?.id||'') && context.role===role && smart743ById.has(context.id)){
                return result(context.id,'Explicit repeat of the previously verified, same-role answer','verified-context-repeat');
            }
            return result('__clarify__','No authorized prior procedure to repeat');
        }
        if(/^(?:which record should i select|do i click the left or right button)\??$/.test(q))return result('__clarify__','Please identify the specific record or screen control');
        // Ambiguous standalone follow-ups remain ambiguous even if the previous
        // question happened to mention an object: do not invent a new action.
        if(has(/^(?:i clicked the wrong thing.*|can i undo what we just did|which setting should i use|can you open the previous screen|what exactly is wrong here|should i press confirm now|can we change the amount|why is the count different|i clicked the wrong thing|how do i complete the remaining part|can you restore the previous value|which department should i go to instead|does that change the price|which record are you talking about|can we finish the process from here|where is the correct confirmation button|how do i clear the last entry|can we change the amount there|where do i view its previous version|can another coworker do the same action)\??$|^(?:what about (?:that|the other|this)|do it again|how do i (?:do|fix|change|stop|reverse|enable|remove|add) (?:it|that|this|the other one)|can i (?:undo|reverse|delete|change) (?:it|that)|the (?:other|same) one|why did it fail|where is it|and (?:now|then)\??)[?.!]*$/))return result('__clarify__','Which specific resortOS record and operation do you mean?');
        const employeeObj=has(/\b(?:employees?|staff|workers?|cashier|receptionist|operator|teammate|coworker|server|waiter|clerk|team member|users?|login|credentials?|accounts?|personnel|workforce|hire|hired|someone|usual role|department privileges)\b/);
        const receiptObj=has(/\b(?:receipt|receipts|acknowledg\w*|printed slips?|customer slips?|first print|printout|print preview|proof of payment|proof of settlement|print was lost|duplicate using.*transaction|receipt template|receipt layout|reprint|printed transaction)\b/);
        const paymentObj=has(/\b(?:payment|paid|pay|tender|cash|amount received|settlement|balance|outstanding|transaction|gcash)\b/);
        const discountObj=has(/\b(?:discount|concession|senior citizen|pwd|vat exemption|reduction)\b/);
        const stayObj=has(/\b(?:guest|stay|arrival|check.?in|check.?out|departure|departing|occupant|reception|front desk)\b/);
        const roomObj=has(/\b(?:room|rooms|occupancy|vacant|occupied|accommodation)\b/);
        const foodObj=has(/\b(?:restaurant|food|meal|dish|diner|dining|table|order|cart|bill|dessert|drinks?|server)\b/);
        const issue=has(/\b(?:refus\w*|not reducing|remains occupied|reports an issue|error|failed?|failing|reject\w*|invalid|unavailable|unable|can.t|cannot|won.t|doesn.t|not work\w*|not showing|missing|blank|stuck|broken|problem|wrong|unpaid|unsettled|disabled|grayed|greyed|did not|nothing happens|does nothing|uncertain|freeze|froze)\b/);
        const found=[];
        const add=(id,actionEvidence)=>{if(smart743ById.has(id)&&!found.some(x=>x.id===id))found.push({id,actionEvidence});};
        if(employeeObj){
            if(has(/\b(?:reactivat\w*|re.?enable|enable.*(?:previously|disabled|inactive)|restore\w*|reinstate\w*|resume\w*|returning|returned|back from leave|back at work|sign in again|access again|activate again)\b/) && has(/\b(?:inactive|disabled|suspended|former|previous|back|returning|returned|reinstat\w*|reactivat\w*|again|leave|restore\w*)\b/))add('employee.activate','reactivate');
            else if(has(/\b(?:deactivat\w*|disable\w*|suspend\w*|revoke\w*|prevent.*access|resigned|terminated|former|ex.employee|left the company|no longer (?:log|sign)|block.*(?:login|account|access)|switch.*access.*off)\b/))add('employee.deactivate','deactivate');
            else if(has(/\b(?:permissions?|privileges?|access to|access for|reception access|grant.*access|authorized?|which workspaces?|both (?:departments|workspaces|front desk)|assign.*department|change.*role|change.*access|cover reception)\b/) && !has(/\b(?:new hire|new employee|new worker|new staff|first sign.in|onboard|create.*account)\b/))add('employee.permissions','permissions');
            else if(has(/\b(?:list|directory|roster|find|search|see|browse|view|look up|locate|existing|registered|which section|which screen|current list|confirm.*active)\b/) && has(/\b(?:staff|employees?|workers?|users?|software accounts?|accounts?|profiles?|directory|roster)\b/) && !has(/\b(?:new|create|add|onboard|audit|system log)\b/))add('employee.find','find');
            else if(has(/\b(?:new hire|new employee|new staff|new worker|new team member|new receptionist|new cashier|new kitchen|new desk clerk|hired|starting (?:work|on monday)|first.*(?:login|sign.in)|create.{0,22}(?:account|user|login|credentials?|staff|employee)|add\s+(?:an? |new |another )?(?:employee|worker|staff|cashier|account)|onboard|provision|register.*(?:employee|staff|worker)|enroll.*(?:staff|worker)|needs? (?:an? )?(?:account|first.*sign.in|login|access to the application))\b/))add('employee.create','create');
        }
        if(receiptObj){
            if((issue || has(/\b(?:white|empty|unresponsive|no response|does not|not open|not printing|before retrying|nothing occurs)\b/)) && has(/\b(?:print|printer|reprint|receipt|preview|popup|window|acknowledg)\b/) && !has(/\b(?:old|lost|previous)\b.*\b(?:receipt|printed|print)\b.*\b(?:reprint|again)\b/))add('receipt.error','troubleshoot');
            else if(has(/\b(?:design|layout|builder|template|rearrang\w*|position|align|move.*(?:block|total|footer|field)|customiz\w*|visually|print elements?|80 ?mm)\b/))add('receipt.builder','design');
            else if(has(/\b(?:resort (?:name|address|phone|telephone)|property (?:name|address|phone)|outdated resort address|contact (?:number|details)|branding|logo|header details|receipt settings|default paper|business (?:name|information|phone|address))\b/) && has(/\b(?:change|changes|changed|update|updated|edit|configure|set|show|print|manage|where)\b/))add('receipt.settings','settings');
            else if(has(/\b(?:reprint|again|once more|another copy|duplicate|second copy|retrieve|retrieved|history|lost|previous|earlier|yesterday|past|already issued|old receipt|printed record)\b/))add('receipt.reprint','reprint');
        }
        if(has(/\b(?:payment methods?|payment options?|tender options?|tender classification|tender|bank transfer|cashless|gcash method|e.wallet|method of payment|selectable payment|cash classification|non.cash)\b/) && has(/\b(?:add|new|create|configure|enable|set|update|manage|edit|activate|choice|selectable|dropdown|adjust|where|classify|classification|switch|change)\b/))add('payment.method','payment-method-config');
        else if(paymentObj && issue && has(/\b(?:payment|paid|pay|amount|tender|transaction|balance|settlement|checkout)\b/) && (!/\bunpaid\b/.test(q)||/\b(?:still|shows|even though|not recorded|error|reject|invalid|failed)\b/.test(q)))add('payment.error','payment-troubleshoot');
        else if(paymentObj && has(/\b(?:record|document.*collection|handed over cash|cash handed over|collect|settle|register|mark.*paid|cash received|payment received|entered|received|part.*(?:payment|balance)|partial payment|paid cash|complete.*payment|how.*pay)\b/) && !has(/\b(?:refund|automatic|online|credit card charge|bank transfer money)\b/))add('payment.record','payment-record');
        if(discountObj){
            if(issue)add('discount.error','discount-troubleshoot');
            else if(has(/\b(?:apply|enter|use|give|grant|qualif\w*|eligible|select|before.*payment|reduction)\b/) && !has(/\b(?:promotion|promotional|seasonal)\b/))add('discount.apply','discount-apply');
        }
        if(has(/\b(?:promotion|promo|promotional|seasonal offer|seasonal deal|seasonal dining offer|campaign)\b/) && has(/\b(?:manage|new|create|edit|adjust|dates?|update|deactivate|disable|pause|expired|activate|expiry|expiration|configure|set|change)\b/))add('promotion.manage','promotion-manage');
        if(stayObj || roomObj){
            if(has(/\b(?:check.?out|checkout action|departure|departing|leaving|guest leaves|release.*room|finish.*stay|end.*stay|finaliz\w*.*stay|close.*stay)\b/) && has(/\b(?:unpaid|unsettled|blocked|can.t|cannot|won.t|failed?|error|not.*vacant|remains occupied|occupied.*when|reports an issue|stuck|disabled|unable|reject\w*)\b/))add('stay.checkout-error','checkout-troubleshoot');
            else if(has(/\b(?:check.?out|departure|departing|guest leaves|guest.*leaving|finish.*stay|end.*stay|release.*room|finaliz\w*.*stay|close.*stay)\b/) && (stayObj||roomObj))add('stay.checkout','checkout');
            else if(has(/\b(?:register.*(?:guest|stay|family)|check.?in|checks in|new guest|new stay|arriv\w*|assign.*(?:vacant|room)|link.*vacant room|record.*arrival|start.*stay|create.*guest occupancy|enter.*active stay|occupant.*new)\b/) && !has(/\b(?:without registering|without.*new guest|check.*vacancy.*without)\b/))add('stay.create','register-stay');
            else if(roomObj && has(/\b(?:vacant|vacancy|empty|occupied|room status|room overview|overview|occupancy|available rooms?|available units|room dashboard|rooms grid|availability|which rooms?|see.*rooms?|view.*rooms?|find.*rooms?)\b/) && !has(/\b(?:post|charge|add|register|create|deactivate|disable|manage|configure|inventory|catalog|check.?in)\b/))add('room.status','view-room-status');
            if(roomObj && has(/\b(?:add|create|configure|edit|manage|deactivate|disable|activate|new|renumber|record created|mark inactive|mark.*inactive)\b/) && has(/\b(?:room catalog|room inventory|room record|room manager|managed inventory|rooms? (?:number|numbering|listing)|accommodation unit|new room|add.*room|create.*room|manage.*room|deactivate.*room|disable.*room)\b/))add('room.create','manage-room');
        }
        if(has(/\b(?:additional (?:resort )?service|extra service|incidental service|service catalog|service pricing|service rate|service option|service type)\b/) && has(/\b(?:configure|manage|price|rate|define|create|edit|adjust|add.*(?:option|type|service)|change|set)\b/) && !has(/\b(?:guest|active stay|post.*room|charge.*room)\b/))add('service.manage','service-catalog');
        if(has(/\b(?:charge|fee|extra towels?|incidental|additional service|rental|equipment use|equipment|borrowed)\b/) && has(/\b(?:post|record|add|log|charge|borrowed|bill)\b/) && has(/\b(?:guest|stay|room|account|borrowed|active stay)\b/) && !has(/\b(?:food|restaurant|dining|order|meal|charge history|past charges|old charge)\b/))add('charge.post','post-guest-charge');
        if(foodObj){
            if(has(/\b(?:void|cancel|reverse|invalidate|invalidat\w*|wrong order|wrong dining ticket|duplicate order|erroneous order|incorrect order)\b/) && has(/\b(?:order|restaurant|food ticket|dining ticket)\b/))add('order.void','void-order');
            else if(has(/\b(?:existing order|current order|open order|already ordered|another (?:dish|item|dessert|plate|drink)|extra (?:dish|dessert|item|drinks?)|more (?:items|food|dishes|drinks)|increase.*quantity|add.*(?:existing|current|same|open).*order|append.*(?:order|item)|additional.*(?:item|food)|add it to.*order)\b/))add('order.additems','add-order-items');
            else if(has(/\b(?:post|put|add|charge|bill|transfer|attach|send|carried over|carry over)\b/) && has(/\b(?:room|stay|guest account|room account)\b/) && has(/\b(?:restaurant|food|meal|dinner|order|table|bill)\b/))add('order.roompost','post-food-to-room');
            else if(has(/\b(?:new order|start.*order|create.*order|open.*order|take.*order|place.*order|first.*order|fresh food bill|new food bill|fresh.*bill|order for.*table|begin.*(?:order|ticket|bill)|new.*food ticket)\b/))add('order.create','create-order');
        }
        if(has(/\b(?:tables?|dining tables?|restaurant tables?|table(?:s)? (?:in use|available|awaiting payment)|table status|table layout|table record|table manager|table \d+)\b/)){
            if(has(/\b(?:add|create|edit|rename|manage|configure|activate|deactivate|inactive|mark|set|new|set up)\b/) && (!has(/\b(?:order|bill|checkout|payment)\b/) || has(/\b(?:without erasing|without deleting|preserving history)\b/)))add('table.manage','manage-table');
            else if(has(/\b(?:status|available|occupied|in use|waiting|awaiting|filter|which|view|see|shows|open)\b/) && (!has(/\b(?:new order|create.*order|open.*order|start.*order|take.*order)\b/) || has(/\b(?:before taking|before opening|before creating)\b.*\b(?:new )?order\b/)))add('table.status','view-table-status');
        }
        if(has(/\b(?:menu|menu items?|food items?|dish(?:es)?|food catalog|food categories|menu category|dish price|dish description)\b/) && has(/\b(?:edit|edits|hide|mark.*inactive|inactive|unavailable|change|update|add|create|manage|adjust|deactivate|activate|pricing|photo|image|description|category|availability|price)\b/) && !has(/\b(?:existing order|current order|guest order|cart|add.*food.*order)\b/))add('menu.manage','manage-menu');
        if(has(/\b(?:audit|system log|activity log|action history|where.*logged|who.*(?:voided|changed|posted|settled|recorded)|historical changes|trace.*changes)\b/) && has(/\b(?:search|find|filter|inspect|review|see|view|trace|who|history|log|logged)\b/))add('audit.search','search-audit');
        if(has(/\b(?:support ticket|help ticket|issue ticket|support request|support case|support issue|assigned issue|broken chair|chair broke|broken equipment|maintenance request|malfunctioning appliance|report.*issue|support & issues?)\b/)){
            if(has(/\b(?:resolve|resolved|fixed|repaired|completed|close out|close.*(?:ticket|case|issue)|mark.*(?:resolved|closed)|finish.*ticket|change.*status)\b/))add('ticket.resolve','resolve-ticket');
            else if(has(/\b(?:create|open|submit|report|new|raise|file|ask|request|need.*maintenance)\b/))add('ticket.create','create-ticket');
        }
        if(has(/\b(?:notification|notifications|unread alert|alerts?|bell icon|bell|notification bell)\b/) && has(/\b(?:view|read|see|check|find|latest|unread|open|where|show|showing)\b/))add('notification.view','view-notifications');
        if(found.length===0){
            const familiar=has(/\b(?:resortos|admin|front desk|restaurant|employee|staff|receipt|payment|discount|order|room|stay|ticket|table|menu|charge|audit|notification|service|promotion|account|checkout|guest|printer|cashier)\b/);
            return result(familiar||boundary?.status==='clarify'||scope?.status==='clarify'?'__clarify__':'__unsupported__',familiar?'A verified object and operation could not both be established':'No verified capability for this request');
        }
        if(found.some(x=>x.id==='payment.record') && has(/\b(?:as paid|settled|record.*paid|part.*balance|collection|cash received|handed over cash)\b/)){
            for(let i=found.length-1;i>=0;i--)if(found[i].id==='charge.post')found.splice(i,1);
        }
        if(found.some(x=>x.id==='table.status') && has(/\b(?:before taking|before creating|before opening)\b.*\b(?:order|bill)\b/)){
            for(let i=found.length-1;i>=0;i--)if(found[i].id==='order.create')found.splice(i,1);
        }
        if(found.some(x=>x.id==='room.create') && has(/\b(?:room record|room inventory|room catalog|managed inventory|unavailable room)\b/)){
            for(let i=found.length-1;i>=0;i--)if(found[i].id==='stay.checkout')found.splice(i,1);
        }
        // If an action is explicitly a named subtype, suppress less specific
        // candidates whose broad words ('payment', 'room', 'table') overlap it.
        const specific=['receipt.error','receipt.builder','receipt.settings','payment.method','payment.error','discount.error','stay.checkout-error','order.roompost','order.additems','order.void','ticket.resolve','order.create','charge.post','room.create','stay.create','ticket.create','audit.search'];
        const top=found.find(x=>specific.includes(x.id));
        if(top){
            const incompatible=found.filter(x=>x.id!==top.id && ![
                'receipt.error:payment.record','receipt.error:receipt.reprint','receipt.error:payment.error',
                'payment.method:payment.record','payment.method:employee.create','payment.error:payment.record',
                'discount.error:discount.apply','stay.checkout-error:stay.checkout',
                'order.roompost:charge.post','order.roompost:room.status','order.roompost:stay.checkout',
                'order.additems:menu.manage','order.additems:order.create',
                'order.void:ticket.create','order.void:audit.search','ticket.resolve:ticket.create',
                'order.create:table.status','charge.post:room.status','charge.post:payment.record',
                'room.create:room.status','stay.create:room.status','stay.create:room.create','ticket.create:table.status','audit.search:employee.find'
            ].includes(top.id+':'+x.id));
            if(incompatible.length===0){found.splice(0,found.length,top);}
        }
        if(found.length===0 && (boundary?.status==='clarify'||scope?.status==='clarify'))return result('__clarify__','Please identify the task or record');
        // Never pick the first plausible workflow if evidence points to more than one.
        if(found.length!==1)return result('__clarify__','Multiple different supported tasks fit this question; specify one operation');
        const selected=found[0];
        const contradiction=smart743ObjectGate(q,selected.id);
        if(contradiction)return result('__unsupported__',contradiction.reason);
        const audit=smart743RegistryAudit();
        if(!audit.valid)return result('__unsupported__','Verified capability registry consistency failed');
        const certified=smart743ArticleFor(selected.id);
        if(!certified)return result('__unsupported__','No approved help article exists for this operation');
        return {...result(selected.id,'Verified object + '+selected.actionEvidence+' action and approved '+certified.article.id,'verified-object-action'),evidence:{object:certified.capability.object,action:selected.actionEvidence,articleId:certified.article.id,workspace:certified.workspace,registryVersion:'7.4.3'},restricted:certified.restricted};
    }
    function smart744AnswerFor(decision){
        if(!decision?.id||decision.id.startsWith('__'))return null;
        const certified=smart743ArticleFor(decision.id);
        if(!smart743RegistryAudit().valid||!certified||decision.evidence?.articleId && decision.evidence.articleId!==certified.article.id)return null;
        const intent=smartIntentDefinitions.find(x=>x.id===decision.id);
        return intent?{article:certified.article,intent,source:decision.source,verifiedCapability:decision.id,evidence:decision.evidence,restricted:certified.restricted,workspaceSwitch:!certified.restricted&&role!==certified.article.role}:null;
    }
    // PHASE 7.4.4 SAFETY POLICY END

    function smart743ArticleFor(id,requestedRole=role){
        const capability=smart743ById.get(id);
        if(!capability || capability.review!=='source-audited')return null;
        const explicit=capability.roles.includes(requestedRole)?requestedRole:null;
        const permitted=explicit||(capability.roles.find(workspace=>hasAccess(workspace))||null);
        const workspace=permitted||capability.roles[0];
        const articleId=capability.articles[workspace];
        const article=HELP_ARTICLES.find(a=>a.id===articleId && a.role===workspace && Array.isArray(a.steps) && a.steps.length>0);
        return article?{article,capability,workspace,restricted:!hasAccess(workspace)}:null;
    }
    function smart743RegistryAudit(){
        const failures=[];const intents=new Set(smartIntentDefinitions.map(intent=>intent.id));
        const duplicateIds=new Set();const seen=new Set();
        for(const cap of smart743Registry){
            if(seen.has(cap.id))duplicateIds.add(cap.id);
            seen.add(cap.id);
            if(!intents.has(cap.id))failures.push(`${cap.id}: no intent definition`);
            for(const workspace of cap.roles){
                const article=HELP_ARTICLES.find(a=>a.id===cap.articles[workspace]&&a.role===workspace);
                if(!article || !Array.isArray(article.steps) || !article.steps.length)failures.push(`${cap.id}: missing validated ${workspace} article`);
            }
        }
        for(const id of intents)if(!smart743ById.has(id))failures.push(`${id}: not reviewed / default deny`);
        for(const id of duplicateIds)failures.push(`${id}: duplicate capability`);
        return {version:'7.4.4',registered:smart743Registry.length,reviewed:smart743Registry.filter(x=>x.review==='source-audited').length,failures,valid:failures.length===0};
    }
    // Explicit object mentions can veto a misleading task-family match.
    // A generic verb ("deactivate", "post") is not sufficient to select its object.
    function smart743ObjectGate(question,id){
        const cap=smart743ById.get(id);
        if(!cap)return {id:'__unsupported__',reason:'No reviewed registry entry exists for this task',source:'registry'};
        const q=String(question||'').toLowerCase().replace(/[’]/g,"'");
        const targets=[
            ['employee',/\b(?:employee|staff member|staff account|worker|receptionist|user account|user login|personnel|employee credentials?)\b/],
            ['table',/\b(?:dining table|restaurant table|table \d+|tables?|table record)\b/],
            ['room',/\b(?:rooms?|room \d+|room record|occupancy|vacant)\b/],
            ['receipt',/\b(?:receipts?|reprints?|acknowledg(?:ement|ment)s?|receipt layout|receipt preview)\b/],
            ['discount',/\b(?:discounts?|vat exemption|pwd concession|senior citizen concession)\b/],
            ['menu',/\b(?:menu item|food menu|menu categor(?:y|ies)|dish|dishes)\b/],
            ['service_catalog',/\b(?:additional service(?:s)? catalog|extra service catalog|service catalog|service rate|service pricing)\b/],
            ['ticket',/\b(?:support ticket|issue ticket|support issue|support request)\b/]
        ].filter(([,re])=>re.test(q)).map(([target])=>target);
        // Only veto a UNIQUE and explicit target that conflicts with the proposed task.
        if(targets.length===1 && targets[0]!==cap.object){
            const allowed={
                order:['table','room','menu'], stay:['room'], payment:['receipt','room'],
                charge:['room','service_catalog'], receipt:['payment'],
                service_catalog:['room'], employee:[], room:['stay'],
                ticket:['table','room','receipt','employee','menu','service_catalog'], table:[], menu:[], discount:[], audit:['room','receipt','employee','table','payment']
            };
            if(!(allowed[cap.object]||[]).includes(targets[0]))return {id:'__unsupported__',reason:'The selected task applies to a different object than the one requested',source:'registry-object-check'};
        }
        // Reject destructive catalog deletion: these records have active/inactive lifecycle.
        if(/\b(?:delete|erase|purge|permanently remove|wipe)\b/.test(q) && /\b(?:employee|staff|room|table|menu|service|payment method|audit|history|receipt)\b/.test(q) && !/\b(?:without|instead of|rather than|do not|don't|not) (?:\w+ ){0,4}(?:delete|erasing|deleting|removing)\b/.test(q)){
            return {id:'__unsupported__',reason:'Permanent deletion is not a verified resortOS operation',source:'registry-action-check'};
        }
        return null;
    }
    function smart743ValidateDecision(question,decision){
        if(!decision || decision.id?.startsWith('__'))return decision;
        const boundary=smart74Boundary(question,'');
        if(boundary)return {id:boundary.status==='clarify'?'__clarify__':'__unsupported__',reason:boundary.reason,source:'registry-boundary'};
        if(/\b(?:unlock|lock|open|control|operate|switch|turn on|turn off)\b.{0,60}\b(?:door|physical lock|smart light|lights|camera|cctv|thermostat|iot device)\b/i.test(question))return {id:'__unsupported__',reason:'Physical device control is not a verified resortOS capability',source:'registry-physical-boundary'};
        const audited=smart743RegistryAudit();
        if(!audited.valid)return {id:'__unsupported__',reason:'Capability registry validation failed; unsafe to recommend a guide',source:'registry'};
        const article=smart743ArticleFor(decision.id);
        if(!article)return {id:'__unsupported__',reason:'Task has no verified help article for the mapped capability',source:'registry'};
        return smart743ObjectGate(question,decision.id)||{...decision,verifiedCapability:article.capability.id};
    }
    function smart743RegistryMarkup(){
        const audit=smart743RegistryAudit();
        const rows=smart743Registry.map(cap=>`<tr><td><code>${esc(cap.id)}</code></td><td>${esc(cap.object)} / ${esc(cap.action)}</td><td>${esc(cap.roles.join(', '))}</td><td><code>${esc(cap.codeAnchor)}</code></td></tr>`).join('');
        return `<section class="smart72-section"><div class="smart2-screen-title"><span class="smart2-eyebrow">PHASE 7.4.3 · CAPABILITY REGISTRY</span><h2>Verified help capabilities</h2><p>Reviewed action anchors and help-article mappings; this is NOT server-side authorization or proof of production readiness.</p></div><div class="smart71-notice">${audit.valid?'Registry consistency PASS':'Registry consistency FAILED'} · ${audit.registered} entries · ${audit.failures.length} failures. Unlisted tasks default to no operational guide. This registry checks workflow identity and documentation, not backend security.</div>${audit.failures.length?`<div class="smart71-error">${esc(audit.failures.join(' · '))}</div>`:''}<div style="overflow:auto;max-height:330px"><table class="table"><thead><tr><th>Intent</th><th>Object / Action</th><th>Allowed workspace</th><th>Code evidence</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
    }

    const smartSemanticModelId = 'onnx-community/all-MiniLM-L6-v2-ONNX';
    const smartSemanticModelModule = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';
    const smartSemanticPhrases = {
        'employee.create':['How do I add another staff member to the system?','We hired a new cashier, how do I make their login?','Set up an account for a new colleague'],
        'employee.deactivate':['How can I stop a former employee from using the system?','Disable an employee who has left','Turn off access for a departing staff member'],
        'employee.activate':['How do I reactivate a previously disabled employee?','Bring a staff account back online','Let an inactive employee work again'],
        'employee.permissions':['How do I give someone access to both departments?','Change an employee role or access rights','Allow a cashier to work in the other dashboard'],
        'employee.find':['Where can I see our employee directory?','List all active accounts','Find a staff member in the system'],
        'receipt.builder':['How do I move things around on a printed receipt?','Customize the receipt design or template','Edit the printed bill layout using the receipt builder'],
        'receipt.settings':['How do I change our receipt header and business information?','Edit receipt branding and footer text','Configure receipt printing defaults'],
        'receipt.reprint':['Where can I print a receipt from yesterday again?','Look up a previous customer receipt','Reprint an already recorded payment acknowledgement'],
        'receipt.error':['Why is my receipt not printing or displaying?','The printer or preview does not work','I cannot open a saved receipt'],
        'payment.method':['How do I configure which payment types staff can use?','Enable GCash or bank transfer as a payment method','Set up cash and non-cash methods'],
        'payment.error':['Why is the cashier unable to record payment?','Payment amount rejected during checkout','The amount received or payment method is invalid'],
        'payment.record':['How do I collect and record money the guest already paid?','Settle outstanding guest charges with cash or GCash','Record a partial payment at the counter'],
        'discount.apply':['How can I give a senior citizen or PWD discount?','Apply a qualified statutory discount at checkout','Discount the bill for an eligible customer'],
        'discount.error':['Why does the discount refuse to apply?','My PWD discount is rejected','The senior discount calculation is not working'],
        'promotion.manage':['Create a restaurant promotion or sale','Change an active promotion rule','Set up promotional discounts in admin'],
        'stay.create':['How do I register a guest checking into a room?','A visitor arrived and needs a stay','Put an arriving guest into a vacant room'],
        'stay.checkout':['How do I check someone out?','A guest is leaving, how do I complete their checkout?','How to end a guest stay and free their room?','The visitor wants to leave the resort, finish their stay'],
        'stay.checkout-error':['Why can’t I check out this guest?','Checkout is blocked by an unpaid incidental balance','The guest cannot leave because charges remain'],
        'room.status':['Which rooms are occupied or vacant?','Where can I check room availability?','Show the room occupancy grid'],
        'room.create':['How do I add or deactivate a room in admin?','Register a new room number','Maintain the active room inventory'],
        'charge.post':['How do I put an extra service charge on a guest room?','Add towel rental to the active stay','Post an incidental charge to the room'],
        'order.create':['How do I start taking a restaurant order for a table?','Open a new dining order','Customer is seated, start their food order'],
        'order.additems':['The table wants more food; how do I add it?','Append menu items to the existing open order','Change an active restaurant cart to include another meal'],
        'order.void':['How do I void an incorrect restaurant order?','Cancel a mistaken order with a reason','Reverse a wrongly posted food order'],
        'order.roompost':['How do I charge a restaurant meal to the guest room?','Transfer a restaurant bill to a staying guest','Put their table order on their room account'],
        'table.manage':['Admin wants to add or disable a restaurant table','Configure the dining table list','Change which tables are active'],
        'table.status':['How can I tell if a table is occupied or awaiting payment?','Check available tables in the dining area','View current restaurant table status'],
        'menu.manage':['How do I update restaurant menu prices or photos?','Create a new meal in the menu catalog','Manage food categories and inactive dishes'],
        'service.manage':['Configure extra service rental prices in the catalog','Admin needs to add a new resort service','Manage the additional charges catalog'],
        'audit.search':['Who changed or voided a record yesterday?','Where can I inspect the audit trail?','Check which employee posted a transaction'],
        'ticket.create':['How do I report something broken to management?','Create a help request or support ticket','Ask administration to fix a workplace issue'],
        'ticket.resolve':['How does Admin mark a support issue resolved?','Close a completed support ticket','Finish and resolve an assigned issue'],
        'notification.view':['Where do I find the system notification bell?','Check unread alerts and updates','View messages about support changes']
    };
    let smartSemanticExtractor=null, smartSemanticLoad=null, smartSemanticIndex=null, smartSemanticIndexLoad=null;
    let smartSemanticState='idle',smartSemanticMessage='',smartSemanticSource='',smartSemanticRunId=0;
    const smartSemanticDebugFlag=new URLSearchParams(window.location.search).get('smarthelp_debug')==='1';
    const smartSemanticDebugEnabled=()=>smartSemanticDebugFlag&&employee()?.role==='admin';
    let smartSemanticLastRanking=null;
    let smartSemanticDiagnosticsBusy=false;
    let smartSemanticDiagnosticsResult=null;
    let smartSemanticModelTiming=null;
    let smartSemanticEmbeddingDimension=0;
    let smartSemanticError='';
    function smartSemanticDebugSnapshot(){
        return {
            version:'7.2', model:smartSemanticModelId,library:smartSemanticModelModule,backend:'wasm',
            modelLoaded:!!smartSemanticExtractor,indexReady:!!smartSemanticIndex,
            indexSize:smartSemanticIndex?.length||0, dimension:smartSemanticEmbeddingDimension||null,
            modelLoadMs:smartSemanticModelTiming,
            answerSource:smartSemanticSource||'none',state:smartSemanticState,
            latestRanking:smartSemanticLastRanking,
            selfTest:smartSemanticDiagnosticsResult,
            lastError:smartSemanticError||null
        };
    }
    async function smartSemanticInspectCache(){
        if(!('caches' in window))return {available:false,matchingFiles:null};
        try{
            const names=await window.caches.keys();
            let count=0;
            for(const name of names.filter(x=>/transformers/i.test(x)).slice(0,8)){
                const cache=await window.caches.open(name);
                const keys=await cache.keys();
                count+=keys.filter(x=>x.url.includes(smartSemanticModelId)).length;
            }
            return {available:true,matchingFiles:count,notes:'Matching entries found in accessible Transformers.js Cache Storage. A zero count does not prove files were not cached elsewhere.'};
        }catch(e){return {available:true,matchingFiles:null,notes:'Cache inspection unavailable in this browser.'};}
    }
    async function smartSemanticDiagnosticsRun(){
        if(!smartSemanticDebugEnabled()||smartSemanticDiagnosticsBusy)return;
        smartSemanticDiagnosticsBusy=true;
        smartSemanticDiagnosticsResult={status:'running'};
        helpRenderRoot();
        try{
            const start=performance.now();
            const rows=await smartSemanticPrepare();
            const probes=[
                {text:'How do I check someone out?',expected:'stay.checkout'},
                {text:'How can I print yesterday’s receipt again?',expected:'receipt.reprint'},
                {text:'Can I create an account for a new cashier?',expected:'employee.create'},
                {text:'How can I post a dinner bill to a room?',expected:'order.roompost'}
            ];
            const vectors=await smartSemanticEmbed(probes.map(x=>x.text));
            const samples=probes.map((probe,i)=>{
                const rankings=smartSemanticRankScores(smartSemanticScores(rows,vectors[i])).slice(0,3);
                const norm=Math.sqrt(vectors[i].reduce((sum,v)=>sum+v*v,0));
                return {expected:probe.expected,top:rankings[0]?.id||null,topThree:rankings.map(x=>({id:x.id,score:Number(x.score.toFixed(4))})),vectorNorm:Number(norm.toFixed(4)),vectorFinite:vectors[i].every(Number.isFinite),expectedTop:rankings[0]?.id===probe.expected};
            });
            smartSemanticDiagnosticsResult={
                status:samples.every(x=>x.vectorFinite&&x.vectorNorm>0.9&&x.vectorNorm<1.1)?'verified':'needs-review',
                actualInference:true,dimension:smartSemanticEmbeddingDimension,
                checkedAt:new Date().toISOString(),elapsedMs:Math.round(performance.now()-start),
                sampleTopOneMatches:samples.filter(x=>x.expectedTop).length,
                sampleTotal:samples.length,samples,cache:await smartSemanticInspectCache()
            };
            smartSemanticError='';
        }catch(e){
            smartSemanticError=String(e?.message||e).slice(0,180);
            smartSemanticDiagnosticsResult={status:'failed',actualInference:false,error:smartSemanticError};
        }finally{smartSemanticDiagnosticsBusy=false;if(helpMode==='panel'&&smartView==='diagnostics')helpRenderRoot();}
    }
    let smart72Error='';
    let smart72Busy=false;
    let smart72Cancel=false;
    let smart72Result=null;
    let smart72Progress={done:0,total:0,split:''};
    const smart72DatasetFile='./phase72_benchmark_questions.json';
    const smart74ChallengeFile='./phase74_safety_challenge.json';
    const smart742BlindDatasetFile='./phase742_blind_evaluation.json';
    const smart743SealedDatasetFile='./phase743_sealed_evaluation.json';
    const smart72CodeVersion='7.4.4-safety-enforcement-v1';
    function smart72LabelFor(question,found){
        const routeResult=smartNlpRoute(question,'');
        if(routeResult?.status==='clarify')return '__clarify__';
        if(routeResult?.status)return '__unsupported__';
        if(!found)return '__unsupported__';
        return found.intent?.id||'__article__';
    }
    function smart72Check(expected,prediction){return expected===prediction;}
    function smart72Stats(rows,method){
        const total=rows.length;
        const correct=rows.filter(x=>x.predictions[method]===x.expected).length;
        const supported=rows.filter(x=>!x.expected.startsWith('__'));
        const supportedCorrect=supported.filter(x=>x.predictions[method]===x.expected).length;
        const negative=rows.filter(x=>x.expected==='__unsupported__');
        const rejected=negative.filter(x=>x.predictions[method]==='__unsupported__').length;
        const ambiguous=rows.filter(x=>x.expected==='__clarify__');
        const clarified=ambiguous.filter(x=>x.predictions[method]==='__clarify__').length;
        return {total,correct,accuracy:total?Number((100*correct/total).toFixed(2)):null,
            supported:{total:supported.length,correct:supportedCorrect,accuracy:supported.length?Number((100*supportedCorrect/supported.length).toFixed(2)):null},
            unsupported:{total:negative.length,rejected},ambiguous:{total:ambiguous.length,clarified},
            wrongCount:total-correct};
    }
    function smart72Snapshot(){
        const r=smart72Result;
        if(!r)return null;
        return {schema:'resortOS-phase72-evaluation-report',version:smart72CodeVersion,
            generatedAt:r.generatedAt,datasetSha256:r.datasetSha256,datasetSplit:r.split,
            complete:r.complete,actualInference:r.actualInference,availableMethods:r.availableMethods||['classic','semantic','hybrid'],model:smartSemanticModelId,
            modelEmbeddingDimension:smartSemanticEmbeddingDimension,indexSize:smartSemanticIndex?.length||0,
            modelBackend:'wasm',elapsedMs:r.elapsedMs,metrics:r.metrics,
            annotationCaveat:'Exact task labels are a proxy for employee-facing factual answer and guide quality. Synthetic benchmark, not a real-world 99% reliability claim.',
            rows:r.rows};
    }
    function smart72Markup(){
        if(!smartSemanticDebugEnabled())return '';
        const busy=smart72Busy, r=smart72Result,reviewMethod=r?.availableMethods?.includes('hybrid')?'hybrid':'classic';
        const btns=`<div class="smart71-toolbar smart72-toolbar"><button type="button" class="smart-btn" data-action="help-benchmark-classic" data-id="development" ${busy?'disabled':''}>Quick classical baseline</button><button type="button" class="smart-btn smart-primary" data-action="help-benchmark-run" data-id="development" ${busy?'disabled':''}>Run development set (428)</button><button type="button" class="smart-btn" data-action="help-benchmark-run" data-id="holdout" ${busy?'disabled':''}>Run previously evaluated holdout (172)</button><button type="button" class="smart-btn smart-primary" data-action="help-benchmark-run" data-id="safety" ${busy?'disabled':''}>Run Phase 7.4.2 safety suite (123)</button><button type="button" class="smart-btn smart-primary" data-action="help-benchmark-run" data-id="blind" ${busy?'disabled':''}>Run previously evaluated blind set (144)</button><button type="button" class="smart-btn smart-primary" data-action="help-benchmark-run" data-id="sealed" ${busy?'disabled':''}>Run previously sealed set (132)</button>${busy?'<button type="button" class="smart-btn" data-action="help-benchmark-stop">Stop after batch</button>':''}</div>`;
        const status=busy?`<div class="smart72-progress" role="status"><strong id="smart72-progress">Running ${smart72Progress.split}: ${smart72Progress.done}/${smart72Progress.total}</strong><div class="smart72-track"><span id="smart72-track" style="width:${smart72Progress.total?Math.floor(smart72Progress.done/smart72Progress.total*100):0}%"></span></div><small>Real MiniLM inference. Nothing is posted or saved to operational records.</small></div>`:'';
        const stats=r?`<div class="smart71-results"><h3>${esc(r.split==='holdout'?'Previously evaluated holdout':r.split==='safety'?'Safety regression':r.split==='blind'?'Previously examined blind':r.split==='sealed'?'Previously sealed (regression)':'Development')} evaluation ${r.complete?'complete':'stopped'}</h3><p>${r.rows.length} questions processed · actual model inference ${r.actualInference?'yes':'no'} · ${Math.round(r.elapsedMs/1000)} s</p><div class="smart72-scores">${(r.availableMethods||['classic','semantic','hybrid']).map(name=>`<div><small>${name==='classic'?'Classical NLP':name==='semantic'?'MiniLM only':'Hybrid router'}</small><strong>${r.metrics[name].accuracy===null?'—':r.metrics[name].accuracy+'%'}</strong><span>${r.metrics[name].correct}/${r.metrics[name].total} exact expected outcomes</span><small>Supported: ${r.metrics[name].supported.correct}/${r.metrics[name].supported.total}</small><small>Unsupported abstention: ${r.metrics[name].unsupported.rejected}/${r.metrics[name].unsupported.total}</small><small>Ambiguity clarification: ${r.metrics[name].ambiguous.clarified}/${r.metrics[name].ambiguous.total}</small></div>`).join('')}</div><div class="smart71-toolbar"><button type="button" class="smart-btn smart-primary" data-action="help-benchmark-download">Download full JSON report</button><button type="button" class="smart-btn" data-action="help-benchmark-copy">Copy summary</button></div><h3>Examples needing review (${reviewMethod==='hybrid'?'hybrid':'classical'})</h3>${r.rows.filter(x=>x.predictions[reviewMethod]!==x.expected).slice(0,12).map(row=>`<div class="smart72-failure"><strong>${esc(row.question)}</strong><small>Expected: ${esc(row.expected)} · ${reviewMethod==='hybrid'?'Hybrid':'Classical'}: ${esc(row.predictions[reviewMethod])}${r.availableMethods?.includes('semantic')?` · Model top: ${esc(row.predictions.semantic)} (${Number(row.semanticTopScore||0).toFixed(3)})`:''}</small></div>`).join('')||'<p>No incorrect hybrid labels in this split.</p>'}<small>Download the JSON for all mistakes and top-three candidates. The 600-question historical benchmark and 123-question safety suite have already been examined; the 132-question previously sealed set is no longer an independent release test.</small></div>`:'';
        return `<section class="smart72-section"><div class="smart2-screen-title"><span class="smart2-eyebrow">PHASE 7.4.4 · SAFETY ENFORCEMENT</span><h2>Decision engine benchmark</h2><p>Compare baseline NLP, MiniLM, and registry-verified task decisions. The old sealed set is now regression-only, not independent Phase 7.4.5 evidence. Results measure labeled task decisions, not answer correctness or production safety.</p></div><div class="smart71-notice">Historical benchmark: 600 questions (428 development, 172 previously examined holdout). Phase 7.4 safety regression: 123 questions (33 supported, 60 unsupported, 30 ambiguous). Previously evaluated blind set: 144 questions. PREVIOUSLY SEALED set: 132 questions (66 supported, 42 unsupported, 24 ambiguous). Model example index never reads benchmark questions. <strong>Scores evaluate matching, not full instruction quality.</strong></div>${btns}${status}${smart72Error?`<div class="smart71-notice smart71-error" role="alert">${esc(smart72Error)}</div>`:''}${stats||'<div class="smart71-notice">All built-in datasets are historical regressions. An independent Phase 7.4.5 evaluation must be newly authored and frozen before release-candidate testing.</div>'}</section>`;
    }
    async function smart72RunClassic(split){
        if(!smartSemanticDebugEnabled()||smart72Busy||split!=='development')return;
        smart72Busy=true;smart72Result=null;smart72Error='';smart72Progress={done:0,total:428,split};
        const started=performance.now(),savedTopic=smartLastNlpTopic;
        try{
            const response=await fetch(split==='safety'?smart74ChallengeFile:smart72DatasetFile,{cache:'no-store'});
            if(!response.ok)throw Error('Question dataset missing (HTTP '+response.status+')');
            const contents=await response.text(),dataset=JSON.parse(contents);
            if(dataset.items?.length!==600)throw Error('Unexpected question dataset');
            let hash='unavailable';
            if(window.crypto?.subtle){const dig=await window.crypto.subtle.digest('SHA-256',new TextEncoder().encode(contents));hash=Array.from(new Uint8Array(dig)).map(x=>x.toString(16).padStart(2,'0')).join('');}
            const items=split==='safety'?dataset.items:dataset.items.filter(x=>x.split===split);
            const rows=items.map(item=>{
                smartLastNlpTopic='';
                const predicted=smart72LabelFor(item.question,smartFind(item.question)[0]||null);
                return {id:item.id,question:item.question,expected:item.expected,category:item.category,workspace:item.workspace,
                    predictions:{classic:predicted},correct:{classic:item.expected===predicted}};
            });
            smart72Result={generatedAt:new Date().toISOString(),split,datasetSha256:hash,complete:true,actualInference:false,
                availableMethods:['classic'],rows,metrics:{classic:smart72Stats(rows,'classic')},elapsedMs:Math.round(performance.now()-started)};
        }catch(e){smart72Error=String(e?.message||e).slice(0,300);toast('Baseline failed: '+smart72Error);}
        finally{smartLastNlpTopic=savedTopic;smart72Busy=false;if(helpMode==='panel'&&smartView==='diagnostics')helpRenderRoot();}
    }
    async function smart72Run(split){
        if(!smartSemanticDebugEnabled()||smart72Busy||!['development','holdout','safety','blind','sealed'].includes(split))return;
        smart72Busy=true;smart72Cancel=false;smart72Result=null;smart72Error='';smart72Progress={done:0,total:0,split};
        const started=performance.now(),savedTopic=smartLastNlpTopic,savedRanking=smartSemanticLastRanking;
        try{
            const selectedDatasetFile=split==='safety'?smart74ChallengeFile:split==='blind'?smart742BlindDatasetFile:split==='sealed'?smart743SealedDatasetFile:smart72DatasetFile;
            const response=await fetch(selectedDatasetFile,{cache:'no-store'});
            if(!response.ok)throw Error('Question dataset '+selectedDatasetFile+' could not be loaded (HTTP '+response.status+'). Keep the benchmark JSON files beside index.html.');
            const contents=await response.text();
            const dataset=JSON.parse(contents);
            if(!Array.isArray(dataset.items)|| (split==='safety' ? (dataset.schema!=='resortOS-phase74-safety-challenge-v1'||dataset.items.length!==123) : split==='blind' ? (dataset.schema!=='resortOS-phase742-blind-evaluation-v1'||dataset.items.length!==144) : split==='sealed' ? (dataset.schema!=='resortOS-phase743-unseen-capability-evaluation-v1'||dataset.items.length!==132) : (dataset.schema!=='resortOS-smarthelp-phase72-benchmark-v1'||dataset.items.length!==600)))throw Error('Benchmark dataset is missing or unexpected.');
            const bytes=new TextEncoder().encode(contents);
            let datasetSha256='unavailable';
            if(window.crypto?.subtle){
                const dig=await window.crypto.subtle.digest('SHA-256',bytes);
                datasetSha256=Array.from(new Uint8Array(dig)).map(x=>x.toString(16).padStart(2,'0')).join('');
            }
            const items=(['safety','blind','sealed'].includes(split)?dataset.items:dataset.items.filter(x=>x.split===split)).map((item,i)=>({
                ...item,
                id:item.id||(split==='safety'?'safety-'+String(i+1).padStart(3,'0'):split==='blind'?'blind-'+String(i+1).padStart(3,'0'):split==='sealed'?'sealed-'+String(i+1).padStart(3,'0'):'question-'+String(i+1)),
                category:item.category||(item.expected==='__unsupported__'?'unsupported':item.expected==='__clarify__'?'ambiguous':'supported'),
                workspace:item.workspace||'not-specified'
            }));
            smart72Progress.total=items.length;
            if(helpMode==='panel'&&smartView==='diagnostics')helpRenderRoot();
            const corpus=await smartSemanticPrepare();
            const rows=[];
            for(let i=0;i<items.length;i+=12){
                if(smart72Cancel)break;
                const batch=items.slice(i,i+12);
                const vectors=await smartSemanticEmbed(batch.map(x=>x.question));
                batch.forEach((item,j)=>{
                    smartLastNlpTopic='';
                    const classicAnswer=smartFind(item.question)[0]||null;
                    const classic=smart72LabelFor(item.question,classicAnswer);
                    const ranking=smartSemanticRankScores(smartSemanticScores(corpus,vectors[j]));
                    const top=ranking[0];
                    const hybrid=smartSemanticBest(new Map(ranking.map(x=>[x.id,x.score])),item.question,classicAnswer);
                    const predictions={classic,semantic:top?.id||'__unsupported__',hybrid:hybrid?.status?(hybrid.status==='clarify'?'__clarify__':'__unsupported__'):(hybrid?.intent?.id||classic)};
                    rows.push({id:item.id,question:item.question,expected:item.expected,category:item.category,
                        workspace:item.workspace,predictions,correct:{classic:smart72Check(item.expected,classic),semantic:smart72Check(item.expected,predictions.semantic),hybrid:smart72Check(item.expected,predictions.hybrid)},
                        hybridDecision:smartSemanticLastRanking?.reason||'Unknown',semanticTopScore:top?Number(top.score.toFixed(4)):null,
                        semanticTop3:ranking.slice(0,3).map(v=>({id:v.id,score:Number(v.score.toFixed(4))}))});
                });
                smart72Progress.done=rows.length;
                const p=document.querySelector('#smart72-progress'),b=document.querySelector('#smart72-track');
                if(p)p.textContent=`Running ${split}: ${rows.length}/${items.length}`;
                if(b)b.style.width=Math.floor(rows.length/items.length*100)+'%';
            }
            smart72Result={generatedAt:new Date().toISOString(),split,datasetSha256,complete:rows.length===items.length,
                actualInference:true,availableMethods:['classic','semantic','hybrid'],rows,metrics:Object.fromEntries(['classic','semantic','hybrid'].map(name=>[name,smart72Stats(rows,name)])),elapsedMs:Math.round(performance.now()-started)};
        }catch(e){
            smart72Result=null;
            smart72Error=String(e?.message||e).slice(0,300);
            toast('Benchmark failed: '+smart72Error);
        }finally{
            smartLastNlpTopic=savedTopic;smartSemanticLastRanking=savedRanking;smart72Busy=false;smart72Cancel=false;
            if(helpMode==='panel'&&smartView==='diagnostics')helpRenderRoot();
        }
    }
    function smart72Download(){
        if(!smartSemanticDebugEnabled()||!smart72Result)return;
        const blob=new Blob([JSON.stringify(smart72Snapshot(),null,2)],{type:'application/json'});
        const url=URL.createObjectURL(blob),link=document.createElement('a');
        link.href=url;link.download=`resortOS_Phase7_4_4_${smart72Result.split}_regression_report.json`;
        document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
    }
    async function smart72Copy(){
        if(!smartSemanticDebugEnabled()||!smart72Result)return;
        const {split,datasetSha256,metrics,complete,actualInference,availableMethods}=smart72Snapshot();
        const text=JSON.stringify({split,datasetSha256,metrics,complete,actualInference,availableMethods},null,2);
        try{await navigator.clipboard.writeText(text);toast('Benchmark results summary copied.');}
        catch(e){toast('Clipboard unavailable. Download JSON instead.');}
    }
    function smartSemanticDiagnosticsMarkup(){
        if(!smartSemanticDebugEnabled())return '';
        const state=smartSemanticDebugSnapshot(),test=state.selfTest;
        const chip=(value)=>`<span class="smart71-tag">${esc(String(value))}</span>`;
        const value=(name,v)=>`<div class="smart71-stat"><small>${esc(name)}</small><strong>${esc(String(v??'Not measured'))}</strong></div>`;
        const samples=test?.samples||[];
        const ranking=state.latestRanking;
        return `<div class="smart71-debug"><div class="smart2-screen-title"><span class="smart2-eyebrow">ADMIN TESTING · PHASE 7.1</span><h2>Semantic model diagnostics</h2><p>Read-only model inspection. No operational records are changed.</p></div><div class="smart71-notice">A semantic label in Ask means a candidate was selected. The verification below executes the real model on fixed example questions to confirm that inference works.</div><div class="smart71-statgrid">${value('Model loaded',state.modelLoaded?'Yes':'Not yet')}${value('Inference backend',state.backend.toUpperCase())}${value('Embedding dimensions',state.dimension)}${value('Indexed example phrases',state.indexReady?state.indexSize:'Not built')}${value('Model setup time',state.modelLoadMs===null?'Not measured':state.modelLoadMs+' ms')}${value('Last Ask source',state.answerSource||'None')}</div><div class="smart71-model"><strong>Pretrained model</strong><code>${esc(state.model)}</code><small>Transformers.js 3.8.1 · Browser Cache API enabled where supported. Cache availability is not proof of offline operation.</small></div><div class="smart71-toolbar"><button type="button" class="smart-btn smart-primary" data-action="help-semantic-test" ${smartSemanticDiagnosticsBusy?'disabled':''}>${smartSemanticDiagnosticsBusy?'Running real inference…':'Run live model self-test'}</button><button type="button" class="smart-btn" data-action="help-semantic-copy">Copy diagnostic report</button></div>${test?`<section class="smart71-results"><h3>Real inference ${chip(test.status)}</h3>${test.elapsedMs!==undefined?`<p>${test.sampleTopOneMatches}/${test.sampleTotal} samples ranked the expected task first · ${test.elapsedMs} ms including index setup.</p>`:''}${test.error?`<p class="smart71-error">${esc(test.error)}</p>`:''}${test.cache?`<p>Cache API: ${test.cache.available?'available':'unavailable'} · matching model files: ${test.cache.matchingFiles===null?'unknown':test.cache.matchingFiles}.</p>`:''}${samples.map(x=>`<div class="smart71-sample"><strong>Expected: ${esc(x.expected)}</strong><small>Top match: ${esc(x.top||'none')} ${x.expectedTop?'✓':'· review'} · embedding norm ${x.vectorNorm}</small><div>${x.topThree.map(y=>`<span>${esc(y.id)} ${y.score.toFixed(3)}</span>`).join('')}</div></div>`).join('')}</section>`:'<div class="smart71-notice">No live inference test run in this browser session yet.</div>'}${ranking?`<section class="smart71-results"><h3>Most recent Ask ranking</h3><p>Answer source: ${esc(ranking.source)} · Decision: ${esc(ranking.reason)}. Scores are similarities, not probabilities of correctness.</p>${ranking.candidates.map(x=>`<div class="smart71-rank"><strong>${esc(x.id)}</strong><span>${Number(x.score).toFixed(3)}</span></div>`).join('')}</section>`:'<p class="smart71-muted">Ask a question to inspect its ranked task candidates. Question text is not stored in this report.</p>'}<p class="smart71-muted">Use this on a private staging build only. The URL flag reveals diagnostics but is not an authentication boundary; account permissions remain enforced separately.</p>${smart743RegistryMarkup()}${smart72Markup()}<button type="button" class="smart-ask-back" data-action="help-smart-tab" data-id="ask">← Return to SmartHelp Ask</button></div>`;
    }
    async function smartSemanticCopyReport(){
        if(!smartSemanticDebugEnabled())return;
        const copy={...smartSemanticDebugSnapshot(),selfTest:smartSemanticDiagnosticsResult};
        try{await navigator.clipboard.writeText(JSON.stringify(copy,null,2));toast('Semantic diagnostic report copied.');}
        catch(e){toast('Clipboard access blocked. Open this page over HTTPS to enable copying.');}
    }
    function smartSemanticCandidates(){
        const records=[];
        for(const intent of smartIntentDefinitions){
            const articles=Object.values(intent.articles||{}).map(id=>HELP_ARTICLES.find(a=>a.id===id)).filter(Boolean);
            if(!articles.length)continue;
            const representative=articles[0];
            records.push({id:intent.id,text:`${representative.title}. ${representative.summary}. ${intent.topic} task in resortOS.`});
            for(const phrase of smartSemanticPhrases[intent.id]||[])records.push({id:intent.id,text:phrase});
        }
        return records;
    }
    function smartSemanticSetStatus(state,message){
        smartSemanticState=state;smartSemanticMessage=message||'';
        const label=document.querySelector('#smart-semantic-status');
        if(label){label.textContent=smartSemanticMessage;label.dataset.state=state;}
    }
    async function smartSemanticLoadModel(){
        if(smartSemanticExtractor)return smartSemanticExtractor;
        if(smartSemanticLoad)return smartSemanticLoad;
        smartSemanticLoad=(async()=>{
            const started=performance.now();
            smartSemanticSetStatus('loading','Loading semantic language model · first use requires an internet connection');
            const {pipeline,env}=await import(smartSemanticModelModule);
            env.allowLocalModels=false;
            env.useBrowserCache=true;
            smartSemanticExtractor=await pipeline('feature-extraction',smartSemanticModelId,{
                device:'wasm',
                progress_callback:(info)=>{
                    if(info?.status==='progress' && Number.isFinite(info.progress)){
                        const progress=Math.max(0,Math.min(100,Math.floor(info.progress/10)*10));
                        smartSemanticSetStatus('loading',`Loading semantic language model · ${progress}% of current file`);
                    }
                }
            });
            smartSemanticModelTiming=Math.round(performance.now()-started);
            smartSemanticError='';
            return smartSemanticExtractor;
        })();
        try{return await smartSemanticLoad;}
        catch(e){smartSemanticLoad=null;throw e;}
    }
    async function smartSemanticEmbed(texts){
        const extractor=await smartSemanticLoadModel();
        const output=await extractor(texts,{pooling:'mean',normalize:true});
        if(!output?.data || !output?.dims)throw Error('Unexpected embedding shape');
        const dim=output.dims[output.dims.length-1];
        const values=output.data;
        if(dim<64 || values.length!==texts.length*dim)throw Error('Embedding output mismatch');
        smartSemanticEmbeddingDimension=dim;
        if(!Array.from(values).every(Number.isFinite))throw Error('Embedding output contains non-finite numbers');
        const vectors=[];
        for(let i=0;i<texts.length;i++)vectors.push(Float32Array.from(values.subarray(i*dim,(i+1)*dim)));
        return vectors;
    }
    async function smartSemanticPrepare(){
        if(smartSemanticIndex)return smartSemanticIndex;
        if(smartSemanticIndexLoad)return smartSemanticIndexLoad;
        smartSemanticIndexLoad=(async()=>{
            const corpus=smartSemanticCandidates();
            smartSemanticSetStatus('indexing','Understanding verified resortOS tasks…');
            const rows=[];
            for(let i=0;i<corpus.length;i+=12){
                const batch=corpus.slice(i,i+12);
                const vectors=await smartSemanticEmbed(batch.map(x=>x.text));
                for(let j=0;j<batch.length;j++)rows.push({...batch[j],vector:vectors[j]});
            }
            smartSemanticIndex=rows;
            return rows;
        })();
        try{return await smartSemanticIndexLoad;}
        catch(e){smartSemanticIndexLoad=null;throw e;}
    }
    function smartSemanticDot(a,b){
        let total=0;
        for(let i=0;i<a.length;i++)total+=a[i]*b[i];
        return total;
    }
    function smartSemanticRankScores(scores){
        return [...scores.entries()].map(([id,score])=>({id,score})).sort((a,b)=>b.score-a.score);
    }
    function smartSemanticScores(rows,vector){
        const scores=new Map();
        for(const row of rows)scores.set(row.id,Math.max(scores.get(row.id)??-1,smartSemanticDot(vector,row.vector)));
        return scores;
    }


    function smart74Boundary(question,previousTopic=''){
        const q=String(question||'').toLowerCase().replace(/[’]/g,"'").replace(/\s+/g,' ').trim();
        if(!q)return {status:'unknown',reason:'Empty question'};
        const outside=[
            /\b(?:biometric|fingerprint|face recognition|remote hardware control|robotic housekeeping|smart lock|door locks?|lock using this software)\b/,
            /\b(?:remotely (?:reprogram|repair|fix|control|operate)|remote(?:ly)? (?:reprogram|repair|fix|control|operate)|(?:reprogram|repair|fix|operate).*remotely|motion detection|smart sensors?|fitness watch|heart rate)\b/,
            /\b(?:shopee|lazada|amazon marketplace|wholesale vendor|supplies directly from|supply vendor|external e-commerce|e-commerce store|online shopping|cinema ticket|movie ticket)\b/,
            /\b(?:stock share values?|share values?|stock prices?|pay(?:ment)? links? (?:that|to|for)|send payment links?|external payment gateway|online payment gateway|charging (?:their|a) credit card|charge cards? online|charge (?:the|a|their|customer's) (?:credit|debit) card(?:s)?|charge.*(?:card|cards).*online)\b/,
            /\b(?:bir tax return|file (?:a )?bir|government tax invoices?|official government receipts?|ferry ride|ferry ticket|airline ticket|doctor appointment|medical appointment|passport for a|passport issuance)\b/,
            /\b(?:going to rain|rain tomorrow|weather tomorrow|forecast tomorrow|overnight rates?|nightly prices?|room rental fees?|accommodation fees?|renting rooms? overnight)\b/,
            /\b(?:legal government|legal advice|medical advice|business law|lab results)\b/,
            /\b(?:grab\s?food|food\s?panda|deliveroo|doordash|uber\s?eats|online food delivery|delivery orders? (?:from|with|through|via))\b/,
            /\b(?:whats\s?app|facebook messenger|telegram|viber|signal messenger|text (?:a|the|our) guest|sms|send (?:guests?|customers?) (?:messages?|texts?|emails?))\b/,
            /\b(?:airbnb|booking\.com|agoda|expedia|traveloka|public online reservations?|booking engines?|import (?:external )?bookings?|channel manager)\b/,
            /\b(?:pay(?:ing)? property tax|property taxes|file (?:a )?tax return|pay (?:a )?tax bill|bir filing|official bir|government tax portal|tax authority|tax payments?)\b/,
            /\b(?:tourist visa|visa application|immigration status|passport application|renew.*passport|national id|government id|id card issuance|social security claim|insurance claims?|claims? filing|file an insurance)\b/,
            /\b(?:cryptocurrenc(?:y|ies)|bitcoin|ethereum|forex|foreign exchange trad|foreign exchange from|stock[ -]?market|share prices|trading app|trading account|invest(?:ment)? portfolio)\b/,
            /\b(?:currency (?:conversion|exchange rate)|convert (?:usd|eur|dollars?|pesos?)|exchange rates?|how many (?:kilograms?|meters?|pounds?|miles?|liters?)|convert (?:units?|pounds?|kilograms?))\b/,
            /\b(?:recommend (?:a |the )?(?:laptop|phone|restaurant|hotel|movie)|most expensive laptop|best (?:place|restaurant|food|cafe|hotel) (?:to eat|near|around)|places? to (?:visit|eat)|restaurant recommendations?)\b/,
            /\b(?:smok(?:e|ing) (?:inside|in|at)|public parks?|traffic law|legal age|local laws?|what is the weather|typhoon forecast|weather forecast|earthquake forecast)\b/,
            /\b(?:stream (?:a )?(?:movie|music|video)|watch (?:a )?movie|netflix|youtube video|play games?|play a song|spotify)\b/,
            /\b(?:wifi router|wi[ -]?fi settings|network router|configure.*router|repair (?:a |the )?(?:broken )?(?:physical )?(?:printer|computer|laptop|router).*remotely|remotely repair|remote hardware repair)\b/,
            /\b(?:floor plan|draw (?:a )?map|3d model|architectural design|building blueprint|resort floorplan|property blueprint)\b/,
            /\b(?:bank (?:transfer|withdrawal) (?:directly|automatically)|(?:automatically|directly) (?:complete|make|execute|send|initiate).*bank transfer|bank account opening|open (?:a )?bank account|transfer money (?:to|from)|initiate (?:a )?bank transfer|send money to|withdraw funds|charge (?:a )?credit card directly|process a card charge|collect money online)\b/,
            /\b(?:electricity consumption sensors?|smart meter|iot sensor|security camera|cctv|door lock|smart lock|keycard|thermostat|freezer temperature|remote door unlock)\b/,
            /\b(?:external (?:email|chat|messaging|social media)|send.*(?:through|via|using) (?:messaging|social media|third.party)|sync.*(?:external|third.party)|connect (?:to|with) (?:third.party|external) (?:booking|social|delivery))\b/,
            /\b(?:a(?:i|utomated) (?:voice )?phone calls?|call (?:a|the) guest.s phone|contact.*guest.*(?:phone|text|sms)|video call|mass mailing|newsletter|marketing automation)\b/,
            /\b(?:robotic housekeeping|laundry machine control|smart hotel automation|fire alarm controls?|medical records?|fingerprint scanner|biometric attendance)\b/,
            /\b(?:nightly room rates?|charge for accommodation|accommodation fees?|room rent(?:al)? fee|rent rooms? by the night|overnight accommodation price)\b/,
            /\b(?:payroll|pay slips?|staff wages?|staff salaries|timesheet|staff attendance|time tracking|clock in|clock out)\b/,
            /\b(?:supply ordering|buy (?:new )?(?:equipment|stock|towels)|order (?:more )?supplies from|shop online|product recommendations?)\b/
        ];
        if(outside.some(re=>re.test(q)))return {status:'unknown',reason:'Feature or subject is outside the verified resortOS capability catalog'};
        const pronouns=/\b(?:it|this|that|those|them|another one|the other|the same|which one|one|something|what happened|the correct page|that process|next step|instead|yesterday.s version)\b/;
        const vague=[
            /^(?:can|could|would) you (?:take|bring|guide|show) me to (?:the )?(?:right|correct|same) (?:page|place|screen)\??$/,
            /\b(?:how do i change the status|what (?:is|would be) the next step|what should (?:i|the cashier|we) do instead|how do we enable it again|what if i clicked it|i forgot which account it was|how does the other dashboard handle it|what do i do with this|how do i stop that|what if i accidentally clicked it|which of these do i select|where do i reverse the last thing|should i restore the older version|can you show me the right page|can the other user also do this)\b/,
            /^(?:it|that|this|the button|the option|the customer|someone|the thing|something|this amount|the amount|a different result|i got a different result)\b.*\b(?:wrong|another one|strange|failing|missing|not working|different|stuck|happening|error|result|status|version|why)\b[?.!]*$/,
            /^(?:can i|could i|do i|how do i|where do i) (?:print|save|delete|edit|change|find|open|add|remove|enable|disable|cancel|undo|confirm) (?:that|this|it|another one|the other one|the saved thing)\??$/
        ];
        if(!previousTopic&&vague.some(re=>re.test(q)))return {status:'clarify',reason:'The request needs an explicit task or screen before an answer is safe'};
        const evidence=smart73DomainEvidence(question);
        const signal=smart73ActionSignals(question);
        const ids=Object.keys(signal).filter(id=>signal[id]>0);
        const directlyAnchored=!!evidence || ids.some(id=>{
            const domain=id.split('.')[0];
            const anchors={employee:/\b(?:staff|employee|cashier|worker|receptionist|waiter|login|account|user|department|permission)\b/,
                receipt:/\b(?:receipt|print|printer|acknowledg|template|slip)\b/,
                payment:/\b(?:payment|paid|cash|tender|settle|balance|gcash|bank transfer)\b/,
                discount:/\b(?:discount|pwd|senior|vat|concession)\b/,
                stay:/\b(?:stay|guest|arrival|departure|checkout|check out|check in)\b/,
                room:/\b(?:room|occupancy|vacant)\b/,
                order:/\b(?:order|food|restaurant|meal|dining|cart|dish)\b/,
                table:/\b(?:table|restaurant)\b/,
                menu:/\b(?:menu|food|dish|category)\b/,
                service:/\b(?:service|incidental|additional charge)\b/,
                charge:/\b(?:charge|incidental|extra service)\b/,
                audit:/\b(?:audit|activity log|trace|history of changes)\b/,
                ticket:/\b(?:ticket|support request|report.*issue)\b/,
                notification:/\b(?:notification|notification bell|unread alert)\b/,
                promotion:/\b(?:promotion|promo|promotional campaign)\b/};
            return !!anchors[domain]?.test(q);
        });
        if(!directlyAnchored){
            const appAnchor=/\b(?:resortos|front desk|front counter|restaurant|staff|employee|cashier|receptionist|reception|worker|server|colleague|coworker|team|user|login|logins|account|profile|credential|credentials|dashboard|guest|visitor|stay|room|receipts?|reprint|printer|printout|printing|invoice|acknowledg\w*|template|payment|transaction|tender|settlement|charge|balance|table|tables|dining|diner|dish|drink|food|menu|chicken|price|pricing|order|bill|discount|promotion|ticket|support|notification|alerts?|bell|audit|accountability|records|incidental|service|services|check.?out|check.?in|cash|vat|occupied|vacant|department|management|admin|issue|resort name|business contact)\b/.test(q);
            if(!previousTopic && pronouns.test(q) && (q.split(/\s+/).length<=13) && !appAnchor && !/\b(?:this app|the system|resortos|smarthelp)\b/.test(q))return {status:'clarify',reason:'No verified referent for an abbreviated follow-up'};
            if(appAnchor)return null;
            return {status:'unknown',reason:'No verified resortOS capability was identified; no guide will be guessed'};
        }
        return null;
    }

    function smart73Scope(question,previousTopic=''){
     const q=String(question||'').toLowerCase().replace(/[’]/g,"'").replace(/\s+/g,' ').trim();
     if(!q)return {status:'unknown',reason:'Empty question'};
     if(/\b(?:delete|erase|wipe|purge)\b.*\b(?:audit (?:trail|log)|all audit records|entire audit)\b/.test(q) || /\b(?:which|what) guest.*\b(?:arrive|arrives|will arrive)\b.*\b(?:next month|next year)\b/.test(q))return {status:'unknown',reason:'No verified resortOS function for this request'};
     const multiTasks=[
      /\b(?:front desk.*(?:take|record|collect).*payment)\b.*\b(?:restaurant.*post.*room)\b/,
      /\b(?:receipt|printing|print it)\b.*\b(?:and|then)\b.*\b(?:staff access|give staff access|deactivat\w*.*(?:user|employee))\b/,
      /\b(?:apply|discount|pwd)\b.*\b(?:both|across)\b.*\b(?:room.*food|food.*room)\b/,
      /\b(?:difference between|compare)\b.*\b(?:charge|payment)\b.*\b(?:and|versus|vs|from)\b.*\b(?:charge|payment)\b/,
      /\b(?:create|add|register)\b.*\b(?:employee|staff|cashier)\b.*\b(?:and|then)\b.*\b(?:permissions?|privileges?|access)\b/,
      /\b(?:void|cancel)\b.*\b(?:and|then)\b.*\b(?:refund)\b/
     ];
     if(multiTasks.some(re=>re.test(q)))return {status:'clarify',reason:'Multiple independent workflows; ask which to address first'};

     const unsupported=[
      /\b(?:airbnb|booking\.com|online public booking|online booking engine|import bookings|hotel public booking)\b/,
      /\b(?:nightly (?:accommodation|room|rental)|room rental (?:fee|price)|rental fees|accommodation rate|room rates? per night)\b/,
      /\b(?:official bir|bir tax|tax return|government passport|immigration status|scan guest passports)\b/,
      /\b(?:ambulance|thermostat|cctv|motion detection|electrical breaker|freezer temperature|heart rates?)\b/,
      /\b(?:online supplier|replacement laptop batteries|purchase new kitchen equipment|order more towels from an online)\b/,
      /\b(?:flight|ferry|airline|uber|airport ride|luggage allowances|dhl|parcels shipped)\b/,
      /\b(?:marketing email|gmail password|sms messages|telecom service|currency exchange rate|typhoon|weather forecast)\b/,
      /\b(?:bank account|transfer money from gcash|directly transfer money|submit invoices.*external accounting)\b/,
      /\b(?:payroll|wages|salaries|staff time clock|attendance payroll|housekeeping cleaners|loyalty points|redeem prizes)\b/,
      /\b(?:room keycard|door locks?|facial recognition.*kiosk)\b/,
      /\b(?:automatically.*(?:refund|transfer|book))\b/
     ];
     if(unsupported.some(re=>re.test(q)))return {status:'unknown',reason:'Unsupported resortOS feature'};
     const concrete=/(?:employee|staff|cashier|reception|operator|user account|account access|department access|receipt|printer|checkout|check out|guest|visitor|room|stay|table|restaurant|food|menu|order|bill|payment|cash|gcash|bank transfer|discount|senior|pwd|promotion|ticket|support|audit|notification|service|charge|price|vat|catalog|cashier|manager|shift)/;
     const floating=/\b(?:it|that|this|them|they|one|the thing|the option|the button|something|same thing|what we discussed|what about|the old one|the other|back|next)\b/;
     const generic=/\b(?:can i|how (?:do|can) i|what (?:if|should)|where (?:do|does|is)|which one|why|explain|fix|save|delete|update|change|remove|reverse|finalize|switch|turn|need|do i|does that|help me)\b/;
     if(!previousTopic && !concrete.test(q) && ((floating.test(q)&&generic.test(q))||/\b(?:the button is missing|the option|the other department|what should i do next|i need to delete this one)\b/.test(q)))return {status:'clarify',reason:'Unresolved reference without conversation context'};
     if(!previousTopic && /^(?:what if (?:they|he|she) already paid\??|who is allowed to do that\??|can i turn it off\??|the button is missing\.?|i need to delete this one\.?|i want to do the same thing again\.?)$/.test(q))return {status:'clarify',reason:'Context required'};
     return null;
    }
    function smart73ActionSignals(question){
     const q=String(question||'').toLowerCase().replace(/[’]/g,"'");
     const signals={};
     const tests={
      'employee.activate':/\b(?:reactivat\w*|restore.*(?:account|login|staff|employee|user)|bring.*back|back at work|returning after leave|made operational again|turn.*(?:account|profile).*back on|inactive.*(?:back|again|return))\b/,
      'employee.deactivate':/\b(?:deactivat\w*|disable.*(?:staff|employee|cashier|user|account|login)|(?:staff|employee|cashier|user|account|login).*disable|resign\w*|terminated|no longer log in|shouldn.t be able to|former employee|ex-cashier|block.*(?:employee|staff|account)|mark.*inactive.*(?:leaves|employee)|switch.*access.*off)\b/,
      'employee.permissions':/\b(?:permissions?|privileges?|access rights?|roles?|department access|both departments?|both work areas?|which dashboards?|authoriz\w*|assign.*(?:department|front desk|restaurant)|(?:staff|employee|cashier|waiter|receptionist).*?(?:dashboard|front desk|restaurant).*?(?:access|open|work|cover))\b/,
      'employee.create':/\b(?:new hire|hired|hire|recruited|new staff|new cashier|onboard|first-time|provision|new account|new login|create credentials|create.*(?:employee|staff|account)|register.*(?:staff|employee|operator)|add.*(?:employee|cashier|staff))\b/,
      'employee.find':/\b(?:roster|directory|list of staff|staff list|employees are currently active|view.*(?:accounts|employees)|look up.*(?:staff|employee|account)|existing staff account|browse.*(?:registered|staff))\b/,
      'receipt.builder':/\b(?:receipt builder|drag.*receipt|layout|design.*receipt|receipt.*design|move.*(?:fields?|elements?|sections?)|template.*(?:layout|design))\b/,
      'receipt.settings':/\b(?:receipt.*(?:footer|header|business information|branding|company|logo|settings)|(?:footer|header|business information|branding|company|logo).*receipt|printing defaults?|receipt defaults?)\b/,
      'receipt.reprint':/\b(?:reprint|print.*(?:again|previous|already|past|older)|copy.*(?:receipt|bill)|old receipt|past receipt|receipt history|already issued.*(?:bill|receipt)|without charging twice)\b/,
      'receipt.error':/\b(?:receipt|print|printer|preview|thermal|acknowledg\w*)\b.*\b(?:blank|wrong|broken|fail\w*|stuck|not printing|not open|doesn.t work|won.t|problem|error|never|cannot|can.t|missing)\b|\b(?:blank|wrong|broken|fail\w*|stuck|problem|error|cannot|can.t)\b.*\b(?:receipt|printer|preview|print)\b/,
      'payment.method':/\b(?:payment method|payment type|payment option|cash.*non.cash|gcash.*configure|enable.*(?:gcash|bank transfer)|method.*(?:configure|manage))\b/,
      'payment.error':/\b(?:payment|paid|settle|tender|amount received|balance)\b.*\b(?:reject\w*|fail\w*|uncertain|invalid|doesn.t|can.t|cannot|wrong|not accepted|stuck|error|problem|not reflect|still shows unpaid)\b|\b(?:reject\w*|fail\w*|uncertain|invalid|can.t|cannot|error|problem)\b.*\b(?:payment|paid|settle|amount)\b/,
      'payment.record':/\b(?:record.*(?:paid|payment|cash)|collect.*(?:payment|money|cash)|receive.*(?:payment|money)|settle.*(?:bill|charge|balance)|mark.*paid|partial payment|take payment)\b/,
      'discount.error':/\b(?:discount|pwd|senior|vat exemption)\b.*\b(?:not|failed|can.t|cannot|won.t|error|wrong|rejected|ineligible|problem)\b/,
      'discount.apply':/\b(?:apply.*(?:discount|pwd|senior)|discount.*(?:eligible|qualified|senior|pwd)|senior citizen discount|statutory discount|give.*discount)\b/,
      'promotion.manage':/\b(?:promotion|promotional|campaign|promo)\b/,
      'stay.checkout-error':/\b(?:checkout|check out|guest.*depart|stay.*close|room.*vacant)\b.*\b(?:block|error|can.t|cannot|unpaid|unsettled|fail\w*|not|refus\w*)\b/,
      'stay.checkout':/\b(?:check\s+(?:(?:someone|somebody|a guest|a visitor|the guest|a customer|them)\s+)?out|checkout|guest.*(?:leave|depart)|finish.*stay|end.*stay|complete.*departure|finalize.*stay|room departure)\b/,
      'stay.create':/\b(?:check\s?in|register.*(?:guest|stay)|new guest|new stay|arrival|arriving|assign.*vacant room)\b/,
      'room.create':/\b(?:add.*room|new room|create.*room|deactivat\w*.*room|room.*deactivat\w*|room inventory|room catalog|room number|configure rooms?)\b/,
      'room.status':/\b(?:occupancy|vacan\w*|occupied|room status|room availability|rooms grid|which rooms)\b/,
      'order.void':/\b(?:void.*order|cancel.*order|reverse.*order|mistaken order|wrong order|duplicate order)\b/,
      'order.roompost':/\b(?:restaurant|table|meal|food|bill|dining)\b.*\b(?:guest room|room account|charge.*room|post.*room|room bill|transfer.*room)\b|\b(?:post.*meal|charge.*meal.*room)\b/,
      'order.additems':/\b(?:existing order|current order|more food|more items|another item|extra meal|another plate|append.*item|add.*(?:item|food|meal|drink).*order|quantity.*order)\b/,
      'order.create':/\b(?:new order|start.*order|create.*order|take.*order|place.*order|open.*order|food order|restaurant order)\b/,
      'table.manage':/\b(?:add.*table|remove.*table|disable.*table|configure.*table|table.*inactive|manage.*tables)\b/,
      'table.status':/\b(?:table.*(?:occupied|available|status|dining|awaiting payment)|available tables|table status)\b/,
      'menu.manage':/\b(?:menu.*(?:price|photo|category|manage|edit|update)|food categories|menu catalog|add.*dish|new meal.*menu|deactivate.*dish)\b/,
      'service.manage':/\b(?:service.*(?:catalog|rate|price|configure|manage)|rental.*(?:rate|price)|extra.*service.*price)\b/,
      'charge.post':/\b(?:additional charge|incidental|post.*(?:extra|charge|service).*room|add.*(?:service|charge).*stay|towel rental.*room)\b/,
      'audit.search':/\b(?:audit|who.*(?:changed|voided|settled|posted)|trace.*(?:change|void)|staff activity|activity log|logs of changes)\b/,
      'ticket.resolve':/\b(?:resolve.*ticket|ticket.*resolv|close.*(?:issue|ticket)|mark.*(?:issue|ticket).*resolved|finish.*issue)\b/,
      'ticket.create':/\b(?:create.*ticket|raise.*ticket|report.*issue|support request|submit.*(?:problem|ticket)|create.*support)\b/,
      'notification.view':/\b(?:notification|alert|unread.*(?:message|update)|bell icon)\b/
     };
     for(const [id,re] of Object.entries(tests))if(re.test(q))signals[id]=1;
     if(/\b(?:not|without|rather than|instead of)\s+(?:add|create|register|delete|void|refund)\b/.test(q)){
      for(const id of ['employee.create','order.create','order.void','room.create','ticket.create'])signals[id]=0;
     }
     if(/\b(?:do not|don't|not to|without)\s+(?:charge|collect|pay|record.*payment)\b/.test(q))signals['payment.record']=0;
     return signals;
    }
    function smart73DomainEvidence(question){
     const q=String(question||'').toLowerCase().replace(/[’]/g,"'").replace(/\s+/g,' ').trim();
     const has=(re)=>re.test(q);
     const person=has(/\b(?:employee|employe|staff|cashier|receptionist|reception|operator|waiter|worker|user|teammate|coworker|team profile|somebody|account|acount|login)\b/);
     const money=has(/\b(?:payment|paid|pay|cash|money|tender|balance|amount|settle|settlement|charge|bill|incidental)\b/);
     const concession=has(/\b(?:discount|concession|reduction|senior|pwd|disability|statutory relief|vat exemption)\b/);
     const departure=has(/\b(?:checkout|check\s?out|departure|departing|leave|leaves|leaving|end(?:ing)? a stay|closing occupancy|releasing? (?:the )?room|releasing? it|finish (?:a )?stay|finish.*occupancy|guest.*vacant|room.*vacant|clears? .*occupied room)\b/);
     const food=has(/\b(?:restaurant|table|food|meal|dinner|dish|beverage|dessert|drink|order|menu|dining|pos|ticket|customer)\b/);
     const service=has(/\b(?:extra service|additional service|incidental service|equipment|towel|rental|additional charge|extra charge|extra service option)\b/);
     const bad=has(/\b(?:fail(?:s|ed|ing)?|doesn.t|does not|won.t|will not|cannot|can.t|invalid|reject(?:ed|ing)?|blocked?|stop(?:s|ped)?|missing|not available|not eligible|ineligible|won't|error|problem|unsuccessful|never|uncertain|not showing|not reflect|not working)\b/);
     const hint=(id)=>({id,reason:'Verified task-family action evidence',source:'task-evidence'});
     if(has(/\b(?:notification|notifications|unread alert|notification bell|recent alert)\b/))return hint('notification.view');
     if(has(/\b(?:audit trail|audit log|staff activity log|staff.*activity|trace.*void|void history|who.*changed|changes made by|history of.*void)\b/))return hint('audit.search');
     if(person){
      if(has(/\b(?:turn.*back on|reactivat\w*|activat\w*.*again|how.*\bactivat\w*|\bactivat\w*.*(?:them|him|her|account|employee)|enable.*(?:inactive|disabled)|(?:inactive|disabled).*active again|restore\w*|returned?|returning|back at work|back.*(?:job|work|team)|approved to return|made operational again|turn.*on again|resume.*account|reinstate\w*)\b/) && has(/\b(?:inactive|disabled|suspended|old|former|previously|after leave|again|return|back|user|account|staff|cashier|receptionist|employee)\b/))return hint('employee.activate');
      if(has(/\b(?:deactivat\w*|disable\w*|inactive|resign\w*|terminated|no longer|shouldn.t|mustn.t|block.*(?:account|employee|staff)|access.*off|someone leaves|former|ex.cashier)\b/) && !has(/\b(?:reactivat\w*|activat\w*.*again|how.*\bactivat\w*|\bactivat\w*.*(?:them|him|her|account|employee)|enable.*inactive|inactive.*active again|restore\w*|return(?:ed|ing)?|back at work|back.*team|approved to return|made operational again|turn.*on again)\b/))return hint('employee.deactivate');
      if(has(/\b(?:permissions?|privileges?|access|authoriz\w*|assign|cover reception|help with dining|work areas?|dashboard\w*|both departments?|both work areas?|departments?)\b/) && has(/\b(?:work|restaurant|dining|reception|front desk|dashboard|department|privilege|permission|access|authoriz|assign|weekend|role)\b/) && !has(/\b(?:new account|new login|new employee|new hire|onboard|provision|create credential)\b/))return hint('employee.permissions');
      if(has(/\b(?:roster|directory|existing staff account|look up|find|browse|see.*(?:employee|staff)|staff list|currently active|not add one|not create)\b/))return hint('employee.find');
      if(has(/\b(?:hired|new hire|new employee|new staff|new cashier|first.time|onboard|provision|create.*(?:login|account|user|staff|employee|credential)|add.*(?:employee|cashier|staff)|give.*(?:login|account))\b/))return hint('employee.create');
     }
     if(has(/\b(?:support request|ticket|issue|printer|payment|technical problem)\b/) && has(/\b(?:how.*report|report.*(?:it|issue|problem)|request.*help|contact.*(?:admin|support))\b/) && !has(/\b(?:finished|fixed|resolved|close it|close.*ticket|final status)\b/))return hint('ticket.create');
     if(has(/\b(?:saved printed record|printed record|saved receipt|earlier checkout.*record)\b/) && has(/\b(?:find|printed|saved|earlier|checkout)\b/))return hint('receipt.reprint');
     if(has(/\b(?:receipt|printer|print|preview|acknowledg\w*|proof of payment|payment slip)\b/)){
      if(has(/\b(?:missing|can.t open|cannot open|not open|unable to open|won.t open|blank|fail\w*|not printing|not printed|broken|doesn.t|wrong|problem|error|stuck|nothing appears)\b/))return hint('receipt.error');
     }
     if(has(/\b(?:payment|tender|bank|gcash|e.wallet|payment method|payment option|payment dropdown|payment choice)\b/) && has(/\b(?:dropdown|option|choice|configure|add.*bank|new bank|method|e.wallet|replace.*payment|selectable|enable.*bank)\b/) && !has(/\b(?:payment confirmation|payment operation|payment won.t|payment never|amount received.*invalid)\b/))return hint('payment.method');
     if(has(/\b(?:invalid amount|check (?:the )?amount received|amount received.*(?:invalid|check)|payment.*(?:not sure|uncertain)|transaction.*(?:uncertain|went through|successful))\b/) && has(/\b(?:payment|paid|amount|checkout|transaction|received|balance)\b/))return hint('payment.error');
     if(has(/\b(?:food charges|meal charges)\b/) && has(/\b(?:post|charge|room)\b/) && has(/\b(?:rather than|instead of|guest|stay|room)\b/))return hint('order.roompost');
     if(money){
      if(has(/\b(?:don.t know whether|not sure (?:if|whether)|verify.*(?:paid|payment)|still shows? unpaid|won.t finish|cannot finish|can.t finish|never completes|not accepted|not recorded|not reflect|reject\w*|operation won.t|failed validation|payment confirmation.*(?:fail|never|stuck)|collect payment.*(?:but|doesn.t|won.t|can.t|cannot)|paid or not|invalid amount)\b/))return hint('payment.error');
      if(has(/\b(?:already handed|handed.*money|cashier.*money|money.*logged|reducing.*outstanding|reduce.*outstanding|record.*(?:payment|money|cash)|collect.*(?:payment|money)|mark.*paid|partial payment|amount received|register.*(?:payment|cash)|payment.*received)\b/) && !bad)return hint('payment.record');
     }
     if(concession){
      if(has(/\b(?:not available|isn.t available|not eligible|is not eligible|not qualified|disabled|fail\w*|reject\w*|validation|can.t|cannot|won.t|error|not work|not working|not apply|keeps.*reject|ineligible)\b/))return hint('discount.error');
      if(has(/\b(?:apply|eligible|disability|senior|pwd|use|give|grant|reduce)\b/) && has(/\b(?:discount|concession|reduction|senior|pwd|disability|eligible)\b/) && !bad)return hint('discount.apply');
     }
     if(has(/\b(?:promotion|promotional|promo|seasonal|offer|campaign|food deal|special deal|discount.*event|expired.*offer)\b/) && has(/\b(?:dates?|change|update|disable|expired|edit|manage|create|add|offer|promotion|promo)\b/) && !has(/\b(?:failed|reject|not eligible)\b/))return hint('promotion.manage');
     if(has(/\b(?:expected checkout date|scheduled checkout date|checkout date field|planned departure date)\b/))return hint('stay.create');
     if(has(/\b(?:room dashboard|rooms grid|occupancy dashboard)\b/) && has(/\b(?:vacant|empty|occupied|status|room)\b/))return hint('room.status');
     if(has(/\b(?:verify|review|check)\b.*\b(?:unsettled|outstanding|open)\b.*\b(?:before checkout|before check out)\b/))return hint('stay.checkout');
     if(has(/\b(?:table|tables|restaurant|dining)\b.*\b(?:waiting for checkout|awaiting payment|table checkout|checkout status)\b/))return hint('table.status');
     if(has(/\b(?:guest|stay|occupancy|departure|checkout|check out)\b/)&&has(/\b(?:unable to finish|unable to complete|wont|won.t|will not|cannot|can.t|rejects|disabled|unavailable|won't|block\w*|stops?|prevent|failed|error|not eligible)\b/) && !has(/\b(?:restaurant|table|food|menu|discount|payment screen|transaction|money handed|cash handed)\b/))return hint('stay.checkout-error');
     if(has(/\b(?:room|occupancy|checkout|check out)\b/) && has(/\b(?:wont|won.t|can.t|cant|cannot|unable|won't|not).*\b(?:vacant|checkout|check out)\b/))return hint('stay.checkout-error');
     if(has(/\b(?:room|occupancy)\b.*\b(?:won.t become vacant|cannot become vacant|not become vacant|won.t be vacant)\b/))return hint('stay.checkout-error');
     if(departure && has(/\b(?:guest|visitor|resident|family|room|occupancy|stay|checkout|departure|departing|leaves|leaving)\b/) && !(has(/\b(?:restaurant|dining|food|meal|menu|table|discount|order)\b/) && !has(/\b(?:guest|room|stay|visitor|resident|family)\b/))){
      if(has(/\b(?:block\w*|stops?|cannot|can.t|cant|won.t|wont|refuse\w*|unpaid|unsettled|outstanding|error|fail\w*|not able|prevent\w*|not allowed|unavailable|disabled)\b/))return hint('stay.checkout-error');
      if(has(/\b(?:departing|leaves|leaving|key|finish|finaliz\w*|vacant|clear\w*|end\w*|departure|checkout|check out|releas\w*|occupied room)\b/))return hint('stay.checkout');
     }
     if(has(/\b(?:start.*(?:visit|stay)|visit record|new.*occupant|arriv\w*|new occupant\w*|new guest\w*|check\s?in|register.*(?:guest|stay)|assign.*room|record.*occupants?)\b/) && has(/\b(?:room|guest|family|reception|occupant|stay|arrival)\b/))return hint('stay.create');
     if(has(/\b(?:empty accommodations|currently empty|currently vacant|which rooms? (?:are|is)|room availability|occupancy|room status|vacant rooms?)\b/) && !has(/\b(?:register|check in|new guest|arrival)\b/))return hint('room.status');
     if(service){
      if(has(/\b(?:create|record|log|add)\b.*\b(?:incidental service fee|additional service fee|extra service fee)\b/) && !has(/\b(?:new option|catalog|admin system management)\b/))return hint('charge.post');
      if(has(/\b(?:create|define|configure)\b.*\b(?:incidental service|additional service|service fee)\b/) && !has(/\b(?:guest|stay|room|account)\b/))return hint('service.manage');
      if(has(/\b(?:new.*(?:additional service|service option|service type|incidental service option)|add.*(?:service option|service type)|service.*(?:option|catalog|price|configure|manage)|create.*(?:additional )?service.*(?:type|option)?|configure.*extra service rates?)\b/) && !has(/\b(?:guest.s account|payable extra service|due|post.*room)\b/))return hint('service.manage');
      if(has(/\b(?:borrow\w*|extra service|additional service|incidental|quantity|amount due|record.*(?:charge|equipment|service)|post.*charge|log.*amount|log.*charge)\b/))return hint('charge.post');
     }
     if(food){
      if(has(/\b(?:reverse|void|cancel|incorrect|mistaken|duplicate|wrong)\b/) && has(/\b(?:order|ticket)\b/))return hint('order.void');
      if(has(/\b(?:already ordered|ordered but|existing order|open order|current (?:restaurant )?(?:bill|order)|more (?:dishes|drinks|beverages|items|food)|another (?:beverage|drink|dish|dessert|item|plate)|extra (?:menu item|item|dish)|append|add.*(?:existing|current)\b|increase.*quantity|without starting another order|add.*(?:fries|dessert|drinks|food).*cart)\b/))return hint('order.additems');
      if(has(/\b(?:customer|restaurant|dinner|meal|food|bill|table)\b/) && has(/\b(?:put.*(?:on|to).*stay|post.*room|charge.*room|guest.room|room account|bill.*room|transfer.*room|room bill|post.*food charges.*(?:rather than|instead of) collect)\b/))return hint('order.roompost');
      if(has(/\b(?:start.*(?:ticket|order)|create.*order|open.*order|new order|empty in pos|take.*order|place.*order|first order|begin.*billing|begin.*ticket)\b/) && !has(/\b(?:without starting|already.*order|existing order|open order|current order)\b/))return hint('order.create');
      if(has(/\b(?:dining tables?|numbered table|table record|table layout|manage.*table|adding.*table|add.*table|configure.*tables?|new.*table)\b/) && has(/\b(?:new|add|adding|numbered|management|layout|configure|record|manage|restaurant)\b/) && !has(/\b(?:billing|begin.*bill|order|meal|customer|server)\b/))return hint('table.manage');
     }
     if(has(/\b(?:notification|notifications|unread alert|notification bell|recent alert)\b/))return hint('notification.view');
     if(has(/\b(?:activity trail|audit trail|audit log|activity log|trace.*(?:settled|posted|voided)|posted or settled charges|who.*(?:posted|settled|changed))\b/))return hint('audit.search');
     if(has(/\b(?:ticket|support|issue|request)\b/)){
      if(has(/\b(?:finished|finish\w*|fixed|handled|resolved|resolve|final status|mark.*(?:complete|resolved)|close.*(?:ticket|it)|update.*status)\b/) && !has(/\b(?:how.*submit|create|raise|new ticket)\b/))return hint('ticket.resolve');
      if(has(/\b(?:request.*help|ask.*(?:administrator|admin).*help|support request|raise.*ticket|report.*issue|create.*ticket|submit.*ticket|contact.*(?:admin|support))\b/))return hint('ticket.create');
     }
     return null;
    }

    function smart74FamilyConsistency(question,selected,evidenceId=''){
        const q=String(question||'').toLowerCase().replace(/[’]/g,"'");
        if(evidenceId)return true;
        const families=[];
        const anchors=[
            ['employee',/\b(?:employee|staff|cashier|worker|receptionist|workforce|colleague|coworker|personnel|user account|user login|login|credentials?|permissions?|privileges?|department access)\b/],
            ['receipt',/\b(?:receipt|receipts|reprint|printer|printing|printout|acknowledg\w*|receipt template)\b/],
            ['payment',/\b(?:payment|payments|tender|amount received|pay the balance|settled balance|cash received|gcash)\b/],
            ['discount',/\b(?:discount|pwd|senior citizen|vat exemption|concession)\b/],
            ['stay',/\b(?:check.?in|check.?out|guest stay|guest departure|registration of guests|arriving guest)\b/],
            ['room',/\b(?:room status|room occupancy|rooms grid|room list|vacant room)\b/],
            ['order',/\b(?:restaurant order|food order|food ticket|add.*dish|menu order|restaurant bill)\b/],
            ['table',/\b(?:restaurant table|dining table|table availability|table status)\b/],
            ['menu',/\b(?:food menu|menu catalog|menu category|menu prices?)\b/],
            ['ticket',/\b(?:support ticket|help ticket|issue ticket|support request)\b/],
            ['audit',/\b(?:audit log|activity log|audit trail)\b/],
            ['notification',/\b(?:notification bell|notifications|unread alerts?)\b/],
            ['promotion',/\b(?:promotion|promotional campaign|promo code)\b/]
        ];
        for(const [family,re] of anchors)if(re.test(q))families.push(family);
        if(families.length!==1)return true;
        const family=families[0];
        const allowed={
            employee:['employee.'],receipt:['receipt.'],payment:['payment.'],discount:['discount.'],
            stay:['stay.'],room:['room.','stay.','charge.'],order:['order.'],table:['table.','order.'],
            menu:['menu.','order.'],ticket:['ticket.'],audit:['audit.'],notification:['notification.'],
            promotion:['promotion.','discount.']
        }[family]||[];
        return allowed.some(prefix=>selected.startsWith(prefix));
    }

    function smart742VerifiedOperation(question){
        const q=String(question||'').toLowerCase().replace(/[’]/g,"'").replace(/\s+/g,' ').trim();
        const has=re=>re.test(q);
        const evidence=(id,description)=>({id,reason:'Verified capability and '+description,source:'verified-action'});
        const receipt=has(/\b(?:receipts?|reprint|acknowledg\w*|payment slips?|printouts?|print layout|thermal template)\b/);
        const discount=has(/\b(?:discounts?|pwd|senior citizen|vat exemption|concession)\b/);
        const menu=has(/\b(?:dish|dishes|menu|food item|menu item|menu category)\b/);
        const service=has(/\b(?:additional services?|incidental services?|extra services?|service catalog|service catalogue|catalog service|extra-service)\b/);
        if(receipt && has(/\b(?:reprint (?:button|control)|print (?:button|control)|receipt (?:window|preview|popup))\b/) && has(/\b(?:fail\w*|doesn.t|does not|won.t|cannot|can.t|stuck|unresponsive|not respond|not open|no response|broken)\b/))return evidence('receipt.error','printing failure');
        if(receipt && (has(/\b(?:reprint|print (?:it |this |the |an? )?(?:again|another time)|another copy|second copy)\b/) || has(/\bprint\b.*\breceipts?\b.*\bagain\b/)) && !has(/\b(?:reprint button|reprint control|printing fails|reprinting fails|cannot reprint|can.t reprint|reprint does not|reprint doesn.t|reprint won.t)\b/))return evidence('receipt.reprint','historical receipt reprinting');
        if(receipt && has(/\b(?:customiz\w*|arrang\w*|rearrang\w*|layout|align\w*|position\w*|move|relocat\w*|design|preview a redesign|build a template)\b/) && has(/\b(?:element\w*|block\w*|field\w*|heading|template|receipt|print|layout|position)\b/))return evidence('receipt.builder','visual receipt layout editing');
        if(receipt && has(/\b(?:business name|resort name|company name|business (?:details|information|contact)|brand(?:ing)?|header|footer|default paper|default size|receipt settings)\b/) && has(/\b(?:change|configur\w*|edit\w*|updat\w*|show\w*|print\w*|display\w*|set)\b/))return evidence('receipt.settings','receipt identity and branding configuration');
        if(menu && has(/\b(?:photos?|pictures?|images?|photograph\w*|descriptions?|pric\w*|categor\w*)\b/) && has(/\b(?:edit\w*|chang\w*|updat\w*|replace|upload|manage|adjust|remove|add|set|modify)\b/))return evidence('menu.manage','menu catalog editing');
        if(service && has(/\b(?:catalog|catalogue|price|pricing|rate|rates|option|configuration|configure|admin)\b/) && has(/\b(?:change|updat\w*|edit\w*|set|adjust|manage|modify|configure|create|add|where)\b/) && !has(/\b(?:post (?:it|one|the|an|a) to (?:a )?room|charge to (?:a )?room|guest(?:'s)? (?:stay|account))\b/))return evidence('service.manage','additional-service catalog management');
        if(has(/\b(?:incidental charge|additional charge|extra charge)\b/) && has(/\b(?:post|add|record|log|charge)\b/) && has(/\b(?:room|stay|guest)\b/))return evidence('charge.post','guest stay incidental charge posting');
        if(discount && has(/\b(?:refus\w*|reject\w*|fail\w*|error|disabled|cannot|can.t|won.t|doesn.t|not (?:apply|working|available|accepted)|unsuccessful|problem|troubleshoot|investigat\w*)\b/))return evidence('discount.error','discount troubleshooting');
        if(discount && has(/\b(?:apply|enter|use|grant|select|give)\b/) && !has(/\b(?:refus\w*|reject\w*|fail\w*|error|disabled|cannot|can.t|won.t|doesn.t|not working|troubleshoot|investigat\w*)\b/))return evidence('discount.apply','eligible discount application');
        if(has(/\b(?:payment|tender|balance|charges?)\b/) && has(/\b(?:settle|record|collect|mark.*settled|pay|paid|received)\b/) && !has(/\b(?:fail\w*|error|reject\w*|cannot|can.t|doesn.t|stuck|unpaid after)\b/) && !has(/\b(?:nightly|rental fee|external gateway|charge card|online card)\b/))return evidence('payment.record','payment record settlement');
        return null;
    }

    function smart73Decide(question,ranked,classicId,previousTopic=''){
     const boundary=smart74Boundary(question,previousTopic);
     if(boundary)return {id:boundary.status==='clarify'?'__clarify__':'__unsupported__',reason:boundary.reason,source:'capability-boundary'};
     const scope=smart73Scope(question,previousTopic);
     const operationEvidence=smart742VerifiedOperation(question);
     const taskEvidence=smart73DomainEvidence(question);
     if(scope && (scope.status!=='clarify'||scope.reason==='Multiple independent workflows; ask which to address first'||!(operationEvidence||taskEvidence)))return {id:scope.status==='clarify'?'__clarify__':'__unsupported__',reason:scope.reason,source:'guard'};
     if(operationEvidence)return operationEvidence;
     if(taskEvidence)return taskEvidence;
     const classic=classicId||'__unsupported__';
     const rankedCandidates=ranked||[];
     const first=rankedCandidates[0];
     if(!first)return {id:'__unsupported__',reason:'No model evidence for a verified workflow',source:'capability-boundary'};
     const signalIds=Object.keys(smart73ActionSignals(question)).filter(id=>smart73ActionSignals(question)[id]>0);
     if(!taskEvidence && !signalIds.length){
         return {id:'__unsupported__',reason:'No verified action evidence; semantic similarity alone cannot establish feature support',source:'capability-boundary'};
     }
     const choices=rankedCandidates.slice(0,5).map(x=>({id:x.id,score:x.score+(x.id===classic?0.05:0)}));
     if(classic&&!classic.startsWith('__')&&!choices.some(x=>x.id===classic))choices.push({id:classic,score:0.33});
     choices.sort((a,b)=>b.score-a.score);
     let selected=choices[0]?.id||classic;
     const q=String(question).toLowerCase().replace(/[’]/g,"'");
     const confident=(id)=>rankedCandidates.slice(0,5).some(x=>x.id===id)||classic===id;
     const force=(id,re)=>{if(re.test(q)&&confident(id))selected=id;};
     force('employee.deactivate',/\b(?:resigned|terminated|ex-cashier|no longer log in|disable.*(?:employee|staff|account|cashier)|block.*(?:old employee|account)|switch.*access.*off)\b/);
     force('employee.activate',/\b(?:reactivate|restor\w*.*account|back at work|returning after leave|made operational again|turn.*account.*on again)\b/);
     force('employee.permissions',/\b(?:department privileges|permission\w*|which dashboards|department access|both departments|both work areas|front desk plus restaurant|change.*(?:dashboard|access)|authorize.*(?:work|department))\b/);
     force('employee.find',/\b(?:not add one|don't add|not create|workforce account directory|roster|which employees.*active)\b/);
     force('receipt.reprint',/\b(?:reprint|copy of proof of payment|second copy|printed again|previously issued|past receipt|another copy|yesterday.s payment slip)\b/);
     force('receipt.error',/\b(?:receipt|print|preview|proof of payment)\b.*\b(?:can.t open|doesn.t open|blank|failed|not print|never appears|stays blank)\b/);
     force('payment.error',/\b(?:payment|collect payment|payment confirmation|payment screen|operation)\b.*\b(?:won.t finish|cannot|can.t|failed|doesn.t|never completes|not reflect|still shows unpaid|won.t record)\b/);
     force('payment.record',/\b(?:record cash|cash actually collected|register cash|collect payment|received cash|record a partial payment)\b/);
     force('stay.checkout-error',/\b(?:checkout|check out|guest departure|departure)\b.*\b(?:unpaid|unsettled|blocked|won.t finish|cannot|failed|unavailable)\b/);
     force('stay.checkout',/\b(?:finalize.*departures|guest.*depart|finish.*stay|complete.*checkout|guest.*leav)\b/);
     force('order.additems',/\b(?:already saved.*add|add.*one more plate|increase the quantity|existing food ticket|in.progress food ticket)\b/);
     force('order.roompost',/\b(?:table.s food.*guest room|post.*food.*room|charge.*meal.*room|bill.*linked.*room)\b/);
     force('ticket.resolve',/\b(?:mark.*ticket.*resolved|finalize a handled.*issue|repaired.*mark.*ticket|finish.*workplace issue)\b/);
     if(selected!==classic && !rankedCandidates.some(x=>x.id===selected) && first.score<0.43)selected=classic;
     if(!smart74FamilyConsistency(question,selected,taskEvidence?.id||'')){
         const replacement=choices.filter(x=>smart74FamilyConsistency(question,x.id,'') && x.score>=0.45);
         if(replacement.length && replacement[0].score>=0.60)selected=replacement[0].id;
         else return {id:'__unsupported__',reason:'Task family conflicts with the requested operation; no guide was guessed',source:'capability-boundary'};
     }
     return {id:selected,reason:selected===classic?'Classical corroboration':'Semantic task reranking',source:selected===classic?'hybrid-classic':'hybrid-semantic'};
    }

    function smart73Guard(question,previousTopic=''){
        const boundary=smart74Boundary(question,previousTopic);
        if(boundary)return boundary;
        const scope=smart73Scope(question,previousTopic);
        const operationEvidence=smart742VerifiedOperation(question);
        const taskEvidence=smart73DomainEvidence(question);
        if(scope && (scope.status!=='clarify'||scope.reason==='Multiple independent workflows; ask which to address first'||!(operationEvidence||taskEvidence)))return scope;
        const legacy=smartNlpRoute(question,previousTopic);
        if(legacy?.status && !(legacy.status==='clarify' && (operationEvidence||taskEvidence)) && !/\b(?:dessert|menu catalog|food catalog)\b/i.test(question))return {status:legacy.status,reason:'Existing verified NLP safeguard'};
        return null;
    }
    function smartSemanticBest(scores,query,initial){
        const ranked=smartSemanticRankScores(scores);
        // Classifiers only supply candidate rankings. Permission to instruct
        // comes exclusively from the deterministic 7.4.4 safety evidence.
        const decision=smart744Policy(query,null);
        smartSemanticLastRanking={source:decision.source,reason:decision.reason,
            candidates:ranked.slice(0,5).map(x=>({id:x.id,score:Number(x.score.toFixed(4))})),decision:decision.id,evidence:decision.evidence||null};
        if(decision.id==='__clarify__')return {status:'clarify'};
        if(decision.id==='__unsupported__')return {status:'unknown'};
        return smart744AnswerFor(decision)||{status:'unknown'};
    }
    async function smartSemanticResolve(question,requestId,initialResult,expectedRole,expectedEmployee){
        try{
            const rows=await smartSemanticPrepare();
            if(requestId!==smartSemanticRunId || role!==expectedRole || String(employee()?.id||'')!==expectedEmployee)return;
            smartSemanticSetStatus('checking','Comparing your question with resortOS tasks…');
            const vector=(await smartSemanticEmbed([question]))[0];
            if(requestId!==smartSemanticRunId || role!==expectedRole || String(employee()?.id||'')!==expectedEmployee)return;
            const scores=smartSemanticScores(rows,vector);
            const match=smartSemanticBest(scores,question,initialResult);
            if(requestId!==smartSemanticRunId || role!==expectedRole || String(employee()?.id||'')!==expectedEmployee)return;
            if(match?.status){
                smart73AskStatus=match.status;
                smartAnswer=null;
                smartSemanticSource='guard';
                smartSemanticSetStatus('ready',match.status==='clarify'?'More context is needed':'No verified resortOS procedure found');
            }else if(match){
                smart73AskStatus=null;
                smartAnswer=match;
                smartLastNlpTopic=match.intent.topic;
                smartSemanticSource='semantic';
                smartSemanticSetStatus('ready','Answer matched by semantic language model');
            }else{
                smartSemanticSource='classic';
                smartSemanticSetStatus('ready','Verified task matching is active');
            }
            if(helpMode==='panel' && smartQuestion===question && smartView==='ask'){
                const target=document.querySelector('.smart-ask-message-assistant');
                if(target)target.innerHTML=`<div class="smart-ask-assistant-label"><span class="smart-ask-mini-orb">✦</span><strong>SmartHelp</strong><span>Verified guidance</span></div>${smartAnswerMarkup()}`;
            }
        }catch(e){
            if(requestId!==smartSemanticRunId || role!==expectedRole || String(employee()?.id||'')!==expectedEmployee)return;
            smartSemanticSource='classic';
            smartSemanticError=String(e?.message||e).slice(0,180);
            smartSemanticLastRanking={source:'guard',reason:'Model inference or load failed; avoiding unverified instructions',candidates:[]};
            smart73AskStatus='unknown';
            smartAnswer=null;
            smartSemanticSetStatus('unavailable','Could not verify an answer safely. Please use Help Articles or Support & Issues.');
            if(helpMode==='panel'&&smartQuestion===question&&smartView==='ask'){
                const target=document.querySelector('.smart-ask-message-assistant');
                if(target)target.innerHTML=`<div class="smart-ask-assistant-label"><span class="smart-ask-mini-orb">✦</span><strong>SmartHelp</strong><span>Verified guidance</span></div>${smartAnswerMarkup()}`;
            }
        }
    }
    function smartSemanticStatusMarkup(){
        if(!smartQuestion)return '';
        const msg=smartSemanticMessage||'Looking for the best verified resortOS task…';
        return `<div class="smart-semantic-status" id="smart-semantic-status" data-state="${esc(smartSemanticState)}" role="status" aria-live="polite">${esc(msg)}</div>`;
    }
    const smartTypoKnownEnglish = new Set('a abandon abandoned abandoning abandonment abashed abbe abdomen abdominal abduction ability able abnormal abnormally abolish abolished abolishing abolition abolitionists abominable about above abroad abrupt abruptly abscess abscesses absence absent absolute absolutely absorbed absorption abstract absurd abundance abundant abuse abuses accent accept accepted accepting access accessible accessing accident accidental accidentally accidents accompanied accompany accompanying accomplish accomplished accord accordance according accordingly account accountant accounts accumulated accumulation accurate accurately accused accustomed achieved achievement achievements aching acid acknowledge acknowledged acknowledgement acquaintance acquaintances acquainted acquire acquired acquisition acre acres across act acted acting actinomyces actinomycosis action actions activate active actively activities activity acts actual actually acute adams adapted add added adding addition additional additions address addressed addresses addressing adds adenoma adequate adherent adhesions adjacent adjoining adjust adjusted adjutant adjutants adler admin administered administration administrations administrative administrator admirable admiration admired admission admit admits admitted admitting adobo adopt adopted adoption adored adult adults advance advanced advancing advantage advantageous advantages adventure adventures adverse advertisement advice advisable advise advised advisers advocate advocated advocates aet affair affairs affect affectation affected affecting affection affectionate affectionately affections affects afferent afford afforded affording affords afraid afresh africa after afternoon afterward afterwards again against age aged agencies agency agent agents ages aggravated aggression aggressive agitated agitation ago agony agree agreeable agreed agreement agricultural agriculture ahead aid aide aided aides aim aimed aims air airline airport akin alabama alarm alarmed alaska albany alcohol alert alerts alexander alexeevich alexis alice alien aliens alike alive all alleged allegiance alliance allied allies allow allowance allowed allowing allows ally almost alone along aloud alpatych already also altar alter alteration alterations altered alternative although altogether always amazed amazement amazing ambassador ambition amenable amendment amendments america american americans amiable amid ammunition amnesty among amongst amount ample amputation amuse amused amusement amusing an anaesthesia anaesthetic analysis anatole anatomical anatomy ancient ancients and andrew aneurysm aneurysmal aneurysms angel anger angioma angle angles angrily angry animal animals animated animation anisya ankle ankylosis anna anne annette annexation announce announced announcement annoyance annoyed annual annually another answer answered answering answers antecedent anterior anteroom anthrax anti anticipated antiseptic antiseptics anus anxiety anxious anxiously any anybody anyhow anyone anything anywhere aorta apart apartment apartments apologize apology app appalachians apparatus apparent apparently appeal appealed appeals appear appearance appearances appeared appearing appears append appendix appetite apple appliances applicable application applications applied apply applying appointed appointment appointments apportioned apposition appreciate appreciated approach approached approaching appropriate approval approve approved approximately april apron apt arakcheev arbitrary arbitration arborescent arch archduke architect archive ardent are area areas aren argued argument arguments arise arises arising aristocracy aristocratic arizona arkansas arm armchair armed armfeldt armies arms army arose around arouse aroused arousing arrange arranged arrangement arrangements arranging arrest arrested arresting arrival arrive arrived arriving arsenic arsenical art arterial arteries arterio arteritis artery arthritis arthropathies arthur article articles articular artificial artillery artisans arts as ascended ascending ascertain ascii ascribed aseptic ashamed ashes aside ask asked asking asks asleep aspect aspects assailed assault assembled assemblies assembly assent assented asserted assign assigned assist assistance assistant assistants associate associated association assume assumed assumes assuming assumption assurance assure assured assuring astonished astonishment astounding astronomy asylum at ate atlantic atmosphere atrophy attach attached attachment attack attacked attacking attacks attain attained attainment attains attempt attempted attempting attempts attend attendance attendant attended attending attention attentions attentive attentively attenuated attitude attract attracted attraction attractive attribute attributed audible audience audit auersperg august aunt aureus auricular austerlitz australia australian austria austrian austrians author authorities authority authorized authorizing authors automatically autumn avail availability available avenue average avert avoid avoided avoiding avulsion await awaited awaiting awake awakened awakening aware away awe awful awfully awhile awkward awkwardly awkwardness awoke axilla axillary axis baby bachelor bacilli bacillus back background backs backward backwards bacon bacteria bacterial bad badge badly bag baggage bagration bags baker balaga balance balances balashev balcony bald ball balloon ballot ballroom balls baltimore band bandage bandaged bandages bands bank banker bankers banking banks banner bar barclay bare bargain bark barn baron barred barrier base based baseness basis basketball bass bast bath bathed baths battalion battalions batteries battery battle battlefield battles bay bayonets bazdeev beamed beaming beams bear beard bearers bearing bears beast beat beaten beating beausset beautiful beauty became because beckoned become becomes becoming bed bedroom beds bedstead bee beeches beef been beer bees before beforehand beg began beggar begged begging begin beginning beginnings begins begun behalf behave behaved behind being beings belief believe believed believes believing bell bells belly belong belonged belonging belongings belongs belova beloved below belt bench bend bending beneath benefactor beneficial benefit benjamin bennigsen bent berezina berg berlin berthier beside besides best bet betray betrayed betraying betrothed better between bewildered beyond bezukhov bezukhova bible biceps bier big biggest bilateral bilibin bill billing billion bills bind binding biographical bir birch birches bird birds birth biscuit bismuth bit bitch bite bites biting bitten bitter bitterly bitterness black bladder blade blame blamed blandly blank bleed bleeders bleeding bless blessed blessing blew blind bliss blissful blister blisters block blockade blocked blocking blocks blonde blood bloodless bloodstained bloody blow blowing blown blows blue bluetooth bluish blunt blush blushed blushing board boards boasted boat boats bodies body bogdanich bogdanovna bogucharovo bohemia boil boiled boiling boils bold boldly boldness bolkhovitinov bolkonskaya bolkonski bonaparte bond bondage bondmen bonds bone bones bony book books boom boone boot boots booty boracic border borders bore bored boris born borne borodino borrowed borzoi borzois boscombe bosom boss bosses boston both bottle bottles bottom bought bound boundaries boundary bounded bounds bourienne bow bowed bowels bowing box boxes boy boys brachial bradstreet brain branch branches branding brandy braunau brave breach bread breadth break breakdown breakfast breaking breaks breast breath breathe breathed breathing breathless breckinridge bred breeches brick bride bridge bridges brief briefly bright brightened brighter brightly brilliant bring bringing brings briony brisk briskly bristol britain british brittle broad broadsheets brodie broke broken brother brotherhood brothers brought brow brown brownish brows browser bruised bruising bruit brunn brush brushed bryan bubo buffalo buffoon build builder building buildings built bulk bullet bullets bundle bundles buonaparte burden burdened burdens bureau buren buried burke burn burned burning burns bursa bursae bursal bursitis burst bursting bursts bushes bushy business businesses bustle busy but butler buttock button buttoned buxhowden buy buying buzzing by cab cabin cabinet cadet caesar cafeteria calamity calcaneus calcification calcified calculated caleche calf calhoun california call called callender calling callous calls callus calm calmly came camp campaign campaigns campfire campfires camps can canada canal canals cancel cancellous cancer cancerous cancers candidate candidates candle candles cannon cannonade cannot cant cap capable capacity capillaries capillary capital capitalists caps capsular capsule captain captains captivity capture captured carbolic carbon carbuncle carcinoma card cardiac cards care cared career careful carefully careless carelessly cares caressing caribbean caries carious carolina carolinas carotid carpenters carpet carpets carriage carriages carried carries carry carrying cart cartilage cartilages cartilaginous carts case caseation caseous cases cash cashier cashiers cashing cast casting castle casual casually cat catalog catch catching categories category catgut cathedral catherine catholic catholics catiche cattle caucus caught causation cause caused causes causing caustic cautery caution cautious cautiously cavalry cavernous cavities cavity cease ceased ceases cebu ceiling celebrated cell cellar cells cellular cellulitis censure cent center centered centers central centre cents centuries century ceremony certain certainly certainty cervical cession chain chains chair chairs chalk challenge challenged chamber champagne champion chance chances chancre change changed changes changing channel channels chap chapter character characterised characteristic characteristics characterized characters charcoal charcot charge charged charges charging charles charleston charm charming charred chart charter chartered charters chase chat cheap check checked checkout cheek cheeks cheered cheerful cheerfully chemical cher chere cherished cherry chest chestnut chicago chichagov chicken chief chiefly child childhood childish childlike children chill chimney chin china chinese chisel choice choked choking chondro chondroma chondromas choose choosing chose chosen christ christian christmas chronic church churches cicatricial cicatrix cigar circle circles circular circulating circulation circumscribed circumstances cirsoid cited cities citizen citizens citizenship city civil civilian civilians civilization civilized clad claim claimed claims clair clamor clark clash clasped class classes classification classify clatter clause clavichord clavicle clavicular clay clean cleanliness clear cleared clearer clearing clearly clearness clergy clergyman clerk cleveland clever clicked client climate climbed clinging clinical clinically cloak cloaks clock close closed closely closer closing clot cloth clothes clothing clots cloud clouds club clue clung clutched clutching coach coachman coagulation coal coarse coast coat coats coburg cocci cock cocked code codes coffee coffin coin coinage coincidence cold coldly coldness collapse collapsed collar collateral colleague colleagues collect collected collecting collection collective college colleges collision collodion colloid colon colonel colonial colonies colonists colonization colony color colorado colored colour coloured columbia column columns coman combat combination combinations combine combined come comes comet comfort comfortable comfortably comforted comforting comforts coming command commanded commander commanders commanding commands commence commencement commences comment commerce commercial commissariat commission commissioners commissions commit committed committee committees commodities commodore common commonest commonly commonplace commons commonwealth communicate communicated communicating communication communities community compact companies companion companions company comparative comparatively compare compared comparison compel compelled compensation competition complain complained complains complaint complete completed completely completing complex compliance compliant complicated complication complications comply composed composition composure compound comprehend comprehensible compressed compression compromise compulsory computer comrade comrades conceal concealed concealing conceive concentrated concentration conception concern concerned concerning concerns concessions conciliation conclude concluded conclusion conclusions conclusive condemn condemned condemning condition conditions conduct conducted conducting confederacy confederate confederates confederation confer conference conferences conferred confess confessed confession confidence confident confidential configure configured confine confined confirm confirmation confirmed conflict conflicting conflicts confronted confused confusion congenital congested congestion congratulate congregation congress congressional conjecture conjunction connect connected connecticut connecting connection connections connective conquer conquered conqueror conquest conscience conscious consciousness consent consequence consequences consequently conservation conservative conservatory consider considerable considerably consideration considerations considered considering considers consist consisted consistence consistent consisting consists consolation consolidated conspicuous conspiracy constant constantly constitute constituted constitutes constituting constitution constitutional constitutions constricting constructed construction consult consultation consulting contact contain contained containing contains contaminated contemplate contemporaries contemporary contempt contemptible contemptuous contemptuously contended content contented contents contest contests continent continental contingencies continual continually continue continued continues continuing continuity continuous continuously contour contract contracted contraction contracts contracture contradict contradiction contradictory contrary contrast contribute contributed contributions control controlled controversies controversy contused contusion contusions convalescence convenience convenient convention conventions conversation conversations conversing convert converted convey conveyed conviction convince convinced convincing convoy cook cool cooperation cooperative copied copies copious copper copse copy copying copyright cord cordial cordially cords cork corn corner corners corns cornwallis coroner coronet corporal corporation corporations corps corpses corpus corpuscles correct corrected correctly correspond correspondence corresponding corridor corrupt corruption cortex cossack cossacks cost costly costs costume cot cotton couch cough coughed could couldn council councils counsel count counted countenance counter counters countess counties counting countries country countrymen countryside county couple couples courage courier course courses court courtesy courtiers courts courtyard cousin cover covered covering covers coveted cowboy coworker crack cracked crackling craft crash crazy creak creaked creaking cream create created creates creating creation creature credit creditors crept crew cried cries crime crimes criminal criminals crimson crippled crisis critical criticism critics crop crops cross crossed crosses crossing crowd crowded crowding crowds crown crowned cruel cruelly cruelty crumpled crush crushed crushing crust cry crying cuba cuban cultivated cultivation culture cumberland cunning cup cupboard cure curiosity curious curled curling curls curly currency current currently curtain curve curved curving custom customary customer customize customs cut cutaneous cutting cylinders cyril cyst cystic cysts dactylitis dagger daily dakota dam damage damaged damages damp dance danced dancer dancing danger dangerous dangers daniel danilovna danube dare dared daring dark darkness darling darted dash dashboard dashboards dashed dashing data date dates daughter daughters david davis davout dawn day daylight days deacon deactivate deactivated dead deadly deaf deafening deal dealing dealt dear dearest death debate debates debilitated debt debts decade decades deceased deceive deceived december decent deception decide decided decidedly decision decisions decisive declaration declare declared declaring decline declined decorations decree decreed dedicated deduce deduced deductible deduction deed deeds deemed deep deeper deepest deeply defeat defeated defect defective defects defend defended defending defense defensive deference defiance define defined definite definitely definition deformans deformities deformity degeneration degree degrees deity dejected delaware delay delayed delegate delegates delete deleting deliberate deliberately delicacy delicate delicious delight delighted delightful delirious delirium deliver delivered deltoid demand demanded demanding demands demarcation democracy democrat democratic democrats demonstrated demonstration den denied denisov denounced dense denser deny departed department departmental departments departure depend depended dependence dependent depending depends deposit deposited deposits depressed depressing depression deprive deprived depriving depth depths deputation derive derived dermoids des descend descended descending descent describe described describing description desert deserted deserved design designed designs desirable desire desired desires desk despair despairing desperate desperately desperation despise despised despite dessalles desserts destination destined destiny destroy destroyed destroying destruction destructive detached detachment detachments detail detailed details detained detected detective determination determine determined determining develop developed developing development develops device devices devil devils devise devised devitalised devoid devote devoted devotion dew dewey diabetes diagnosed diagnosis diagnostic diam diamond diaphysis diary did didn die died dies diet dieu differ differed difference differences different differential differentiate differentiated differently differs difficult difficulties difficulty diffuse diffused digital dignified dignity dilatation dilate dilated dim dimensions diminish diminished diminishes diminishing diminution dimly dimmler dine dined dining dinner dinners dip diphtheria diplomacy diplomat diplomatic diplomatist diplomatists direct directed directing direction directions directly director directory dirt dirty disabilities disability disable disabled disagreeable disappear disappearance disappeared disappears disappointment disaster disastrous discharge discharged discipline disclaimer discoloration discoloured discomfort disconcerted discontent discount discounts discover discovered discovery discretion discrimination discuss discussed discussing discussion discussions disease diseased diseases disfigurement disgrace disgraceful disguise disgust dish dishes dishonorable disinfected disinfection disintegration disk dislike disliked dislocated dislocation dismay dismissed dismounted disorder disordered disorders dispatch dispatched disperse dispersed displaced displacement display displayed displaying displeased disposal dispose disposed disposition dispositions dispute disputed disputes disputing dissatisfaction dissatisfied dissection dissemination dissensions dissolution dissolved distal distance distant distended distension distinct distinction distinctly distinguish distinguished distorted distracted distress distressed distressing distribute distributed distributing distribution district districts disturb disturbance disturbances disturbed disturbing ditch diverse diversity diverted divide divided dividing divine division divisions dmitri dmitrich dmitrievna do doctor doctors doctrine doctrines document documentary documents does doesn dog dogs doing doings dokhturov dolgorukov doll dollar dollars dolokhov domain domestic dominance dominated domingo dominion dominions domo don donate donation donations done door doors doorway doran dorogomilov dorsal dorsum dose doses double doubled doubly doubt doubted doubtful doubtless doubts douglas down downcast downhill downstairs downward downwards dowry dozen dozens draft drafted drag dragged dragging dragoons drain drainage drained dram dramatic drank drastic draw drawer drawing drawn dread dreaded dreadful dreadfully dream dreamed dreams dred dress dressed dresses dressing dressings drew dried drift drink drinking drinks drissa drive driven driver drives driving dron dronushka drooping drop dropdown dropped dropping drops drove drown drowned drubetskaya drubetskoy drug drugs drummer drums drunk drunkard drunken dry drying dual duc duct ducts due duel dug duke dull duly duncan dunyasha duplicate duplicated duplicates duplicating duration during dusk dusky dust dusty dutch duties duty dwelt dying each eager eagerly eagle ear earlier earliest early earn earned earnest earnestly ears earth earthly ease easier easily east eastern easy eat eaten eating ebook ebooks economic economy ecstatic eczema edge edges edinburgh edit edited edition editions editor edmund educated education educational effect effected effective effects efficacious efficient effort efforts effusion egg eight eighteen eighteenth eighth eighty either ejaculated elapsed elastic elbow elbows elder elderly elders eldest elect elected election elections electoral electors electric electrical electricity electrolysis electronic electronically elegant element elements elephantiasis elevated elevation eleven elicited eligibility eligible elizabeth eloquent else elsewhere elson emaciated email emancipated emancipation embarrassed embarrassing embarrassment embassy embedded emboli embolic embolism embolus embrace embraced embracing embroidered emerged eminent emotion emotional emotions empereur emperor emperors emphasis empire employ employed employee employees employer employers employment empowered empress emptied empty empyema enable enabled enact enacted enactment encapsulated enchanting enclosed encounter encountered encourage encouraged encouraging end endeavoured ended ending endless endorsed endothelial endothelium endowed ends endure endured enemies enemy energetic energy enforce enforced enforcement engage engaged engagement engine engineer england english englishman engrossed enjoy enjoyed enjoying enjoyment enlarge enlarged enlargement enlisted enns enormous enormously enough enraptured enroll enrolled ensue ensued ensues ensure entangled enter entered entering enterprise enterprises enters entertain entertained entertaining enthusiasm enthusiastic entire entirely entitled entity entrance entreaty entrusted entry enumerate envelope enveloped envious envoy envy epidermis epiphyses epiphysial epiphysis episode epithelial epithelioma epithelium epoch equal equality equally equipment equipped equivalent era erase erect erected erie ermolov erosion erratic error errors eruption eruptions erysipelas erza esaul escape escaped escapes escaping escort especially essence essential essentially est establish established establishing establishment estate estates esteem estimate estimated etc eternal eternity europe european eusol evacuation evanescent eve even evening evenings event events eventually ever everted every everybody everyday everyone everything everywhere evidence evident evidently evil evils evoked evolution exact exactly exaggerated exalted examination examine examined examining example examples exceeded exceeding exceedingly excellency excellent except exception exceptional exceptions excess excessive exchange exchanged exchanging excise excised excising excision excited excitement exciting exclaimed exclamation exclude excluded excluding exclusion exclusive exclusively excuse execute executed executing execution executive exempt exemption exercise exercised exercises exerted exertion exhausted exhaustion exhibit exile exist existed existence existing exists exit exostoses exostosis expanded expansion expect expectation expectations expected expecting expedition expense expenses expensive experience experienced experiences experiencing experiment experiments expired explain explained explaining explains explanation explanations exploit exploits exploration exploring export expose exposed exposing exposure express expressed expresses expressing expression expressions expressly extend extended extending extends extension extensive extensor extensors extent external externally extra extraordinary extravasated extreme extremely extremities extremity exudate exudation eye eyebrows eyed eyelids eyes eyford face faced faces facial facilitate facilities facility facing fact faction factor factories factors factory facts faded fail failed failing fails failure faint fair fairly faith faithful faithfully fall fallen falling falls false falsehood fame familiar families family famous fancied fancies fancy fantastic far farewell farm farmer farmers farming farms farther farthest fascia fasciae fascinating fashion fashionable fashioned fast fastened faster fastest fat fatal fate fateful father fatherland fathers fatigue fatty fault faulty favor favorable favored favoring favorite favors favour favourable favoured favours fear feared fearing fears feather feature features february fed federal federalist federalists federation fedorovna fee feeble feebly feed feeding feel feeling feelings feels fees feet fell fellow fellows felt female feminine femoral femur fence ferapontov ferdinand fertile fetch fetched fete feudal fever feverish few fewer fi fibres fibrin fibrinous fibro fibroblasts fibroma fibromatosis fibrosa fibrositis fibrous fibula field fields fierce fiercely fifteen fifteenth fifth fifty fig fight fighting figs figure figures filaments file fili fill filled filling fills filter final finalize finally finance finances financial find finding finds fine finely finest finger fingers finish finished finishing fire fired fires firing firm firmly firmness first fish fishing fiske fists fistula fit fits fitted fitting five fix fixed fixedly fixing flag flame flames flank flap flared flash flashed flat flattered flattering fleches fled flee fleeing fleet flesh flew flexed flexion flexor flight floating flood floor flora florida flour flourish flourished flourishing flow flowed flower flowers flowing fluctuating fluctuation fluid fluids flung flush flushed flushing fly flying foci focus foe foes fog fold folded folds folk folks follicles follow followed followers following follows folly fomentations fond food fool foolish fools foot footer footing footman footmen footsteps for forbade forbid forbidden forbidding force forced forceps forces forcible forcibly forearm forehead foreign foreigner foreigners foremost foresaw foresee foreseen foresight forest forests forever forfeit forge forget forgetting forgive forgiven forgiveness forgot forgotten form formal format formation formed former formerly formidable forming forms fort forth forthcoming fortified fortnight fortunate fortunately fortune fortunes forty forward forwards fought foul found foundation foundations founded four fourteen fourteenth fourth fourths fox fracture fractured fractures fragment fragments frame framed framework framing france francis francisco frank franklin frankly frankness fraud free freed freedmen freedom freehold freeholders freely freemasonry freemasons freight french frenchman frenchmen frenchwoman frequency frequent frequently fresh freshly freshness friction friday fried friend friendly friends friendship fries frieze fright frighten frightened fringes fro frock from front frontal frontier frontiers frost frown frowned frowning frozen fruit fruits fugitive fugitives fulfill fulfilled fulfillment full fuller fully fun function functional functions fund fundamental funding funds funeral fungating funny fur furious furnish furnished furniture furs further fury fusiform fuss futile future gaiety gaily gain gained gaining gains gallant gallery gallop galloped galloping game gang ganglia ganglion gangrene gangrenous gap garden gardens garfield garlic garments garrison gas gasped gate gates gateway gather gathered gathering gauze gave gay gaze gazed gazing gcash geese gems general generalised generally generals generation generations generosity generous genitals genius gentle gentleman gentlemen gently gentry genuine geographical george georgia gerasim german germans germany gesture get gets getting giant gift gigantic girl girls girth give given gives giving glad gladly glance glanced glances glancing gland glanders glands glandular glass glasses gleam gleamed glimpse glitter glittered glittering globe gloom gloomily gloomy glorious glory glove gloves glow glowing gluteal glycerin go goal god goes going gold golden gone gonorrhoea gonorrhoeal good goodness goods goose gorki gospel gossip got gout gouty govern governed governess governesses governing government governments governor governors gown grabern grace graceful gracious graciously grade gradual gradually graft grafting grafts grain grains grand grandeur grandfather grant granted granting grants granulating granulation granulations grapeshot grasp grasped grasping grass grateful gratefully grating gratitude grave gravely gravity gray great greatcoat greatcoats greater greatest greatly greatness greeley green greenbacks greenish greet greeted greeting greetings grenville grew grey greyish grid grief grievances grieved grim grimace grip grizzled groan groaned groans groin groom groove gross ground grounds group groups grow growing grown grows growth growths grudge guarantee guard guards guerrilla guess guessed guessing guest guests guidance guide guided guilt guilty guitar gulf gumma gummata gummatous gun gunpowder guns gut gutenberg gypsy habit habits habitual had hadn haematoma haemophilia haemorrhage haemorrhages hair haired hairs hairy half halfway hall halo halt halted halting hamilton hampshire hand handed handful handing handkerchief handle handled handles handling hands handsome hang hanged hanging happen happened happening happens happier happily happiness happy harbor hard hardened harder harding hardly hare harm harmful harmony harness harnessed harriet harrison harsh hart hartford harvard harvest has hasn haste hasten hastened hastening hastily hat hate hated hatherley hatred hats have haven having hawaii haworth hay hayes head headache headed header heading headlong headquarters heads heal healed healing heals health healthy heap hear heard hearing hears heart heartily hearts hearty heat heated heaven heavens heavier heavily heavy heed heel heels height heights heir heiress held helene help helped helper helping helpless hemp hence hendrikhovna henry her herd here hereditary hernia hero heroes heroic heroism hers herself hesitated hesitating hesitation hey hid hidden hide hideous hiding high higher highest highly highness highroad highways hill hills him himself hind hinder hindered hindrance hint hinted hints hip hippolyte hired his historian historians historic historical histories history hit hitherto hive hoarse hold holder holders holding hole holiday holland hollow holmes holy home homes homestead homesteads honest honey honor honorable honored honors honour hood hoofs hope hoped hopeless hopelessly hopes hoping horace horizon horn horner horns horrible horrid horrified horror horrors horse horseback horseflesh horsemen horses horsham hosmer hospital hospitals host hostess hostile hostility hot hotel hounds hour hourly hours house household housemaid houses houston how however http huddled hudson hue huge hum human humanity humble humerus humiliating humiliation humor humored hundred hundreds hung hungary hunger hungry hunt hunter hunters hunting huntsman huntsmen hurrah hurried hurriedly hurry hurrying hurt husband husbands hussar hussars hut hutchinson hyaline hydatid hydraulic hydrogen hydrops hygroma hyperaemia hyperostosis hypertrophied hypodermic hysterical i ice ichthyol icon icons idea ideal ideals ideas identical identify identities identity idiot idle idleness if ignorance ignorant iii ilagin iliac ill illegal illegitimate illinois illness illustrate illustrated illustration ilya ilyin image imagination imagine imagined imagining immediate immediately immense immigrants immigration immunity impaction impaired impairment impatience impatient impatiently impeachment impending imperfect imperfectly imperial imperialism impetus implicate implicated implication implied implies imploring imply import importance important importation imported imports imposed imposing impossibility impossible impracticable impress impressed impression impressions imprisoned imprisonment improper improve improved improvement improvements improving impulse impulses in inability inactive inaugurated inauguration incapable incessant incessantly inch inches incident incidental incidents incised incision incisions inclination incline inclined include included includes including incoherent income incomes incoming incomplete incomprehensible inconvenience incorporated incorrect increase increased increases increasing incredible incubation incurred indecision indeed indefinite indefinitely indentured independence independent independently index india indian indiana indians indicate indicated indicates indicating indication indications indies indifference indifferent indirect indirectly indispensable individual individuals indolent induce induced inducing induction indulgence indurated induration industrial industries industrious industry inevitability inevitable inevitably infamous infant infantry infants infect infected infection infections infective inferior infiltration infinite infinitely inflamed inflammation inflammations inflammatory inflicted influence influenced influences inform information informed informing infrequently ingenious inguinal inhabitants inherent inheritance inherited initial initiated initiative injected injection injections injunction injured injuries injurious injury injustice ink inn inner innocence innocent innominate innumerable inoculation input inquire inquired inquiries inquiring inquiringly inquiry insane insensitive inserted insertion inside insidious insignificance insignificant insist insisted insolent insoluble inspect inspection inspector inspiration inspired instance instances instant instantly instead instinct instinctively instituted institution institutions instructed instruction instructions instructive instrument instruments insufficient insult insulted insurrection intact integrate integrity integument intellect intellectual intelligence intelligent intended intending intense intensity intent intention intentions intently intercourse interest interested interesting interests interfere interfered interference interferes interfering interior intermediate internal international interpretation interpreter interrupt interrupted interrupting interstate interstitial interval intervals intervening intervention interview intestinal intestine intima intimacy intimate intimately into intolerable intoxication intra intrigue intrigues introduce introduced introducing introduction invade invaded invading invalid invariably invasion invent invented invention inventory invested investigation invisible invitation invite invited inviting invoice involuntarily involuntary involve involved involvement involves involving iodide iodine iodoform iogel iowa ireland irene irish iritis iron ironic ironical ironically irony irregular irregularly irrepressible irresistible irresistibly irrigation irritability irritable irritant irritated irritating irritation is island islands isn isnt isolated issue issued issues issuing it italian italy item items its itself ivan ivanovich ivanovna ivanych ivory jabez jacket jackson jacksonian jail james jamestown january japan japanese jaw jaws jay jealous jealousies jealousy jefferson jeffersonian jerked jersey jest jesting jesus jewel jews jingling job john johnson join joined joining joint joints joke jokes joking jolted jones joseph journey joy joyful joyfully joyous joys judge judged judges judging judgment judicial judiciary jugular julie july jump jumped jumping junction junctions june jurisdiction jurisprudence jury just justice justification justified justify kaluga kansas karagina karagins karataev karay karl karp kaysarov keen keenly keep keeper keeping keeps keloid kentucky kept kerchief key keys kidney kidneys kiev kill killed killing kind kindled kindly kindness kinds king kingdom kings kiss kissed kissing kitchen klapp knee knees knelt knew knife knights knit knitting knock knocked knoll knot know knowing knowledge known knows kochubey kolocha konovnitsyn kozlovski krasnoe kremlin krems kuragin kutuzov kuzmich kuzminichna labor labored laborers labors labour lace lacerated laceration lack lacked lacking lad laden ladies lads lady laid lake lakes laminated lamp land landbank landed landing landlord landowner lands lane langeron language lantern lap large largely larger largest larynx lascar last lasted lasting lastly lasts late lately latent later lateral laterally latest lathe latin latter latterly laugh laughed laughing laughter launched laundry lavrushka law lawful lawn laws lawyer lawyers lay layer layers laying layout layouts lazarev lead leader leaders leadership leading leads league lean leaned leaning leaped leaps learn learned learning leash least leather leave leaves leaving led lee left leg legal legally legged legislation legislative legislature legislatures legitimate legs leisure leisurely lend length lens lent les lesion lesions less lesser lesson lessons lest lestrade let letter letters letting leucocytes leucocytosis level liability liable liberal liberated liberties liberty library license lid lie lies lieutenant life lifeless lift lifted lifting ligament ligaments ligation ligature ligatures light lighted lighter lighting lightly lightning lights like liked likely likewise liking limb limbs lime limit limitation limitations limited limits lincoln line lined linen lines lining link linked links lint lip lipoma lips liquefaction liquid liquor lise list listen listened listening listless lists lit literary literature little live lived livelihood lively liver lives livid living lloyd load loaded loan loans local localised locality locally locate located lock locked locking locomotive lodge lodged lodges lodgings lofty log logic logical login logo logs london lone lonely long longed longer longus look looked looking looks loops loose loosely looting lord lords lorrain lose loses losing loss losses lost lot lotion loud louder loudly louis louisiana love loved lovely lover lovers loves loving low lowell lower lowered lowering lowest loyal loyalists loyalty luck lucky lucrative lumber lumen luminous lump lunch lungs lupus lying lymph lymphadenitis lymphadenoma lymphangioma lymphangitis lymphatic lymphatics lympho macdonald macewen machine machinery mack mad madam madame made mademoiselle madison magic magistrate magnanimity magnanimous magnificent magnitski magnitude maid maiden maids mail main maine mainly maintain maintained maintaining maintenance majestic majesty major majority makar make makers makes making male males malignancy malignant malleolus mamma man manage managed management manager mandible mane maneuvers manhood manifest manifestation manifestations manifesto manifests manila mankind manly manner manners manual manufacture manufacturers manufactures manufacturing many map marauders marble march marched marches marching margin margins maria marie marine mark marked market markets marks marriage married marrow marry marrying marshal marshall marshals martial mary marya maryland masculine mask mason masonic masons mass massachusetts massacre massage masses massive master masterly masters mastoid match material materially materials mathematics matrix matter matters maturity mavra maximum may mayor mazurka mccarthy mckinley mcmaster me meadow meal meals mean meaning meaningless means meant meantime meanwhile measure measured measures meat mechanical mechanically mechanics mechanism medial median medical medicine medium medulla medullary meekly meet meeting meetings melancholy melanotic melted melting member members membrane membranes memorable memorandum memories memory men menace menacing meningitis mental mentally mention mentioned mentioning menu merchant merchants mercury mercy mere merely merged merit merits merrily merry merryweather mess message messages messenger met metacarpal metal metallic metastases metastasis method methods metivier mexican mexico michael michaud michigan micro midday middle midnight midst might mighty migration mikhaylovna mild milder mile miles military militia militiamen milk milka mill millimeter million millions mills miloradovich mind minded mindedly mindedness minds mine mineral miners mines mingled mingling minimum mining minister ministers ministry minnesota minor minority minute minutely minutes mirror mirrors miserable misery misfortune misfortunes miss missed missing mission missionaries mississippi missouri mist mistake mistaken mistakes mistress misty mitenka mixed mixture mm moan moaning mob mobile mobility mode model moderate moderation modern modest modification modified modify moist moisture molasses mole moles moment momentary moments momentum mon monarch monarchs monarchy monastery monday money monopolies monopoly monotonous monroe monsieur monster montana month months mood moon moonlight moore moral morally moran morbid more morel moreover mormons morning morose morphin morris morrow mortal mortemart moscow most mostly mother mothers motion motionless motive motives motor motorbike mount mountain mountains mounted mounting mournful mouth mouths movable move moved movement movements moves moving mozhaysk mrs much mucous mud muddy multiple mummers municipal murat murder murdered murderer murmur murmured muscle muscles muscular museum music musical musket musketry muskets must mustache mustaches mustn muttered muttering mutton mutual my myeloma myositis myself mysteries mysterious mystery mytishchi myxoma naevi naevus nail nails naive naked name named namely names napkin naples napoleon napoleonic narrative narrow narrowing nasal nasty natalie natasha nation national nationalism nationalities nationality nations native natives natural naturally nature natured naval navigation navy near nearer nearest nearly nearness neatly nebraska necessarily necessary necessity neck necrosis need needed needle needles needs negative neglect neglected negligence negotiate negotiation negotiations negro negroes neighbor neighborhood neighboring neighbors neighbourhood neighbouring neither nephew nerve nerves nervous nesvitski net network neuralgia neuritis neuro neuroma neutral neutrality nevada never nevertheless neville new newcomer newly news newspaper newspapers next ney nice nicely nicholas niece niemen night nightcap nightly nights nikolenka nine nineteenth ninth nobility noble nobleman nobles nobody nodded nodding nodes nodular nodule nodules noise noiselessly noisy nominated nominating nomination non noncash noncommissioned none nonsense nor normal normally north northern northwest nose nosed not notably note notebook noted notes nothing notice noticeable noticed notices noticing notification notifications noting notion notwithstanding nourished nourishment novel novelty november now nowadays nowhere null nullification number numbers numerous nurse nursery nurses nursing nut nutrition oak oath oats obedience obey obeyed object objected objections objects obligation obligations obliged obliterated obliteration obscure observation observations observe observed observer observing obstacle obstinate obstructed obstruction obtain obtained obtaining obvious obviously occasion occasional occasionally occasions occluded occlusion occupancy occupation occupations occupied occupy occupying occur occurred occurrence occurring occurs ocean october odd odontoma odour oedema oedematous of off offended offenders offense offensive offer offered offering offers office officer officers offices official officially officials offset often ogg ohio oil ointment oklahoma old oldenburg older olmutz ominous omitted on onboard once one ones oneself online only onset onto onychia ooh oozing open opened opening openings openly opens openshaw opera operate operating operation operations operative operator opinion opinions opium opponent opponents opportunities opportunity oppose opposed opposing opposite opposition oppressed oppression option options orange orator orators orbit orchestra order ordered ordering orderlies orderly orders ordinance ordinary oregon orel org organ organic organised organism organisms organization organizations organized organizing organs oriental orifice origin original originally originate originated originates originating orleans orlov orthodox osseous ossification ossifying osteo osteoma osteomalacia osteomyelitis ostitis other others otherwise otis otradnoe ought ounce our ours ourselves out outbreak outburst outcome outer outlet outline outlook outlying outposts output outright outset outside outstanding outstretched outward oval ovary over overcoat overcome overflowing overgrowth overland overlooked overlying overpayment overtake overthrow overthrown overtook overwhelmed owe owed owing own owned owner owners ownership owns oxford oxygen pace paced paces pacific pacing pack packed packet packing pad page pages paget paid pain paine painful painfully painless pains paint painted pair palace palate pale pallor palm palmar palpable pamphlets panama panic panting papa paper papers papilloma papules parade paraffin paragraph paragraphs parallel paralysed paralysis pardon parent parents paris park parliament parliamentary parotid part parted partial partially participation particles particular particularly particulars parties partisan partly partner parts party pas pass passage passages passed passengers passes passing passion passionate passionately passions passive password past paste patch patches patella path pathetic pathogenic pathological paths patience patient patients patrick patriot patriotic patriotism patriots patronage patted paul paulucci pause paused pausing pavement pavlograd pavlograds pavlovna paxson pay paying payment payments pdf pea peace peaceful pearls peasant peasants pectoral peculiar peculiarities peculiarity peculiarly pedunculated peering pelageya pelvis pen penalties pencil penetrate penetrated penetrating penis penn pennsylvania pensions people peoples per perceive percent percentage perceptible perception perfect perfection perfectly perforated perforating perform performance performed performing perhaps peri period periods periosteal periosteum peripheral periphery perish perished perishing peritoneal peritoneum permanent permanently permeated permission permissions permit permitted peroneal peronskaya peroxide perpetual perplexed perplexing perplexity persian persist persistence persistent persists person personage personages personal personality personally personnel persons perspiration perspiring persuade persuaded perturbed pesos pet peter petersburg peterson petition petitions petty petya pfuel pglaf phagocytes phalanges phalanx pharynx phase phases phenomena phenomenon philadelphia philippine philippines philosophy phlebitis photograph phrase phrases physical physically physiological pick picked picket picking picture pictured pictures piece pieces pierce pierced piercing pierre pig pigment pigmentation pigmented pile pilgrim pilgrims pillow pillows pin pinch pine pink pioneer pioneers pipe pipes pips pistol pistols pit pitch pitched piteous piti pitied pitiful pitt pittsburgh pity place placed places placing plain plainly plains plan planks planned planning plans plant plantation plantations planted planter planters planting plants plaster plate plates platform platforms platon platov platt play played playing plays plea pleasant pleasantly please pleased pleasing pleasure pleasures pledge plenty pleura plexus plight plot plow plumes plump plunder plunged plymouth pneumonia pocket pockets poetic poetry point pointed pointing points poison poisoning poland pole poles police policeman policies policy polish polished polite politely politeness political politician politicians politics polk polled polls pond pondered pool poolside poor pope popliteal popular popularity popularly population populists porch porous porridge port porter portfolio portion portions porto portrait ports pos pose position positioning positions positive positively possess possessed possesses possession possessions possessor possibility possible possibly post posted posterior posterity posting postmaster posts potassium potato potatoes pouches pounds pour poured pouring poverty powder powdered power powerful powerless powers practical practically practice practised praise praised pratzen pray prayed prayer prayers pre preached precaution precautions preceded preceding precious precipitated precise precisely precision predestined predominate prefer preferably preference preferred pregnant preliminary premises preobrazhensk preoccupied preparation preparations prepare prepared preparing prepatellar prepuce prescribed presence present presented presenting presently presents preservation preserve preserved presidency president presidential presidents press pressed pressing pressure prestige presume pretended pretending pretext pretty prevail prevailed prevent prevented preventing prevention prevents preview previous previously prey price prices pricing pride priest priests primary prime prince princes princess princesses principal principally principle principles print printed printer printing prison prisoner prisoners private privilege privileges prize probability probable probably probe problem problems procedure proceed proceeded proceeding proceedings process processes proclaimed proclamation produce produced produces producing product production products profession professional profile profit profits profound profoundly profuse prognosis program progress progressive prohibited prohibition project projected projecting projects proliferation prolonged prominence prominent promise promised promises promo promote promoted promoting promotion promotional prompt promptly prone pronounced proof proofs proper properly property prophecy proportion proportions proposal proposals propose proposed proposition proprietary proprietor proprietors prosecution prospect prosperity prosperous protect protected protecting protection protective protest protested protests protopathic protoplasm proud prove proved proves provide provided providence providing province provinces provincial proving provision provisions proximal proximity prussia prussian pseudo psoas public publican publish published puckered puckering puff puffing pull pulled pulling pulsating pulsation pulse puncture punctured punish punished punishment pupil pupils purchase purchased pure purely purification purified puritan puritans purity purple purpose purposely purposes purse pursue pursued pursuing pursuit purulent pus push pushed pushing pustule pustules put putting puzzled pwd pyaemia pyogenic qualification qualifications qualified qualifies qualities quality quantities quantity quarrel quarreled quarrels quarter quartered quartermaster quarters que quebec queen queer quest question questioned questioning questions quick quickbooks quicker quickly quiet quietly quilt quincy quit quite quivered quivering r race radial radiant radical radicals radiogram radium radius raevski rage ragged rail railroad railway railways rain raise raised raising ramballe ran rang range ranges rank ranks rapid rapidity rapidly rapp rapture rapturous rapturously rare rarely rat rate rates rather ratification ratified ratio rattle rattled raw ray rays re reach reached reaches reaching reaction reactionary reactivate read readable reader readers readily readiness reading ready real reality realize realized realizing really realm rear rearguard rearrange reason reasonable reasoning reasons reassure rebellion recall recalled recalling receipt receipts receive received receives receiving recent recently reception receptionist recipe reckless reckoned reckoning reclamation recognise recognised recognition recognize recognized recognizing recollection recommended recommends reconstruction record recorded recording records recourse recover recovered recovering recovery recruits rectum recur recurrence recurrent red reddish redness redoubt reduce reduced reduction reenable reference references referendum referred referring refined reflect reflected reflection reflections reform reformers reforms refrain refrained refuge refund refunded refunder refusal refuse refused refuses refusing regain regard regarded regarding regardless regards regeneration regime regiment regimental regiments region regions register registered registration regret regretted regular regulars regulate regulating regulation regulations reign rein reinforcements reins reject rejected rejects rejoice rejoicing rejoined relapse relapsing relate related relating relation relations relative relatively relatives relaxed release released relentless reliable reliance relief relieve relieved religion religious reluctant reluctantly rely remain remainder remained remaining remains remark remarkable remarkably remarked remarks remedies remedy remember remembered remembering reminded remit remorse remote removal remove removed removing rename render rendered rendering renew renewal renewed renounce renovation rent rental rented rep repair reparative repay repeal repealed repeat repeated repeatedly repeating repetition replace replaced replacement replied replies reply replying report reported reporting reports represent representation representative representatives represented representing reprint reproach reproached reproachfully republic republican republicans repulsed reputation request requests require required requirements requires requiring requisite rescue research resected resection resemblance resemble resembles resembling resented resentment reservations reserve reserved reserves resetting residence resignation resigned resist resistance resolute resolutely resolution resolutions resolve resolved resort resortos resounded resource resources respect respectable respected respectful respectfully respecting respective respectively respects respiration responded response responsibility responsible rest restaurant rested resting restless restlessness restoration restore restored restoring restrain restrained restraint restricted restriction restrictions rests result resultant resulted resulting results resume resumed resumption retain retained retention retire retired retirement retiring retreat retreated retreating return returned returning returns reveal revealed revenue reverse review revision revoir revoke revolt revolution revolutionary revolutions reward rewards rhetor rheumatic rheumatism rhine rhode rhodes ribbon ribbons ribs rice rich richer riches richest rickets rickety rico rid ridden ride rider ridicule ridiculous riding rifle right rights rigid rigidity rigor ring ringing rings riot rise risen rises rising risk risks rival rivals river rivers riverside road roads roar robbery robert rod rode rodent role roles roll rolled rolling romance romantic rome rontgen roof roofs room rooms roosevelt root roots rope ropes rose ross roster rostopchin rostov rostova rostovs rosy rough round rounded roused route routes routine row rows royal royalty roylott rubbed rubber rubbing rubbish ruble rubles rucastle rude rug ruin ruined ruinous ruins rule ruled ruler rulers rules ruling rum rumor rumors run running runs rupture ruptured rural rush rushed rushing russia russian russians rustle ryazan ryder rye s saber sabers sac sacculated sacred sacrifice sacrificed sacrifices sad saddle saddled saddles sadly sadness safe safeguard safely safety said sailing sailors saint sake salary sale sales salesman saline sallow salt salts salvation same samovar samuel san sand sang sank santa santo saphena sapraemia sarcastic sarcoma sat satin satisfaction satisfactory satisfied satisfy saturday sausage savage savannah save saved saving saviour saw say saying says sc scab scale scalp scandal scanty scapula scar scarcely scared scarf scarlet scars scattered scene scenes scent schedule scheduled scheme schemes schon school schools schoss sciatic science sciences scientific scissors sclerosis score scotch scotland scott scoundrel scraped scraping scratch scream screamed screams screen screw screwed screwing scrotum scurvy sea seaboard seal sealed search searched searching seas season seasonal seat seated seating seats sebaceous secession second secondary secondly seconds secrecy secret secretary secreting secretion secretly secrets section sectional sections secure secured securing security sedition see seed seeing seek seeking seem seemed seems seen sees segment seize seized seizing seizure seldom select selected selecting selection self sell selling semenovsk semi senate senator senators send sending senile senior sensation sense senseless senses sensibility sensible sensitive sent sentence sentiment sentiments sentinel separate separated separately separates separating separation sepsis september septic septicaemia sequel sequence sequestrum serene serf serfs sergeant sergey series serious seriously serous serum servant servants serve served serves service services serving servitude session set sets setting settings settle settled settlement settlements settlers settling setup seven seventeen seventeenth seventh seventy several severe severed severely severity seward sex shade shadow shadows shaft shafts shaggy shake shaken shaking shall shallow shame shameful shamshevo shan shape shaped share shared sharing sharp sharply sharpshooters shattered shaved shaven shawl she sheath sheaths shed sheep sheet shell shells shelter sherlock sherman shevardino shifting shining shinshin ship shippers shipping ships shirt shivering shock shoe shoes shone shook shoot shooting shop shops shore short shortening shorter shortly shot shots should shoulder shoulders shouldn shout shouted shouting shouts show showed showing shown shows shrank shrewd shrieked shrill shriveled shrugged shrugging shudder shuddered shut shutters shuttle shy shyly sick sickness side sides sideways sigh sighed sighing sight sighted sign signal signed significance significant significantly signs silence silent silently silk sill silly silver similar similarly simon simple simpler simplest simplicity simply simulate simultaneously sin since sincere sincerely sing singers singing single singly singular sinister sink sinking sins sinus sinuses sir sire sister sisters sit site sitting situated situation situations six sixteen sixteenth sixth sixty size skeleton skiagram skiagrams skill skilled skillful skin skirt skull sky slammed slave slavery slaves sleep sleeping sleepless sleeps sleepy sleeve sleeves sleigh sleighs slender slept slight slightest slightly slim slip slipped slippers slipping slips slope slough sloughing sloughs slow slowly sly small smaller smallest smart smashed smeared smell smile smiled smiles smiling smilingly smith smoke smoked smoking smolensk smooth smoothed smoothly snake snatched snow snuff snuffbox soaked sob sobbed sobbing sobs social socialists societies society soda sodden sofa soft soften softened softening softer softly soil sold soldier soldiers sole solely solemn solemnity solemnly solid solitary solitude solution solve solved some somebody somehow someone something sometimes somewhat somewhere son song songs sons sonya soon sooner soothing sore sores sorrow sorry sort sorts sought soul souls sound sounded sounds soup source sources south southern southwest sovereign sovereigns sovereignty space spaces spain spanish spare spared sparkling sparks spasm spasms speak speaker speaking speaks special specially specie species specific specimen spectacle spectacles speech speeches speed speedily spend spending spent speranski sphere spinal spindle spine spinning spirit spirited spirits spiritual spirochaete spite splashing spleen splendid splendidly splint splints split spoil spoiled spoils spoke spoken spongy spontaneous spoon spores spot spots spotted sprain sprang spread spreading spreads spring springing springs sprung spurs spy squadron square squeezed stable staff stage stages staggered staggering stain stained stair staircase stairs stake stalls stamp stand standard standards standing stands staphylococcus staples star stared staring stark stars start started starting startled startling starvation state stated statehood statement states statesman statesmen station stationary stationed stations status statuses statutory stay stayed staying steadily steady stealing steam steel steep step stepfather stepped stepper stepping steps sterilised stern sternly sterno sternum steward stick sticking stiff stiffness still stillness stimulated stimulating stimulus stir stirred stirring stitch stitches stock stockings stocks stoke stolen stomach stone stoner stones stood stooped stooping stop stopped stopping store stores stories storm story stout straight strain strained straining strains strange strangely stranger strangers strategic strategy straw stream streamed streams street streets strength strengthen strengthened streptococci streptococcus stress stretch stretched stretcher stretchers stretching stricken strict strictly strike strikes striking string strip stripped strips strode stroke strong stronger strongest strongly struck structural structure structures struggle struggled struggling strychnin stubborn stuck student studied studies study studying stuff stumbled stump stupid stupidity sturdy style sub subclavian subcutaneous subdued subjacent subject subjected subjects submarine submission submissive submit submitted submitting subordinate subsequent subsequently subside subsided subsides substance substances substitute substituted subtle succeed succeeded success successes successful successfully succession successive successor succumb such suction sudden suddenly suffer suffered suffering sufferings suffers sufficient sufficiently suffrage sugar suggest suggested suggesting suggestion suggestive suggests suicide suit suitable suite suited sum summary summer summoned summons sums sun sunday sunk sunken sunlight sunshine superadded superficial superfluous superintendent superior superiority supervision supper supplemented supplied supplies supply supplying support supported supporters supporting suppose supposed supposing suppress suppressed suppuration suppurative supra supremacy supreme sure surely surface surfaces surgeon surgeons surgery surgical surplus surprise surprised surprising surrender surrendered surround surrounded surrounding surroundings survey survive suspect suspected suspend suspended suspicion suspicious sustain sustained sutherland suture sutured sutures suvorov swallow swallowed sway swayed swaying swear sweat sweating sweep sweeping sweet swelling swellings swept swift swiftly swing swinging switch swollen sword swords swung symmetrical sympathetic sympathies sympathy symptom symptoms syncope synovial synovitis syphilis syphilitic syringe system systematic systems t table tables tact taft tail take taken takes taking tale talent tales talk talked talking talks tall tap tapped tapping tariff tariffs tartar tarutino task taste tattered taught tavern tax taxation taxes taylor tea teach teacher teachers teaching team teammate tear tearing tears technical teeth tell telling tells telyanin temper temperature template temple temples temporarily temporary temptation ten tend tendencies tendency tender tendered tenderly tenderness tendon tendons tends tennessee teno tens tense tension tent tenth tenure term termed terminal terminate terminated termination terms terrible terribly terrified territorial territories territory terror tertiary test tested tetanic tetanus texas text textile than thank thanked thanks that the theater thee their theirs them themselves then thence theodore theories theory there thereby therefore thereof thermal these they thick thickened thickening thickness thief thiers thigh thin thing things think thinking thinks thinner third thirds thirst thirteen thirteenth thirty this thomas thoracic thorax thorough thoroughly those thou though thought thoughtful thoughtfully thoughts thousand thousands thread threat threaten threatened threatening threateningly three threshold threw thrill throat thrombosis thrombus throne throng through throughout throw throwing thrown thrust thud thumb thus thy thyreoid tibia tibial ticket tickets tide tie tied ties tight tightly tikhon tiles till tilled tilsit timber time times timid timidly timokhin tin tingling tint tiny tips tipsy tiptoe tired tissue tissues title to tobacco today toe toes together toil token told toleration toll toller tolly tolstoy tomorrow tone tones tongue tonight too took tools tooth top topic topics tore tories tormented tormenting torn tortuous tortured tossed total touch touched touching tour tourniquet tout toward towards towels town towns townshend toxaemia toxic toxin toxins trace traced traces track tracks trade trademark traders trades tradesmen trading tradition traditions traffic trail trails train trained training trains traitor traitors tramp trampled tranquil tranquillity transaction transactions transfer transference transferred transformation transformed transition transmit transmitted transparent transplantation transport transportation transverse trap trauma traumatic travel traveled traveler travelers traveling treachery tread treason treasure treasury treat treated treaties treating treatment treaty tree trees trembled trembling tremendous trench trial tribute trick tried trifle trifles trifling trip triumph triumphant trivial trodden troops trophic tropical trot trouble troubled troubles troublesome trousers troyka truce true truly trunk trunks trust trusted trustees trusts truth try trying tsar tsarevich tube tubercle tuberculosis tuberculous tubes tucked tumour tumours tune tunica turkey turkish turmoil turn turned turner turning turns tushin tut tutor twelfth twelve twentieth twenty twice twist twisted twisting twitched twitching two tyler type typed types typhoid typical ugly uhlans ulcer ulcerate ulcerated ulceration ulcers ulm ulnar ultimate ultimately unable unanimous unarchive unavailable unavoidable unbroken unbuttoned uncertain uncertainty unchanged uncle uncomfortable uncommon unconscious unconsciously unconstitutional uncovered undecided under undergo undergoes undergoing underlying understand understanding understood undertake undertaken undertaking underwood undisable undisturbed undo undoubted undoubtedly undressed undressing unduly uneasily uneasiness uneasy uneven unexpected unexpectedly unfair unfamiliar unfortunate unfortunately unhappy unhealthy uniform uniforms unimportant union unions unique unit unite united uniting units unity universal universe university unjust unknown unlawful unless unlike unnatural unnaturally unnecessary unnoticed unpaid unpleasant unpleasantly unread unreasonable unsatisfactory unseen unsettled unsure until unusual unusually unwilling unworthy up update updates updating upload upon upper uprising upset upstairs upward upwards urge urged urgent urging urine usage use used useful useless user users using usual usually utah uterine uterus utilities utility utmost utter uttered uttering utterly vacancies vacancy vacant vaccine vaccines vague vaguely vain vainly valet valid validation valley valleys valuable value valued valves van vanguard vanished vanity vanquished variable variations varicose varied varies varieties variety various varix vary varying vascular vasili vasilich vaska vast vat vehicle vehicles veil veiled vein veins velvet venereal venezuela venous vent ventilator venture ventured vera verdict vereshchagin verify vermont verses version vertebrae vertebral very vessel vessels vested vestibule vexation vexed via vice vicinity vicious vicomte victim victories victorious victory vienna view viewed views vigor vigorous vigorously vii viii vile village villages villain vilna vincent violation violence violent violently virgin virginia virtue virtues virtuous virulence virulent virus viscera visible vision visit visited visiting visitor visitors visits vital vitality vive vivid vividly vladimirovich vodka voice voices void voided vol volkonski vols volume voluntary volunteers vomiting von voronezh vote voted voters votes vous voyage vs vyazma wage waged wages wagon wagons waist waistcoat wait waited waiter waiters waiting waitress wake waking walk walked walking walks wall walls wander wandered wandering want wanted wanting wants war ward warfare warlike warm warmly warmth warn warned warning warrant warranties warrior wars warts was wash washed washing washington wasn waste wasted wasting watch watched watching water waters watery watson wattle wave waved waves waving wax way ways we weak weakened weaker weakness wealth wealthy weapon weapons wear weariness wearing weary weather web webster wedding wednesday week weeks weep weeping weighed weight weird welcome welcomed welfare well wens went wept were west western westward wet weyrother what whatever wheat wheel wheels when whence whenever where whereas wherever whether which whig whigs while whip whiskers whisky whisper whispered whispering whispers whistle whistled whistling white whites whitlow whitney who whoever whole wholly whom whose why wi wicked wide widely wider widespread widow wife wild wilderness will willarski william willing wills wilson win winchester wind windibank winding window windows wine wing wings wink winking winning winter wiped wiping wire wisconsin wisdom wise wish wished wishes wishing wit with withdraw withdrawal withdrawing withdrawn withdrew within without witness witnessed witty wives woke wolf wolves wolzogen woman women won wonder wondered wonderful wondering wont wood wooden woodrow woods wool woolen word words wore work worked worker workers workflow working workingmen workmen works workspace world worldly worn worried worry worse worst worth worthless worthy would wouldn wound wounded wounds wrapped wrath wretched wrinkled wrinkles wrist writ write writer writers writes writing writings writs written wrong wrongly wrote wrung www wyoming xii xiii xiv xix xvi xvii xviii xxi xxii yakov yard yards yaroslavl year years yellow yes yesterday yet yield yielded yielding yields york you young younger youngest your yours yourself yourselves youth youthful zeal zealous zherkov znaim zone'.split(' '));
    for (const word of ['departing','checkout','checking','checked','visitors','someone','somebody','settling']) smartTypoKnownEnglish.add(word);
    const smartTypoDomainWords = [
        'employee','employees','staff','cashier','cashiers','worker','workers','personnel','receptionist','operator','account','accounts','permission','permissions','privilege','privileges','department','departments','administrator','admin','frontdesk','restaurant',
        'business','address','waiting','check','dining','receipt','receipts','reprint','printing','printer','printed','print','preview','builder','layout','layouts','template','templates','thermal','acknowledgement','acknowledgment','branding','footer','header','settings','receiptbuilder','receiptsettings',
        'payment','payments','pay','paid','unpaid','paying','settle','settlement','settled','balance','balances','outstanding','checkout','checkin','method','methods','noncash','cash','gcash','landbank','transfer','card','tender','overpay','overpayment','change',
        'discount','discounts','senior','citizen','pwd','promotion','promotions','promo','vat','exemption','exempt','eligible','eligibility','statutory','latediscount',
        'room','rooms','stay','stays','guest','guests','occupancy','occupied','vacant','available','availability','reservations','arrival','departure','checkin','checkout',
        'order','orders','cart','food','menu','dish','dishes','category','categories','table','tables','item','items','quantity','quantities','meal','meals','restaurant','posted','post','charge','charges','roomcharge','roompost','service','services','catalog','catalogue','laundry','towels','motorbike','shuttle','rental',
        'ticket','tickets','support','issue','issues','notification','notifications','alert','alerts','audit','history','logs','log','resolved','resolve','report','error','errors','invalid','failed','failing','disabled',
        'create','creating','created','add','adding','register','edit','editing','update','updating','change','changing','manage','management','configure','customize','customise','design','designing','arrange','arranging','move','modify','rename','select','switch','activate','reactivate','deactivate','disable','enable','archive','restore','remove','delete','void','view','find','search','open','show','cancel','reverse','submit','save','record','collect','apply','assign','navigate','access','login','refund','adjust','price','pricing','rate','rates','browse','locate','print','reprint','help','troubleshoot',
        'cannot','cant','wont','doesnt','wasnt','couldnt','isnt','not','paid','unpaid'
    ];
    const smartTypoGeneralWords = new Set(('a an and are as at be before bill but by can could did do does dont even every everything for from give get has have having he her here how i if in into is it its just know like me my need new no nor of on one only or our out please really right same should some something than that the their them there these they this those through to too us was we were what when where which while who why will with without would you your yesterday today tomorrow already again another first last previous next current existing after problem help want wants working work cannot cant wont isnt doesnt not able add edit update create delete remove activate deactivate view void paid unpaid new old now later yes no all any both every any much many many more into above below around between using use uses used over under never always sometimes then and else either yet still since even go going want actually how do i can you could you please tell show me about would like need i am im ive').split(/\s+/));
    const smartTypoWords = [...new Set([...smartTypoDomainWords, ...Object.keys(smartNlpAliases),...Object.values(smartNlpAliases)])].filter(w => /^[a-z]{3,}$/.test(w));
    const smartTypoWordSet = new Set(smartTypoWords);
    const smartTypoDomainClasses = {
        employee:new Set('employee employees staff cashier cashiers worker workers personnel receptionist administrator admin account accounts permissions permission privileges roles department'.split(' ')),
        receipt:new Set('receipt receipts reprint print printer printing template layout builder thermal footer header branding receiptsettings receiptbuilder'.split(' ')),
        payment:new Set('payment payments pay paid unpaid balance settle settlement cash gcash landbank card tender method methods overpayment'.split(' ')),
        discount:new Set('discount discounts senior citizen pwd vat promotion promotions promo eligible statutory exemption'.split(' ')),
        stay:new Set('room rooms stay stays guest guests checkin checkout occupancy vacant available departure arrival'.split(' ')),
        restaurant:new Set('restaurant food order orders menu cart item items table tables dish dishes quantity roompost'.split(' ')),
        support:new Set('ticket tickets support issues issue audit notification notifications error errors'.split(' '))
    };
    function smartTypoDistance(a,b,limit=3) {
        if(Math.abs(a.length-b.length)>limit)return limit+1;
        let prior2=null,prior=Array.from({length:b.length+1},(_,i)=>i);
        for(let i=1;i<=a.length;i++){
            const cur=[i];let min=i;
            for(let j=1;j<=b.length;j++){
                let cost=a[i-1]===b[j-1]?0:1;
                let n=Math.min(cur[j-1]+1,prior[j]+1,prior[j-1]+cost);
                if(prior2 && i>1 && j>1 && a[i-1]===b[j-2] && a[i-2]===b[j-1])n=Math.min(n,prior2[j-2]+1);
                cur[j]=n;min=Math.min(min,n);
            }
            if(min>limit)return limit+1;
            prior2=prior;prior=cur;
        }
        return prior[b.length];
    }
    function smartTypoFixWord(word,rawWords) {
        if(word.length<4 || /\d/.test(word) || smartTypoGeneralWords.has(word) || smartTypoKnownEnglish.has(word) || smartTypoWordSet.has(word))return word;
        if(word==='cashr'||word==='casher')return 'cashier';
        if(word==='recieptt'||word==='reicept'||word==='recieptts')return word.endsWith('s')?'receipts':'receipt';
        if(word==='dactivate'||word==='deactivte'||word==='deactvate')return 'deactivate';
        if(word==='ractivate'||word==='reactivte'||word==='reacivate')return 'reactivate';
        if(word==='ppost'||word==='psot')return 'post';
        if(word==='voidded'||word==='voied')return 'voided';
        if(word==='rom' && rawWords.some(x=>/^(guest|stay|room|order|bill|charge|food|restaurant|post|dinner|occupied|vacant|rooms|add|create|register|payment)$/i.test(x)))return 'room';
        if(word==='foo' && rawWords.some(x=>/^(restaurant|order|post|room|rom|bill|meal)$/i.test(x)))return 'food';
        const context=new Set(rawWords.filter(w=>w!==word));
        const contextClasses=[];
        for(const cls of Object.values(smartTypoDomainClasses))if([...context].some(w=>cls.has(w)))contextClasses.push(cls);
        const candidates=[];
        for(const candidate of smartTypoWords){
            const max=Math.max(word.length,candidate.length);
            if(max<4 || Math.abs(word.length-candidate.length)>3)continue;
            let dist=smartTypoDistance(word,candidate,3);
            const prefix=word.length>=5 && candidate.length>=6 && candidate.startsWith(word.slice(0,5));
            const shared4=word.length>=5 && candidate.length>=5 && word.slice(0,4)===candidate.slice(0,4);
            if(dist>2 && !prefix)continue;
            if(dist===2 && max<7 && !shared4)continue;
            if(dist===2 && !shared4 && !contextClasses.some(cls=>cls.has(candidate)))continue;
            if(dist>2 && (!prefix || candidate.length-word.length>3))continue;
            const inContext=contextClasses.some(cls=>cls.has(candidate));
            let score=dist/Math.max(word.length,candidate.length)-(prefix?0.06:0)-(inContext?0.07:0);
            if(word.slice(0,3)===candidate.slice(0,3))score-=0.038;
            if(word.endsWith('s')===candidate.endsWith('s'))score-=0.028;
            if(word.startsWith('d')&&candidate.startsWith('de'))score-=0.09;
            if(word.startsWith('r')&&candidate.startsWith('re'))score-=0.065;
            if(word.endsWith('tt')&&candidate==='receipt')score-=0.065;
            if(word.endsWith('ls')&&candidate.endsWith('les'))score-=0.035;
            if(score<=0.34)candidates.push({candidate,score,dist,inContext});
        }
        candidates.sort((a,b)=>a.score-b.score || Number(b.inContext)-Number(a.inContext) || a.candidate.localeCompare(b.candidate));
        if(!candidates.length)return word;
        const best=candidates[0],second=candidates[1];
        if(second && second.score-best.score<0.032 && !best.inContext)return word;
        if(best.dist===2 && !best.inContext && word.slice(0,4)!==best.candidate.slice(0,4))return word;
        return best.candidate;
    }
    function smartTypoNormalize(input) {
        const original=String(input||'');
        if(!original.trim())return original;
        const lower=original.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
        const raw=lower.match(/\b[a-z]+\b/g)||[];
        const normalized=raw.map(w=>smartNlpAliases[w]||w);
        const fixed=[];
        for(let i=0;i<raw.length;i++){
            const w=raw[i];
            if(/^(emploi|employ|employe|employes|employi|emploee|employy|empoyee)$/i.test(w) && (raw.some(x=>/^(add|adding|create|register|new|staff|user|cashier|account|permissions|permission|delete|remove|deactivate|reactivate|hire)$/i.test(x)) || /^empl(?:oi|oyee|yee|oyy)$/i.test(w)))fixed.push('employee');
            else fixed.push(smartTypoFixWord(w,normalized));
        }
        for(let i=0;i<fixed.length;i++){
            const w=fixed[i];
            if(w==='rom' && (/\b(?:rom)[ -]?[0-9]{2,4}\b/.test(lower) || fixed.some(x=>/^(post|room|guest|stay|order|bill|charge|food|restaurant|dinner|occupied|vacant|rooms|add|create|register|payment|status|occupancy|edit|deactivate|inventory|checkout|inactive)$/i.test(x))))fixed[i]='room';
            if(w==='mnu' && fixed.some(x=>/^(item|food|price|admin|category|create|edit|switch|order|add)$/i.test(x)))fixed[i]='menu';
            if(w==='ad' && fixed.some(x=>/^(employee|cashier|table|menu|charge|item|order|room|staff)$/i.test(x)))fixed[i]='add';
            if(w==='fod' && fixed.some(x=>/^(order|item|items|restaurant|post|room)$/i.test(x)))fixed[i]='food';
        }
        for(let i=0;i<fixed.length;i++){
            if(fixed[i]==='foo' && fixed.some(x=>/^(post|room|restaurant|order|bill|meal)$/i.test(x)))fixed[i]='food';
        }
        let j=0;
        return lower.replace(/\b[a-z]+\b/g,()=>fixed[j++]||'');
    }
    const smartNlpWordActions = new Set(['create','edit','find','deactivate','activate','reprint','payment','checkout','checkin','error','cannot','manage','post','void','cancel','resolve','preview','design','history','permission','status']);
    function smartNlpAnalyze(input, previousTopic='') {
        let text=smartTypoNormalize(input).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').replace(/[^a-z0-9\s-]/g,' ');
        for(const [pattern,replacement] of smartNlpPhrases) text=text.replace(pattern,replacement);
        const raw=text.split(/\s+/).filter(Boolean);
        const words=raw.map(w=>smartNlpAliases[w]||w).filter(Boolean);
        const s=new Set(words);
        if(s.has('cannot') || s.has('error') || /\b(?:not\s+(?:work|working|print|printing|save|saving|open|opening|show|showing|load|loading|available)|doesnt\s+work|wont\s+work|isnt\s+working)\b/.test(text)) s.add('error');
        if(s.has('how')&&s.has('much')) s.add('balance');
        if((s.has('one')||s.has('it')||s.has('them'))&&previousTopic&&!Array.from(s).some(w=>['employee','receipt','order','room','payment','discount','stay','ticket','menu','table','service','charge','notification','audit','receiptbuilder','receiptsettings','paymentmethod'].includes(w))) s.add(previousTopic);
        if(s.has('employee')&&s.has('permission')) s.add('manage');
        if(s.has('receiptbuilder')) s.add('design');
        if(s.has('receiptsettings')) s.add('manage');
        if(s.has('paymentmethod')) s.add('manage');
        if(s.has('checkout')) s.add('checkout');
        if(s.has('checkin')) s.add('checkin');
        return {raw,words,tokens:s,text};
    }
    function smartNlpRoute(question,previousTopic='') {
        let q=smartTypoNormalize(question).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,"'").replace(/[^a-z0-9'\s-]/g,' ').replace(/\s+/g,' ').trim();
        if(!q)return {status:'unknown'};
        const hit=re=>re.test(q);
        const employee=hit(/\b(employee|employees|staff|worker|workers|cashier|cashiers|receptionist|operator|personnel|teammate|team member|colleague|coworker|user|users|staff account|login|staff roster|account rights|staff directory|reactivate an account|non-admin access|who has access)\b/);
        const receipt=hit(/\b(receipt|receipts|reprint|printer|acknowledg\w*|paid bill printed again|bill print|printed bill|printed receipt|printer output|print output|invoice|printout|thermal|receipt footer|receipt header|printed on bills|footer text printed)\b/);
        const discount=hit(/\b(discount|discounts|pwd|senior|statutory|vat exemption|vat relief|deduction|eligible diners?)\b/);
        const payment=hit(/\b(payment|payments|pay|paid|paying|settle|settlement|cash|gcash|noncash|non-cash|bank|card|tender|money|balance|checkout|check out|bill|overpayment)\b/);
        const order=hit(/\b(order|orders|cart|food|meal|meals|dinner|table bill|restaurant pos|restaurant bill|restaurant table|dish|dishes|drinks|coffee|chicken|plate)\b/);
        const room=hit(/\b(room|rooms|occupancy|occupied|vacant|availability|vacancies|stay|stays|guest|guests|checkin|check-in|check out|checkout|arrival|depart|visitor|departure|availability board)\b/);
        const ticket=hit(/\b(ticket|tickets|support|issues?|problem report|maintenance|service request|report|faulty|report a broken|help from the admin|staff problem)\b/);
        const nav=hit(/\b(where|find|locate|view|show|list|search|open|see|inspect|look up|roster|directory|browse|history|statuses|status)\b/);
        const make=hit(/\b(add|create|new|register|setup|set up|make|hire|onboard|enter|record|give|start|assign|input|post|charge|place|take|receive|collect|accept|submit)\b/);
        const edit=hit(/\b(change|edit|modify|update|adjust|configure|manage|customiz|rename|set|design|rearrang|publish|build|alter)\b/);
        const trouble=hit(/\b(why|can't|cant|cannot|couldn|won't|wont|doesn't|doesnt|isn't|isnt|unable|error|fail|failed|failing|rejected|rejects|refuses|invalid|broken|missing|disappear|disappeared|duplicate|wrong|stuck|not working|not print|not showing|not in|no longer|does nothing|not available|wasn.t|didn.t|keeps|uncertain|disabled|will not|would not|did not|not eligible|not applying|unpaid|unsettled)\b/);
        if(hit(/\b(wi-?fi|weather|airline|flights?|electricity bill|utility bill|health record|guest password|bank balance|bank transactions?|resort earnings?|revenue|net profit|official bank|cashier stealing|owner of the resort|official tax invoice registration|account pin|recipe|basketball|government tax due|tax should.*pay|how much tax.*bir|real visitors|opening schedule|real cost|building a new wing|send money|transfer money from gcash|refund a customer automatically|automatically refund|erase all.*receipts|delete.*audit|rent a room|room rental pric|room rental prices|book airline)\b/) || hit(/\b(password|pin)\b/))return {status:'unknown'};
        if(hit(/\b(what do i do with this|where do i put it|fix the thing|can you get rid of this|help with users and menu|change it now|why is it not working|help with payment and discounts|what is the difference between|how do i add it|undo everything|print and cancel|how do i change status|did my payment go through|is it paid|why are there duplicates|how much change do i give|why isnt my stuff here)\b/))return {status:'clarify'};
        if(hit(/\b(and then| and )\b/) && hit(/\b(create|add|give|change|modify|update|print|reprint|reverse|cancel|discount)\b/) && ((employee&&receipt)||(employee&&discount)||(employee&&hit(/\b(menu|receipt|payment)\b/))||(payment&&discount&&hit(/\bhelp with\b/))||(receipt&&hit(/\breverse\b/))))return {status:'clarify'};
        if(hit(/\b(bank.*balance|electricity|electric bill|utility|legally compliant|official bir|room rental|nightly rate|booking.*room rental|actual account balance|credit card number)\b/))return {status:'unknown'};
        if(hit(/\b(how do i.*and then|and then modify|and also|both.*and|as well as.*and|cancel.*and.*refund|update.*and.*payment|void.*and.*refund)\b/) && hit(/\b(employee|receipt|payment|order|room|menu|ticket|discount|cashier|staff)\b/))return {status:'clarify'};
        if(hit(/\b(help me with|help with)\b/) && payment && discount)return {status:'clarify'};
        if(hit(/\b(check|verify|confirm|whether|unsure)\b/) && hit(/\bpayment\b/) && hit(/\b(success|succeed|succeeded|successful|went through|processed|recorded)\b/))return {id:'payment.error'};
        if(hit(/\b(cashier typed|cashier entered|amount tendered|amount due.*fails|transaction went through|unsure whether.*transaction)\b/))return {id:'payment.error'};
        if(hit(/\b(checkout blocked|unpaid incidental|stay.*not closing|stay.*does not close|departure button rejects|finish.*departure.*block)\b/))return {id:'stay.checkout-error'};
        if(hit(/\b(issue a legally compliant|pay electricity|utility bill)\b/))return {status:'unknown'};
        if(hit(/\b(receipt.*repeated|reprint.*blank|acknowledg.*never opens|printer output.*wrong|receipt.*pdf.*not|receipt.*pdf.*never)\b/))return {id:'receipt.error'};
        if(hit(/\b(duplicate copy.*pay|same paid bill.*print\w*|past receipt|copy of pay-[0-9]+)\b/))return {id:'receipt.reprint'};
        if(hit(/\b(logo.*company address|mobile number.*receipt|tin.*acknowledg|business contact.*receipt)\b/))return {id:'receipt.settings'};
        if(hit(/\b(drag.*header|millimeter slips?|editor.*slips?|custom.*slip|thermal ticket format)\b/))return {id:'receipt.builder'};
        if(hit(/\b(room.*inactive|mark.*room.*inactive|decommission.*room)\b/))return {id:'room.create'};
        if(hit(/\b(seasonal.*offer|scheduled promo|promotional campaign|switch off.*campaign)\b/))return {id:'promotion.manage'};
        if(hit(/\b(restaurant charges.*front desk|table bill.*occupied room|link.*table bill|post the meal|attach.*meal.*room)\b/))return {id:'order.roompost'};
        if(role==='restaurant' && hit(/\b(void.*mistake|procedure to void|reverse.*restaurant ticket)\b/))return {id:'order.void'};
        if(role==='restaurant' && hit(/\b(add another menu item|another menu item)\b/))return {id:'order.additems'};
        if(hit(/\b(restaurant ticket.*new customer|first orders|food ordering|restaurant.*new customer)\b/))return {id:'order.create'};
        if(hit(/\b(report.*equipment|equipment problem|raise.*support case|broken.*printer)\b/))return {id:'ticket.create'};
        if(hit(/\b(admin.*finish.*issue|finish.*issue|change.*tickets.*resolved|close.*maintenance ticket)\b/))return {id:'ticket.resolve'};
        if(hit(/\b(restaurant.*staff.*activity|who made.*settlement|trace.*void history|staff activity logs|void history|find.*staff.*logs)\b/))return {id:'audit.search'};
        if(hit(/\b(resigned.*account|suspend.*staff|stop.*employee.*pos|stop.*former.*employee|suspend.*login)\b/))return {id:'employee.deactivate'};
        if(hit(/\b(undisable|team profile.*inactive|turn back on.*profile|turn.*profile.*back on|restore previously disabled)\b/))return {id:'employee.activate'};
        if(/\b(?:why|cannot|cant|can't|unable|won't|wont|stuck|failed|error|blocked)\b/.test(q) && /\b(?:check\s*out|checkout)\b/.test(q) && /\b(?:guest|visitor|someone|somebody|room)\b/.test(q))return {id:'stay.checkout-error'};
        if(/\bcheck\s+(?:(?:someone|somebody|a guest|a visitor|a customer|the guest|this person|that person|a person|them)\s+)?out\b/.test(q) && /\b(?:someone|somebody|guest|visitor|person|customer|them)\b/.test(q))return role==='restaurant'?{status:'clarify'}:{id:'stay.checkout'};
        if(hit(/\b(hired.*waiter|enroll someone|enrol someone|new staff user|create.*profile|enroll.*staff)\b/))return {id:'employee.create'};
        if(hit(/\b(personnel directory|staff identities|saved cashiers|existing staff identities)\b/))return {id:'employee.find'};
        if(hit(/\b(departmental access|dual-role|dual department|cashier.*reception|cashier.*front desk too|reception too)\b/))return {id:'employee.permissions'};
        if(hit(/\b(accepted payment type|configure.*digital payments|payment type|payment options|payment option)\b/))return {id:'payment.method'};
        if(hit(/\b(guest.*paid part|paid part.*incidental|cash towards.*charge|collect.*restaurant counter)\b/))return {id:'payment.record'};
        if(!trouble && hit(/\b(sc benefit|senior.*benefit|statutory relief|qualified senior.*deduction)\b/))return {id:'discount.apply'};
        if(hit(/\b(start a visit record|incoming guest|arriving family)\b/))return {id:'stay.create'};
        if(hit(/\b(set.*stay.*completed|complete.*room departure|finish.*stay.*balances)\b/))return {id:'stay.checkout'};
        if(hit(/\b(append.*incidental|active room.*towels|motorbike.*put.*stay|bill.*room.*towels)\b/))return {id:'charge.post'};
        if(hit(/\b(unit price|rice.*price|category picture|out.of.stock|hide.*halo|new orders.*price)\b/))return {id:'menu.manage'};
        if(hit(/\b(per.hour.*fee|extra service rates|service.*catalog entry|rental fee|price.*service)\b/))return {id:'service.manage'};
        if(hit(/\b(updates on support requests|check.*bell for messages|unread work alerts)\b/))return {id:'notification.view'};
        if(hit(/\b(table.*add items|front desk.*payment.*restaurant.*post|pay.*print afterward|check out vs restaurant checkout|employee.*transaction history|print it.*deactivate|create two.*settle|adjust payment.*update an employee|handle the issue|where.*action button)\b/))return {status:'clarify'};
        if(hit(/\b(order food for me|place a food order for me|buy food for me)\b/))return {status:'unknown'};
        if(hit(/\b(can i get rid of this|admin access for this|do everything for me|export anything|delete this but keep|what does the button do|why is that number weird|update a setting|something is wrong|please fix it)\b/))return {status:'clarify'};
        if(hit(/\b(notification|notifications|alerts?|bell|unread|notices?|badge on the bell|new support replies|ticket update notices)\b/))return {id:'notification.view'};
        if(hit(/\b(audit|audit log|audit trail|logs|staff actions|employee actions|who (?:settled|voided|changed|posted|edited)|trace.*(?:action|payment)|history of administrative|past actions|find changes made|changes made by a staff|who has changed)\b/))return {id:'audit.search'};
        if(hit(/\b(who .*order.*yesterday|who .*order.*void|who .*staff.*action)\b/))return {id:'audit.search'};
        if(hit(/\b(catalog.*restaurant.*tables|catalog.*seating.*tables|table.*called .*|inactive table.*order|inactive table.*ordering|remove.*inactive table)\b/))return {id:'table.manage'};
        if(hit(/\b(restaurant ticket|food ticket)\b/) && hit(/\b(reverse|cancel|void|incorrect)\b/))return {id:'order.void'};
        if(ticket && (hit(/\b(ticket|tickets|support|issues?|maintenance|problem report|report a|reporting|faulty|broken|staff problem)\b/))){
            if(hit(/\b(resolve|resolved|resolution|mark.*resolved|close.*ticket|close.*issue|finaliz\w*|finish.*ticket|complete.*ticket|permission to resolve|staff problem)\b/) && hit(/\b(resolve|resolved|resolution|close|finaliz\w*|finish|complete|permission to resolve)\b/))return {id:'ticket.resolve'};
            if(hit(/\b(create|new|open|report|ask|submit|send|raise|need help|faulty|broken|where|request)\b/))return {id:'ticket.create'};
        }
        if(employee){
            if(hit(/\b(need.*(?:employee|cashier|staff).*account|need.*another.*account)\b/))return {id:'employee.create'};
            if(hit(/\b(remove.*(?:cashier|employee|worker|staff)(?:.*account|.*access|\b))\b/))return {id:'employee.deactivate'};
            if(hit(/\b(reactivate|re-activate|re-enable|reenable|unarchive|turn.*back on|back.*active|restore|returned|back on the team|active again|activate|enable an inactive)\b/))return {id:'employee.activate'};
            if(hit(/\b(deactivate|disable|revoke|inactive|remove access|former|fired|left|departed|terminated|archive|switch off|turn off|prevent.*using|no longer works)\b/))return {id:'employee.deactivate'};
            if(hit(/\b(both|also do front desk|two departments|front desk and restaurant|restaurant and front desk|permission|permissions|privileges?|rights|department access|roles?|cross.department|other workspace|another dashboard|cannot see.*dashboard|access to.*department|give.*access to restaurant and front desk)\b/) && (hit(/\b(give|change|edit|update|assign|manage|configure|grant|access|see|can|how|both)\b/)))return {id:'employee.permissions'};
            if((make||hit(/\b(how to register|register a front desk|new operator)\b/)) && !hit(/\b(payment|receipt|transaction|record.*payment)\b/))return {id:'employee.create'};
            if(nav || hit(/\b(roster|directory|accounts|list of|who has access|saved staff|account rights)\b/))return {id:'employee.find'};
        }
        if(receipt){
            if(hit(/\b(why|cannot|cant|can't|won't|wont|does not|doesnt|broken|fail|missing|disappear|disappeared|wrong|duplicate|did not|nothing|not visible|not print|not open|will not|does nothing|not loading|printer output|no longer|not working)\b/) && hit(/\b(receipt|print|printer|preview|view|reprint|history)\b/))return {id:'receipt.error'};
            if(hit(/\b(receipt builder|templates?|layouts?|blocks?|design|rearrang\w*|arrang\w*|position\w*|58\s*mm|80\s*mm|a4|publish|thermal|format|customiz\w*|move.*field|preview.*design|build my own)\b/))return {id:'receipt.builder'};
            if(hit(/\b(settings|branding|business|resort name|address|tin|branch|contact|logo|footer|tax mode|profile|printed under|receipt profile|printed on bills)\b/))return {id:'receipt.settings'};
            if(hit(/\bprint(?:ing)?\b/) && !trouble)return {id:'receipt.reprint'};
            if(hit(/\b(reprint|print another|print.*again|view.reprint|receipt history|old|previous|historic|past|lost|find|look up|search|saved|settled|same receipt|receipt number|acknowledgement again|view|open|yesterday|existing)\b/))return {id:'receipt.reprint'};
        }
        if(hit(/\b(promotion|promotions|promotional|promo|campaign|happy hour|sale campaign)\b/) && !hit(/\b(not eligible|rejected|failed|error|says not)\b/) && (hit(/\b(create|manage|admin|edit|date|deactivate|activate|configure|expiry|expired|validity|food promo|new|where|see promotional|eligibility|setup|set up|change)\b/)||!discount))return {id:'promotion.manage'};
        if(discount){
            if(trouble && hit(/\b(fail|rejected|invalid|error|cannot|cant|can't|won't|wont|doesnt|isnt|not|eligible|disabled|missing|wrong|not appearing|not applying|says not)\b/))return {id:'discount.error'};
            if(hit(/\b(apply|give|add|put|where|how|discount|deduct|use|calculate|vat exempt|senior|pwd|late|eligible)\b/))return {id:'discount.apply'};
        }
        if(hit(/\b(payment method|payment methods|gcash|landbank|transfer|card terminal|bank transfer|payment option|payment options|method dropdown|noncash|non-cash|method classification|classify cash|classif\w*.*noncash)\b/) && (hit(/\b(add|set up|setup|manage|configure|classif\w*|rename|disable|enable|activate|inactive|old|options|dropdown|missing|not in|not appear|select|method|payment method)\b/) || (hit(/\b(gcash|landbank)\b/) && hit(/\b(dropdown|list|available|shown|appear|option)\b/))))return {id:'payment.method'};
        if(hit(/\b(laundry|motorbike|extra towels?|extra bed|airport shuttle|service|services|additional charges?|additional charges management|extra charge type|service catalog|shuttle|rental|incidental|extra costs?|fee)\b/) && !(hit(/\b(reenable|reactivate|enable)\b/) && hit(/\b(table|tables)\b/))){
            if(hit(/\b(price|pricing|rate|rates|catalog|catalogue|admin|configure|manage|management|create.*service|edit.*service|deactivate.*service|deactivate.*charge type|hourly billing|change.*rate|update.*price)\b/) && !hit(/\b(incidental service fee|add.*guest charge|post extra costs)\b/))return {id:'service.manage'};
            if(room || hit(/\b(charge|post|add|fee|extra cost|costs|quantity|service)\b/))return {id:'charge.post'};
        }
        if(!hit(/\b(dining room|restaurant table)\b/) && hit(/\b(room post|room charge this|room charges?|post.*room|post.*stay|post food charges|send.*front desk|send.*room|attach.*active stay|bill room|food bill.*room|restaurant bill.*room|charge.*food.*room|room.*dinner|meal.*room|order.*room|order.*stay|room.*order|guest room|occupied guest room|bill to the room)\b/) && (order || hit(/\b(post|bill|dinner|meal|food|restaurant|table)\b/)))return {id:'order.roompost'};
        if(hit(/\b(table|tables|dining|awaiting payment)\b/)){
            if(hit(/\b(admin|add a new table|add table|create.*table|edit.*table|rename.*table|deactivate.*table|reactivate.*table|configure.*tables|manage.*table|table catalog|table records|table 13|table 09|re.?enable a table)\b/) && !hit(/\b(bill|order|cart|items)\b/))return {id:'table.manage'};
            if(hit(/\b(status|statuses|available|availability|dining|awaiting payment|waiting|which|show|find|filter|in use|occupied|how many|current|open|what is table|tables await payment)\b/) && !hit(/\b(order|cart|items|new order)\b/))return {id:'table.status'};
        }
        if(hit(/\b(menu|menu item|food category|category|categories|dish|chicken price|food pricing|drink|description|upload|image)\b/) && !hit(/\b(add another menu item|more menu items|current order|another menu item)\b/) && hit(/\b(admin|category|categories|description|price|pricing|upload|image|manage menu|menu item|deactivate|availability|new drink|edit|create.*category|switch.*off|food dish)\b/) && !hit(/\b(cart|existing order|current order|current table|add another.*order|extra.*order)\b/))return {id:'menu.manage'};
        if(order){
            if(hit(/\b(void|cancel|reverse|wrong order|duplicate.*order|accidentally created|remove.*order|void a mistake)\b/))return {id:'order.void'};
            if(hit(/\b(existing order|current order|cart|another.*item|more items|quantity|quantities|extra meals|another plate|additional.*item|add drinks|increase|update.*order|change.*order|add.*coffee|add.*menu item|add.*plate|two extra meals|food items.*table order|add another menu item)\b/))return {id:'order.additems'};
            if(hit(/\b(new order|create.*order|start.*order|take.*order|enter.*order|place.*order|make.*order|start ordering|restaurant pos|ordering.*meal|table order|create.*bill|order for table|guest order|food order|dining room order|order.*dining room|bill for.*restaurant table)\b/))return {id:'order.create'};
        }
        if(hit(/\b(check the amount received|checkout says.*amount|payment.*status.*uncertain)\b/))return {id:'payment.error'};
        if(hit(/\b(add an additional guest charge|add.*guest charge|post extra costs?)\b/))return {id:'charge.post'};
        if(room){
            if(hit(/\b(check[ -]?out|checkout|departure|end.*stay|close.*stay|finish.*stay|mark.*finished|visitor leaves|guest leaves|guest depart|complete.*checkout|complete.*stay|leave.*room|leaves the room|unsettled charges before checkout|room become vacant|completing a stay)\b/) && !hit(/\b(expected checkout date|input expected checkout|new stay|register a stay)\b/)){
                if((trouble && !hit(/\b(where to verify|where.*before checkout)\b/))||hit(/\b(not eligible|keeps failing|error|cannot checkout|cant checkout|it says unsettled|unpaid charge|room become vacant)\b/))return {id:'stay.checkout-error'};
                return {id:'stay.checkout'};
            }
            if(hit(/\b(check[ -]?in|register.*stay|register.*guest|new stay|new arrival|arriving|assign.*vacant|record.*arrival|expected checkout date|occupied stay|new guest|create.*stay|arrival|visitor|register a stay|record a new arrival)\b/) && !hit(/\b(room status|room catalog|admin setup)\b/))return {id:'stay.create'};
            if(hit(/\b(add.*room|create.*room|deactivate.*room|edit.*room|room number|new room|room inventory|room catalog|manage.*room|activate.*room|disabled room|renovation|room 305|remove.*room|register.*room|admin setup|add room)\b/))return {id:'room.create'};
            if(hit(/\b(occupied|vacant|available|availability|occupancy|statuses|status|rooms grid|which room|which rooms|what room|lookup|look up|all rooms|find room|see room|room 101|room status|availability board)\b/))return {id:'room.status'};
        }
        if(payment){
            const actualPaymentError=hit(/\b(why|can't|cant|cannot|couldn|won't|wont|doesn't|doesnt|unable|error|fail|failed|rejected|rejects|refuses|invalid|stuck|not working|not processing|uncertain|problem|does nothing|not accepted|overpayment)\b/);
            if((actualPaymentError||hit(/\b(uncertain payment|payment status is uncertain|checkout says check)\b/)) && hit(/\b(payment|pay|paying|settle|settlement|checkout|cash|balance|gcash|amount|overpayment)\b/))return {id:'payment.error'};
            if(hit(/\b(pay|payment|settle|settlement|collect|receive|cash|gcash|outstanding|balance|guest bill|remaining balance|record|mark.*paid|amount|money)\b/))return {id:'payment.record'};
        }
        if(ticket)return {id:'ticket.create'};
        if(previousTopic && hit(/\b(one|it|them|that|those)\b/))return {status:'clarify'};
        return null;
    }
    function smartNlpMatch(query, previousTopic='') {
        const routing=smartNlpRoute(query,previousTopic);
        if(routing?.status)return [];
        if(routing?.id){
            const intent=smartIntentDefinitions.find(x=>x.id===routing.id);
            if(intent){
                const preferred=Object.entries(intent.articles||{}).find(([workspace])=>workspace===role)||Object.entries(intent.articles||{}).find(([workspace])=>hasAccess(workspace))||Object.entries(intent.articles||{})[0];
                const article=HELP_ARTICLES.find(x=>x.id===preferred?.[1]);
                if(article)return [{article,score:300,intent,restricted:!hasAccess(article.role),workspaceSwitch:hasAccess(article.role)&&role!==article.role,matched:3}];
            }
        }
        const p=smartNlpAnalyze(query,previousTopic), t=p.tokens;
        const results=[];
        const hasGroup=arr=>arr?.some(x=>t.has(x));
        for(const intent of smartIntentDefinitions){
            if(!hasGroup(intent.objects)) continue;
            const foundAction=hasGroup(intent.actions);
            if(!foundAction) continue;
            if(intent.id.startsWith('employee.')&&!t.has('employee'))continue;
            if(intent.id==='employee.create' && (t.has('paymentmethod')||t.has('receipt')))continue;
            if(intent.id==='receipt.reprint' && (t.has('receiptbuilder')||t.has('receiptsettings')))continue;
            if(intent.id==='payment.record' && (t.has('paymentmethod')||t.has('error')))continue;
            if(intent.id==='payment.method'&&!t.has('paymentmethod')&&!((t.has('method'))&&(t.has('payment')||t.has('gcash')||t.has('cash')||t.has('bank')||t.has('card'))))continue;
            if(intent.id==='order.create'&&t.has('roompost'))continue;
            if(intent.id==='order.additems'&&!t.has('item')&&!t.has('cart')&&!t.has('menu'))continue;
            if(intent.id==='order.roompost'&&!t.has('roompost')&&!((t.has('room')||t.has('roomcharge'))&&(t.has('order')||t.has('post'))))continue;
            if(intent.id==='service.manage'&&t.has('roomcharge')&&!t.has('service'))continue;
            if(intent.id==='table.manage'&&role!=='admin'&&t.has('order'))continue;
            if(intent.id.endsWith('.error')&&!t.has('error'))continue;
            const roleArticleId=intent.articles?.[role];
            const authorizedArticleId=Object.entries(intent.articles||{}).find(([workspace])=>hasAccess(workspace))?.[1];
            const articleId=roleArticleId||authorizedArticleId||intent.articles?.admin||Object.values(intent.articles||{})[0];
            const article=HELP_ARTICLES.find(x=>x.id===articleId);
            if(!article)continue;
            const relevantObject=intent.objects.filter(x=>t.has(x)).length;
            const relevantAction=intent.actions.filter(x=>t.has(x)).length;
            let score=100+intent.priority*8+relevantObject*12+relevantAction*9+(roleArticleId?7:0);
            if(intent.id==='employee.permissions'&&(t.has('permission')||t.has('edit')))score+=40;
            if(intent.id==='employee.create'&&t.has('create'))score+=40;
            if(intent.id==='payment.error'&&t.has('error'))score+=30;
            if(intent.id==='receipt.error'&&t.has('error'))score+=30;
            if(intent.id==='discount.error'&&t.has('error'))score+=30;
            if(intent.id==='stay.checkout-error'&&t.has('error'))score+=30;
            if(intent.id==='receipt.reprint'&&t.has('reprint'))score+=25;
            if(intent.id==='order.roompost'&&t.has('roompost'))score+=60;
            if(intent.id==='table.manage'&&t.has('table')&&t.has('create'))score+=35;
            if(intent.id==='order.create'&&t.has('order')&&!t.has('item'))score+=30;
            if(intent.id==='order.additems'&&t.has('order')&&t.has('item'))score+=65;
            if(intent.id==='stay.create'&&t.has('stay'))score+=30;
            if(intent.id==='room.create'&&t.has('room')&&t.has('create'))score+=35;
            if(intent.id==='menu.manage'&&t.has('menu')&&t.has('edit'))score+=30;
            if(intent.id==='payment.method'&&t.has('paymentmethod'))score+=60;
            if(intent.id==='receipt.settings'&&t.has('receiptsettings'))score+=70;
            if(intent.id==='receipt.builder'&&t.has('receiptbuilder'))score+=70;
            if(intent.id==='ticket.resolve'&&t.has('resolve'))score+=55;
            results.push({article,score,intent,restricted:!hasAccess(article.role),workspaceSwitch:hasAccess(article.role)&&role!==article.role,matched:relevantObject+relevantAction});
        }
        results.sort((a,b)=>b.score-a.score);
        return results;
    }
    let smartLastNlpTopic='';
    const smartStopWords = new Set(['a','an','the','to','do','does','is','are','can','could','please','i','we','our','my','me','you','in','on','at','for','of','with','where','what','how','would','should','and','or','there','this','that','want','need','get','go','from','new','another','some','tell','show','why','cant','cannot','last','not']);
    const smartAliases = {
        staff:['employee','user','cashier','account'],employee:['staff','user','cashier','account'],user:['employee','staff','account'],add:['create','register','new'],create:['add','register','new'],register:['add','create','new'],
        receipt:['acknowledgement','acknowledgment','print','reprint'],reprint:['receipt','print','history'],print:['reprint','receipt'],
        paid:['payment','settle','settlement'],payment:['pay','settle','cash','checkout'],pay:['payment','settle','checkout'],settle:['payment','pay','outstanding'],
        discount:['pwd','senior','citizen','promo','promotion'],pwd:['discount','senior','citizen'],senior:['pwd','discount'],
        help:['guide','tutorial','instructions'],broken:['error','failed','problem'],error:['problem','invalid','failed'],
        table:['restaurant','order'],order:['restaurant','table'],room:['frontdesk','stay'],
        customize:['builder','settings','template'],design:['builder','template','layout'],
        gcash:['payment','noncash','method'],vat:['tax','discount','exemption'],change:['edit','update','configure','customize'],make:['create','add','register'],printing:['print','reprint','receipt'],account:['user','employee','staff'],cashier:['employee','staff','account'],template:['receipt','builder','layout']
    };
    function smartWords(value) {
        return String(value || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g,' ').split(/\s+/).filter(t=>t && !smartStopWords.has(t)).slice(0,14);
    }
    function smartSimilar(a,b) {
        if(a===b || b.startsWith(a) && a.length>=4 || a.startsWith(b) && b.length>=4) return true;
        if(a.length<4 || b.length<4 || Math.abs(a.length-b.length)>1) return false;
        let last=Array.from({length:b.length+1},(_,i)=>i);
        for(let i=1;i<=a.length;i++) {
            const current=[i];
            for(let j=1;j<=b.length;j++) current[j]=Math.min(current[j-1]+1,last[j]+1,last[j-1]+(a[i-1]===b[j-1]?0:1));
            last=current;
        }
        return last[b.length]<=1;
    }
    function smartMatches(word,hayWords) {
        const choices=[word,...(smartAliases[word]||[])];
        return choices.reduce((best,c,i)=>Math.max(best,hayWords.some(x=>x===c)?(i===0?5:3):hayWords.some(x=>smartSimilar(c,x))?(i===0?3:1):0),0);
    }
    function smartFind(q,cat='all') {
        if(cat==='all' && smartNlpRoute(q,smartLastNlpTopic)?.status)return [];
        const intentMatches=cat==='all'?smartNlpMatch(q,smartLastNlpTopic).filter(x=>x.article&&hasAccess(x.article.role)):[];
        const words=smartWords(smartTypoNormalize(q));
        if(!words.length && !intentMatches.length) return [];
        const ranked=HELP_ARTICLES.filter(a=>hasAccess(a.role) && (cat==='all'||a.category===cat)).map(a=>{
            const title=smartWords(a.title),keyword=smartWords(a.keywords),summary=smartWords(a.summary),body=smartWords(a.steps.join(' ')+' '+a.note);
            let score=0,matched=0;
            for(const w of words){
                const m=Math.max(smartMatches(w,title)*5,smartMatches(w,keyword)*4,smartMatches(w,summary)*2,smartMatches(w,body));
                if(m){score+=m;matched++;}
            }
            if(!matched || (words.length<=2 && matched!==words.length) || (words.length>2 && matched/words.length<0.67)) return null;
            score=score*matched/words.length;
            if(a.role===role) score+=7;
            else score-=4;
            if(a.role===role && a.routes.includes(route)) score+=3;
            if(helpCurrentContext().ids.includes(a.id)) score+=4;
            return {article:a,score,matched};
        }).filter(Boolean).sort((a,b)=>b.score-a.score||a.article.title.localeCompare(b.article.title));
        if(!intentMatches.length)return ranked;
        const matchedIds=new Set(intentMatches.map(x=>x.article.id));
        return [...intentMatches,...ranked.filter(x=>!matchedIds.has(x.article.id))];
    }
    function smartActivityKey() {return 'resortOS-smarthelp-articles-v1:'+String(employee()?.id||role);}
    function smartLoadActivity() {
        try {const ids=JSON.parse(localStorage.getItem(smartActivityKey())||'[]');return Array.isArray(ids)?ids.filter(x=>typeof x==='string').slice(0,12):[];} catch {return [];}
    }
    function smartRememberArticle(id) {
        smartRecent=[id,...smartRecent.filter(x=>x!==id)].slice(0,12);
        try {localStorage.setItem(smartActivityKey(),JSON.stringify(smartRecent));} catch {}
    }
    function smartContextArticles() {
        const ids=helpCurrentContext().ids;
        const list=ids.map(helpAllowed).filter(Boolean);
        const fallback=HELP_ARTICLES.filter(a=>a.role===role && a.category==='start');
        return [...list,...fallback].filter((a,i,all)=>all.findIndex(x=>x.id===a.id)===i).slice(0,4);
    }
    function smartTopicMarkup(article) {
        return `<button type="button" class="smart-topic" data-action="help-article" data-id="${esc(article.id)}"><span class="smart-topic-copy"><small>${esc(HELP_CATEGORIES[article.category])}</small><strong>${esc(article.title)}</strong><span>${esc(article.summary)}</span></span><span class="smart-topic-arrow" aria-hidden="true">→</span></button>`;
    }
    function smartSearchMarkup(text,category='all') {
        const boundary=smart74Boundary(text,'');
        if(boundary?.status==='unknown')return '<div class="smart-fallback"><strong>No verified resortOS feature found</strong><p>I cannot confirm this functionality or recommend an unrelated guide. Try another Help topic or ask management through Support & Issues.</p><button type="button" class="smart-link" data-action="help-smart-support">Ask Support & Issues →</button></div>';
        const results=smartFind(text,category).filter(x=>x.article&&hasAccess(x.article.role));
        if(!smartWords(text).length) return '<div class="smart-empty">Try “add employee”, “reprint receipt”, or “apply discount”.</div>';
        if(!results.length) return `<div class="smart-fallback"><strong>No reliable matching answer yet</strong><p>Try a shorter phrase, browse the articles, or ask management through Support & Issues. SmartHelp will not invent instructions.</p><button type="button" class="smart-link" data-action="help-smart-support">Create a support ticket →</button></div>`;
        return results.slice(0,8).map(({article})=>smartTopicMarkup(article)).join('');
    }
    let smart73AskStatus=null;
    function smart73ImmediateAnswer(question){
        const q=String(question||'').toLowerCase().replace(/[’]/g,"'");
        let id='';
        if(/\b(?:staff|employee|account|cashier|operator|user)\b/.test(q)&&/\b(?:look up|find|browse|view|see|directory|roster)\b/.test(q)&&/\b(?:existing|not add|not create|already|current|previously)\b/.test(q))id='employee.find';
        else if(/\b(?:staff|employee|account|cashier|operator|user)\b/.test(q)&&/\b(?:resigned|terminated|no longer log in|disable.*(?:account|them)|block.*account)\b/.test(q))id='employee.deactivate';
        else if(/\b(?:staff|employee|operator|cashier|waiter|receptionist)\b/.test(q)&&/\b(?:both departments|which dashboards|department privileges|front desk plus restaurant|permission settings)\b/.test(q))id='employee.permissions';
        else if(/\b(?:receipt|bill|proof of payment)\b/.test(q)&&/\b(?:reprint|previous|another copy|second copy|print.*again)\b/.test(q))id='receipt.reprint';
        else if(/\b(?:checkout|check out|departure)\b/.test(q)&&/\b(?:blocked|unpaid|unsettled|can't|cannot|won't|error)\b/.test(q))id='stay.checkout-error';
        if(!id)id=smart73DomainEvidence(question)?.id||'';
        if(!id)return null;
        const intent=smartIntentDefinitions.find(x=>x.id===id);
        const preferred=Object.entries(intent?.articles||{}).find(([workspace])=>workspace===role)
            ||Object.entries(intent?.articles||{}).find(([workspace])=>hasAccess(workspace))
            ||Object.entries(intent?.articles||{})[0];
        const verified=smart743ArticleFor(id);
        if(!verified || smart743ObjectGate(question,id))return null;
        const article=verified.article;
        return {article,intent,score:400,matched:3,verifiedCapability:id,restricted:verified.restricted,workspaceSwitch:hasAccess(article.role)&&role!==article.role};
    }
    function smartRunQuestion(question){
        const incoming=String(question||'').trim().slice(0,240);
        if(!incoming)return;
        smartSemanticRunId++; // cancel any in-flight stale model answer
        smartAskDraft='';
        const decision=smart744Policy(incoming,smart744LastVerified);
        smartQuestion=incoming;
        smartAnswer=smart744AnswerFor(decision);
        smart73AskStatus=decision.id==='__clarify__'?'clarify':decision.id==='__unsupported__'?'unknown':null;
        smartSemanticLastRanking={source:decision.source,reason:decision.reason,decision:decision.id,candidates:[],evidence:decision.evidence||null};
        smartSemanticSource='verified-policy';
        smartSemanticState='ready';
        smartSemanticMessage=smartAnswer?'Verified registry and object/action evidence':smart73AskStatus==='clarify'?'Please clarify the requested operation':'No verified resortOS guide for that request';
        // Clear context after a refusal. A cross-role change cannot reuse it.
        smart744LastVerified=smartAnswer?{id:decision.id,role,employeeId:String(employee()?.id||'')}:null;
        smart744Transcript.push({question:incoming,status:smartAnswer?(smartAnswer.restricted?'restricted':'verified'):smart73AskStatus,id:smartAnswer?.verifiedCapability||null,role});
        if(smart744Transcript.length>8)smart744Transcript=smart744Transcript.slice(-8);
        smartView='ask';helpSelected='';helpPanelLibrary=false;helpRenderRoot();
        document.querySelector('.smart-answer-main')?.scrollIntoView({block:'nearest'});
    }
    function smartAnswerMarkup() {
        const result=smartAnswer;
        const verified=result?.intent?.id?smart743ArticleFor(result.intent.id):null;
        const article=verified&&result?.article?.id===verified.article.id&&result.verifiedCapability===verified.capability.id?result.article:null;
        if(!article) {
            const status=smart73AskStatus||'unknown';
            if(status==='clarify'){
                const q=smartTypoNormalize(smartQuestion).toLowerCase();
                const options=[];
                if(/employee|staff|cashier|user|permission/.test(q))options.push(['Creating employees','How do I create a new employee?'],['Staff permissions','How do I change employee permissions?']);
                if(/receipt|print|invoice/.test(q))options.push(['Receipt History','How do I reprint a receipt?'],['Receipt Builder','How do I design a receipt template?']);
                if(/payment|pay|settle|cash/.test(q))options.push(['Record a payment','How do I record a guest payment?'],['Payment problems','Why can’t I complete this payment?']);
                if(/order|restaurant|table|food/.test(q))options.push(['Create an order','How do I create a restaurant order?'],['Manage tables','How can I manage restaurant tables?']);
                if(/discount|pwd|senior/.test(q))options.push(['Apply a discount','How do I apply a Senior Citizen discount?']);
                if(/room|stay/.test(q))options.push(['Room occupancy','How do I see occupied rooms?'],['Room charges','How do I add an additional guest charge?']);
                const buttons=options.slice(0,4).map(([label,question])=>`<button type="button" class="smart-btn" data-action="help-smart-question" data-id="${esc(question)}">${esc(label)} →</button>`).join('');
                return `<div class="smart-fallback" role="status"><strong>Which task would you like help with first?</strong><p>Your question could refer to multiple resortOS actions. Please select a topic below or describe the screen you're using. SmartHelp will not change any records automatically.</p><div class="smart-answer-actions">${buttons}</div><button class="smart-btn smart-primary" data-action="help-smart-support">Ask Support & Issues</button></div>`;
            }
            return `<div class="smart-fallback" role="status"><strong>No verified resortOS procedure found.</strong><p>I cannot confirm that this feature is available or safely provide steps for it. I will not substitute an unrelated workflow. Please browse Help Articles or ask an administrator through Support & Issues.</p><button class="smart-btn smart-primary" data-action="help-smart-support">Ask Support & Issues</button></div>`;
        }
        const intent=result.intent,restricted=!!result.restricted;
        const interpreted=smartTypoNormalize(smartQuestion);
        const correctionNote=interpreted.toLowerCase()!==smartQuestion.toLowerCase() ? `<div class="smart-spelling-note">Interpreted your question as: <strong>${esc(interpreted)}</strong></div>` : '';
        const otherWorkspace=!restricted && article.role!==role;
        const workspaceName=article.role==='admin'?'Admin':HELP_ROLES[article.role];
        const workspaceAction=otherWorkspace?`<button type="button" class="smart-btn smart-primary" data-action="help-smart-workspace" data-id="${esc(article.role)}">Switch to ${esc(workspaceName)} Dashboard →</button>`:'';
        const workspaceNote=otherWorkspace?`<div class="smart-answer-note"><strong>Your account is authorized.</strong> You're currently viewing the ${esc(HELP_ROLES[role])} dashboard. Switch to the ${esc(workspaceName)} dashboard to use these controls. SmartHelp will keep your question open and protect unsaved work.</div>`:'';
        const related=[]; // Do not surface unverified neighboring operational guides.
        const preferredGuide=intent?.guides?.[role]||intent?.guide;
        const guided=!restricted&&smartGuideForArticle(article); // Only the matching approved article may launch a guide.
        if(restricted){
            const required=article.role==='admin'?'Administrator':article.role==='frontdesk'?'Front Desk employee':'Restaurant employee';
            return `${correctionNote}<section class="smart-answer-main" aria-label="Permission-aware answer"><div class="smart-answer-label">RESORTOS TASK · RESTRICTED TO ${esc(required.toUpperCase())}</div><h3>${esc(article.title)}</h3><p>This operation is documented, but its instructions are available only to employees with the required workspace access.</p><div class="smart-answer-note"><strong>Access required:</strong> This task is handled by an authorized ${esc(required)}. Your signed-in employee account does not have ${esc(required)} access. Ask an authorized manager for assistance.</div><div class="smart-answer-actions"><button class="smart-btn smart-primary" data-action="help-smart-support">Ask Support & Issues</button></div></section>`;
        }
        return `${correctionNote}<section class="smart-answer-main" aria-label="Suggested answer"><div class="smart-answer-label">${result.source==='semantic'?'SEMANTIC TASK MATCH':intent?'MATCHED TASK':'BEST ARTICLE MATCH'} · ${esc(HELP_CATEGORIES[article.category])}</div><h3>${esc(article.title)}</h3><p>${esc(article.summary)}</p><ol class="smart-answer-steps">${article.steps.slice(0,4).map(step=>`<li>${esc(step)}</li>`).join('')}</ol>${article.steps.length>4?'<small>More details are available in the full article.</small>':''}${article.note?`<div class="smart-answer-note">${esc(article.note)}</div>`:''}${workspaceNote}<div class="smart-answer-actions"><button type="button" class="smart-btn${otherWorkspace?'':' smart-primary'}" data-action="help-article" data-id="${esc(article.id)}">Read full instructions →</button>${workspaceAction}${!otherWorkspace&&article.routes.find(routeAllowed)?`<button type="button" class="smart-btn" data-action="help-go" data-id="${esc(article.routes.find(routeAllowed))}">Open ${esc(helpNavName(article.routes.find(routeAllowed)))}</button>`:''}</div>${guided?`<div class="smart-answer-guide"><strong>Want interactive guidance?</strong>${smartGuidePanelButtons(guided.id)}</div>`:``}</section>${related.length?`<section class="smart-related"><h4>Related help</h4>${related.map(x=>smartTopicMarkup(x.article)).join('')}</section>`:''}<div class="smart-answer-foot">Based on verified resortOS instructions. For uncertain results, verify records before retrying.</div>`;
    }
    function smartAskPanelMarkup(tabs){
        const answered=!!smartQuestion;
        const suggested={
            foryou:role==='admin'?[
                ['Create an employee','How do I create a new employee?'],
                ['Configure payment methods','How do I configure payment methods?'],
                ['Edit receipt layout','How do I design a receipt template?']
            ]:role==='restaurant'?[
                ['Create a table order','How do I create a restaurant order?'],
                ['Apply a senior discount','How do I apply a Senior Citizen discount?'],
                ['Post an order to a room','How do I post a restaurant order to a guest room?']
            ]:[
                ['Record an outstanding payment','How do I record a guest payment?'],
                ['Find a previous receipt','Where can I reprint a previous receipt?'],
                ['Add a guest charge','How do I add an additional guest charge?']
            ],
            staff:[
                ['Add a new employee','How do I create a new employee?'],
                ['Change department access','How do I change employee permissions?'],
                ['Department access rules','Can I give an employee access to both departments?']
            ],
            payments:[
                ['Fix a payment problem','Why can’t I complete this payment?'],
                ['Reprint a receipt','Where can I reprint a previous receipt?'],
                ['Record a guest payment','How do I record a guest payment?']
            ],
            restaurant:[
                ['Create an order','How do I create a restaurant order?'],
                role==='restaurant'?['Apply a discount','How do I apply a Senior Citizen discount?']:['View restaurant tables','How do I view restaurant tables?'],
                ['Post bill to room','How do I post a restaurant order to a guest room?']
            ],
            settings:[
                ['Change receipt design','How do I design a receipt template?'],
                ['Set up payment methods','How do I configure payment methods?'],
                ['Manage the restaurant menu','How do I manage restaurant menu items?']
            ]
        };
        const categories=[['foryou','For you'],['staff','Staff'],['payments','Payments'],['restaurant','Restaurant'],['settings','Settings']];
        const current=categories.some(([key])=>key===smartAskCategory)?smartAskCategory:'foryou';
        const composer=`<form id="smarthelp-question-form" class="smart-ask-composer" aria-label="Ask a resortOS question"><label for="smart-question-ask">${answered?'Ask a follow-up':'Your question'}</label><div class="smart-ask-entry"><textarea id="smart-question-ask" name="q" data-smart-search="ask" rows="2" maxlength="240" required autocomplete="off" placeholder="${answered?'Ask a follow-up question...':'e.g. How do I add a new employee?'}">${esc(smartAskDraft)}</textarea><div class="smart-ask-entry-foot"><span>Enter to ask <span aria-hidden="true">·</span> Shift + Enter for new line</span><button type="submit" aria-label="Send question" title="Send question"><span aria-hidden="true">➜</span></button></div></div></form>`;
        const empty=`<div class="smart-ask-welcome"><div class="smart-ask-orb" aria-hidden="true">✦</div><div class="smart-ask-eyebrow"><span class="smart-status-dot"></span> RESORTOS ASSISTANT</div><h2>How can I help?</h2><p>From everyday tasks to tricky errors, find reliable answers and step-by-step guidance.</p><div class="smart-ask-context"><span aria-hidden="true">◈</span><span>Viewing ${esc(HELP_ROLES[role])} workspace</span></div></div>${composer}<section class="smart-ask-actions" aria-label="Help shortcuts"><div class="smart-ask-section-title"><h3>Or jump right in</h3></div><div class="smart-ask-action-grid"><button type="button" data-action="help-smart-tab" data-id="guides"><span class="smart-action-symbol">↗</span><span><strong>Guide me</strong><small>Step by step</small></span></button><button type="button" data-action="help-explore-start"><span class="smart-action-symbol">◇</span><span><strong>Explore page</strong><small>See what does what</small></span></button><button type="button" data-action="help-smart-tab" data-id="troubleshoot"><span class="smart-action-symbol">✳</span><span><strong>Fix an issue</strong><small>Find a solution</small></span></button></div></section><section class="smart-ask-suggestions" aria-label="Example questions"><div class="smart-ask-section-title"><h3>Explore questions</h3><span>Choose a topic</span></div><div class="smart-ask-category-row" role="group" aria-label="Question topics">${categories.map(([key,label])=>`<button type="button" data-action="help-smart-prompt-category" data-id="${key}" class="${current===key?'active':''}" aria-pressed="${current===key}">${label}</button>`).join('')}</div><div class="smart-ask-prompt-list">${suggested[current].map(([title,question])=>`<button type="button" data-action="help-smart-question" data-id="${esc(question)}"><span>${esc(title)}</span><span class="smart-prompt-arrow" aria-hidden="true">↗</span></button>`).join('')}</div></section>`;
        const priorTurns=smart744Transcript.slice(0,-1).map(turn=>`<div class="smart-ask-message-user"><span class="smart-ask-speaker">YOU · EARLIER</span><div class="smart-question-bubble">${esc(turn.question)}</div></div><div class="smart-fallback" role="note"><small>SmartHelp: ${esc(turn.status==='verified'?'Registry-verified answer':turn.status==='restricted'?'Restricted operation':turn.status==='clarify'?'Clarification requested':'No verified procedure')}</small></div>`).join('');
        const chat=`<div class="smart-ask-chat-head"><div class="smart-status-dot"></div><div><h2>SmartHelp conversation</h2><p>Verified instructions for resortOS</p></div><button type="button" data-action="help-smart-reset" class="smart-ask-new" title="Start a new question">New question <span aria-hidden="true">＋</span></button></div><section class="smart-ask-thread" aria-label="SmartHelp conversation">${priorTurns}<div class="smart-ask-message-user"><span class="smart-ask-speaker">YOU</span><div class="smart-question-bubble">${esc(smartQuestion)}</div></div><div class="smart-ask-message-assistant"><div class="smart-ask-assistant-label"><span class="smart-ask-mini-orb">✦</span><strong>SmartHelp</strong><span>Verified guidance</span></div>${smartAnswerMarkup()}</div></section>${smartSemanticStatusMarkup()}${composer}<div class="smart-ask-after-actions"><button type="button" data-action="help-smart-tab" data-id="guides">↗ Browse guides</button><button type="button" data-action="help-smart-tab" data-id="articles">▤ Help articles</button></div>`;
        return `<div class="smart-ask-shell ${answered?'smart-ask-answered':'smart-ask-empty'}">${answered?chat:empty}</div>`;
    }
    function smart2NavMarkup(){
        const tabs=[['home','⌂','Home'],['ask','✦','Ask'],['guides','↗','Guides'],['library','▤','Library']];
        return `<nav class="smart2-nav" aria-label="SmartHelp primary navigation">${tabs.map(([id,icon,label])=>`<button type="button" data-action="help-smart-tab" data-id="${id}" class="${smartView===id?'active':''}" ${smartView===id?'aria-current="page"':''}><span aria-hidden="true">${icon}</span><strong>${label}</strong></button>`).join('')}</nav>`;
    }
    function smart2LibraryMarkup(){
        const items=HELP_ARTICLES.filter(a=>hasAccess(a.role));
        const counts={articles:items.length,fixes:items.filter(a=>a.category==='fix').length,recent:smartRecent.length};
        const header=`<div class="smart2-screen-title"><span class="smart2-eyebrow">KNOWLEDGE CENTER</span><h2>Find trusted answers</h2><p>Everything your team needs, organized in one place.</p></div><div class="smart2-segments" role="group" aria-label="Library sections">${[['articles','Articles'],['fixes','Troubleshoot'],['recent','Recently read']].map(([id,label])=>`<button type="button" data-action="help-smart-library" data-id="${id}" class="${smartLibrarySection===id?'active':''}" aria-pressed="${smartLibrarySection===id}">${label}</button>`).join('')}</div>`;
        if(smartLibrarySection==='fixes')return header+smartTroubleMarkup();
        if(smartLibrarySection==='recent'){
            const recent=smartRecent.map(helpAllowed).filter(Boolean);
            return header+`<div class="smart2-list-heading"><strong>Recently opened</strong><span>${recent.length} articles</span></div>${recent.length?recent.map(smartTopicMarkup).join(''):'<div class="smart2-empty">Articles you read will appear here for quick access.</div>'}`;
        }
        const categoryArticles=items.filter(a=>(helpCategory==='all'||a.category===helpCategory)&& (a.role===role||hasAccess(a.role)));
        return header+`<div class="smart2-library-search"><label for="smart-article-filter">Search the knowledge base</label><div class="smart2-input-wrap"><span aria-hidden="true">⌕</span><input type="search" id="smart-article-filter" data-smart-search="articles" value="${esc(helpQuery)}" placeholder="Search articles, tasks, or error messages" maxlength="240"></div></div><div class="smart-categories" role="group" aria-label="Filter help topics">${[['all','All'],...Object.entries(HELP_CATEGORIES)].map(([key,label])=>`<button type="button" class="${helpCategory===key?'active':''}" data-action="help-category" data-id="${key}">${esc(label)}</button>`).join('')}</div><div class="smart2-list-heading"><strong id="smart-result-count">${helpQuery?'Search results':'Browse articles'}</strong><span>${categoryArticles.length} available</span></div><div id="smart-article-results" class="smart2-articles">${helpQuery?smartSearchMarkup(helpQuery,helpCategory):categoryArticles.map(smartTopicMarkup).join('')}</div>`;
    }
    function smartPanelContent() {
        const context=helpCurrentContext(),articles=smartContextArticles();
        if(helpSelected)return helpArticleMarkup(helpSelected,true);
        if(smartView==='diagnostics' && smartSemanticDebugEnabled())return smartSemanticDiagnosticsMarkup();
        if(smartView==='ask')return smartAskPanelMarkup('');
        if(smartView==='guides')return smartGuideListMarkup();
        if(smartView==='library')return smart2LibraryMarkup();
        const paused=smartGuidePaused||smartGuideLoad();
        const recent=smartRecent.map(helpAllowed).filter(Boolean).slice(0,2);
        const inModal=!!document.querySelector('#modal-root .modal');
        return `<div class="smart2-home"><section class="smart2-hero"><div class="smart2-hero-top"><span class="smart2-hero-status"><span class="smart-status-dot"></span>${esc(HELP_ROLES[role])} workspace</span><span class="smart2-hero-spark" aria-hidden="true">✦</span></div><h2>Help, right when<br>you need it.</h2><p>Ask a question, find a walkthrough, or understand the screen you're on.</p><form id="smarthelp-question-form" class="smart2-hero-search"><label for="smart-question-home" class="smart2-sr-only">Ask SmartHelp a question</label><input id="smart-question-home" name="q" data-smart-search="home" type="search" placeholder="What do you need help with?" autocomplete="off" maxlength="240" value="${esc(helpQuery)}" required><button type="submit" title="Ask SmartHelp" aria-label="Send question">➜</button></form></section><div id="smart-live-results" class="smart-live-results" ${helpQuery?'':'hidden'}>${helpQuery?smartSearchMarkup(helpQuery):''}</div>${paused?`<section class="smart2-notice"><div><strong>Continue where you left off</strong><span>${esc(smartGuides.find(g=>g.id===paused.id)?.title||'Interactive guide')}</span></div><button type="button" data-action="help-adaptive-resume">Resume →</button></section>`:''}${smartLastError&&smartLastError.role===role&&Date.now()-smartLastError.at<1200000?`<button type="button" class="smart2-alert" data-action="help-smart-tab" data-id="troubleshoot">An issue was recently reported · Review troubleshooting →</button>`:''}<section class="smart2-home-section"><div class="smart2-list-heading"><strong>What would you like to do?</strong></div><div class="smart2-action-grid"><button type="button" data-action="help-smart-tab" data-id="guides"><span class="smart2-action-icon">↗</span><strong>Guide me</strong><small>Step-by-step help</small></button><button type="button" data-action="help-explore-start"><span class="smart2-action-icon">◇</span><strong>Explore page</strong><small>Understand controls</small></button><button type="button" data-action="help-smart-tab" data-id="troubleshoot"><span class="smart2-action-icon">✳</span><strong>Fix a problem</strong><small>Resolve common errors</small></button><button type="button" data-action="help-smart-tab" data-id="articles"><span class="smart2-action-icon">▤</span><strong>Browse Library</strong><small>Verified knowledge</small></button></div></section><div class="smart2-home-lower"><section class="smart2-home-section"><div class="smart2-list-heading"><strong>Relevant to your screen</strong><span>${inModal?'Open window':'Current page'}</span></div><div class="smart2-context-card"><div><span class="smart2-eyebrow">YOU ARE VIEWING</span><strong>${esc(context.heading)}</strong></div><button type="button" data-action="help-explore-start" title="Explore screen controls" aria-label="Explore controls on this screen">↗</button></div><div class="smart2-recommendations">${articles.slice(0,2).map(smartTopicMarkup).join('')}</div></section><section class="smart2-home-section smart2-continue"><div class="smart2-list-heading"><strong>Pick up easily</strong><button type="button" data-action="help-smart-tab" data-id="activity">View history →</button></div>${recent.length?recent.map(a=>`<button type="button" class="smart2-recent-item" data-action="help-article" data-id="${esc(a.id)}"><span class="smart2-recent-icon">◷</span><span>${esc(a.title)}</span><span aria-hidden="true">↗</span></button>`).join(''):'<div class="smart2-empty">Recently read articles appear here.</div>'}<button type="button" class="smart2-start-guide" data-action="help-restart"><span aria-hidden="true">◎</span> New to resortOS? Start the guided tour <span aria-hidden="true">→</span></button></section></div></div>`;
    }

    const smartGuides = [
        { id:'fd-rooms',role:'frontdesk',title:'Find rooms and occupancy',destination:'rooms' },
        { id:'fd-stays',role:'frontdesk',title:'Find guest stays',destination:'stays' },
        { id:'fd-charges',role:'frontdesk',title:'Open additional and room charges',destination:'charges' },
        { id:'fd-checkout',role:'frontdesk',title:'Open guest checkout',destination:'checkout' },
        { id:'fd-receipts',role:'frontdesk',title:'Find and reprint a receipt',destination:'receipts' },
        { id:'fd-support',role:'frontdesk',title:'Find Support & Issues',destination:'tickets' },
        { id:'rs-tables',role:'restaurant',title:'Open restaurant tables',destination:'tables' },
        { id:'rs-orders',role:'restaurant',title:'Review restaurant orders',destination:'orders' },
        { id:'rs-neworder',role:'restaurant',title:'Start a restaurant order',destination:'neworder' },
        { id:'rs-roomcharges',role:'restaurant',title:'Review room-posted orders',destination:'roomcharges' },
        { id:'rs-receipts',role:'restaurant',title:'Find and reprint restaurant receipts',destination:'receipts' },
        { id:'rs-support',role:'restaurant',title:'Find Support & Issues',destination:'tickets' },
        { id:'ad-employees',role:'admin',title:'Open Add Employee form',destination:'users',action:'feature-edit-employee',modal:'add employee' },
        { id:'ad-users',role:'admin',title:'Manage employee permissions',destination:'users' },
        { id:'ad-menu',role:'admin',title:'Manage the Restaurant Menu',destination:'menu' },
        { id:'ad-methods',role:'admin',title:'Configure payment methods',destination:'payments' },
        { id:'ad-discounts',role:'admin',title:'Find Discount Management',destination:'discounts' },
        { id:'ad-builder',role:'admin',title:'Find Receipt Builder',destination:'receiptbuilder' },
        { id:'ad-receiptsettings',role:'admin',title:'Find Receipt Settings',destination:'receiptsettings' },
        { id:'ad-receipts',role:'admin',title:'Find Receipt History',destination:'receipts' },
        { id:'ad-audit',role:'admin',title:'Open Audit Log',destination:'audit' },
        { id:'ad-support',role:'admin',title:'Open the support queue',destination:'tickets' },
        { id:'op-fd-register',role:'frontdesk',title:'Register a guest stay · complete task',destination:'stays',operation:'stay' },
        { id:'op-fd-service',role:'frontdesk',title:'Post an additional service charge · complete task',destination:'charges',operation:'service' },
        { id:'op-fd-payment',role:'frontdesk',title:'Record an outstanding payment · complete task',destination:'checkout',operation:'frontdesk-payment' },
        { id:'op-fd-reprint',role:'frontdesk',title:'View and reprint an existing receipt',destination:'receipts',operation:'receipt' },
        { id:'op-rs-order',role:'restaurant',title:'Create a table order · complete task',destination:'neworder',operation:'order' },
        { id:'op-rs-payment',role:'restaurant',title:'Settle a restaurant bill · complete task',destination:'tables',operation:'restaurant-payment' },
        { id:'op-rs-room',role:'restaurant',title:'Post an order to a guest room · complete task',destination:'tables',operation:'post-room' },
        { id:'op-rs-discount',role:'restaurant',title:'Apply an eligible restaurant discount · complete task',destination:'orders',operation:'discount' },
        { id:'op-rs-reprint',role:'restaurant',title:'View and reprint restaurant receipt',destination:'receipts',operation:'receipt' },
        { id:'op-ad-employee',role:'admin',title:'Create a staff account · complete task',destination:'users',operation:'employee' },
        { id:'op-ad-payment-method',role:'admin',title:'Create a payment method · complete task',destination:'payments',operation:'method' },
        { id:'op-ad-promotion',role:'admin',title:'Configure a promotion · complete task',destination:'discounts',operation:'promotion' },
        { id:'op-ad-receipt-settings',role:'admin',title:'Save receipt branding settings · complete task',destination:'receiptsettings',operation:'receipt-settings' },
        { id:'op-fd-ticket',role:'frontdesk',title:'Create a support request · complete task',destination:'tickets',operation:'ticket' },
        { id:'op-rs-ticket',role:'restaurant',title:'Create a support request · complete task',destination:'tickets',operation:'ticket' }
    ];
    const smartOperationCopy = {
        stay:{intro:'Register a stay for an available room. Review the dates before saving.',working:'Choose an available room and dates, then submit Register Stay. I will verify a new stay exists.'},
        service:{intro:'Post a requested extra service to an active stay; accommodation charges are not included.',working:'Choose an occupied room, service and quantity or hours. Check the calculated total and post only the correct charge.'},
        'frontdesk-payment':{intro:'Record money only after it was actually received outside resortOS.',working:'Review the outstanding charges and choose a payment method. Cash can return change; non-cash cannot exceed the due amount. Confirm a real payment only once.'},
        receipt:{intro:'Open an existing payment receipt. Reprinting must never create another payment.',working:'Choose a paper size and use Open Print Preview if you want to print. Viewing a receipt makes no new charge.'},
        order:{intro:'Create a table order by adding menu items and selecting a table.',working:'Select one or more menu items, verify the table and quantities, then Save table order. Payment is not part of this step.'},
        'restaurant-payment':{intro:'Collect an already-due restaurant bill, never a draft order.',working:'Check the total, discounts and payment method; confirm only after payment is received. I verify the actual new payment record.'},
        'post-room':{intro:'Post a restaurant bill to an active guest room for later Front Desk settlement.',working:'Verify guest authorization and the selected occupied room before confirming the room posting.'},
        discount:{intro:'Apply only legally eligible discounts after validating the guest and eligible consumption.',working:'Select the eligible discount, verify the beneficiary and purchase details, review the preview, then confirm. Never guess tax eligibility.'},
        employee:{intro:'Only Admin can create staff accounts. Department access does not grant Admin rights.',working:'Enter a staff name, select operational department access and review permissions before saving. This is a demo identity, not authentication.'},
        method:{intro:'Configure a shared cash or non-cash payment method.',working:'Enter the method name and classification; only Cash calculates change. Save the new method when correct.'},
        promotion:{intro:'Create a promotion using eligibility and date rules.',working:'Review the promotion name, percentage, scope and active dates before saving.'},
        'receipt-settings':{intro:'Edit receipt branding without changing previous recorded transaction amounts.',working:'Review the resort identity, tax-registration status and contact details. Save only accurate business information.'},
        ticket:{intro:'Create a support request with a clear problem description.',working:'Enter the issue and choose its visibility. Review before submitting the ticket to management.'}
    };
    function smartOperationSnapshot(){
        const ids=kind=>(Array.isArray(data[kind])?data[kind]:[]).map(x=>String(x.id));
        return {stays:ids('stays'),charges:ids('charges'),orders:ids('orders'),orderUnits:Object.fromEntries((data.orders||[]).map(o=>[String(o.id),(o.items||[]).reduce((n,i)=>n+Number(i.qty||0),0)])),payments:ids('paymentRecords'),discounts:ids('discountEvents'),employees:ids('employees'),methods:ids('paymentMethods'),promotions:ids('promotions'),tickets:ids('tickets'),auditLength:(data.audit||[]).length};
    }
    function smartOperationNew(kind, predicate=()=>true){
        const original=new Set(smartGuide?.snapshot?.[kind]||[]);
        const store={payments:'paymentRecords',discounts:'discountEvents',methods:'paymentMethods'}[kind]||kind;
        return (data[store]||[]).find(x=>!original.has(String(x.id))&&predicate(x));
    }
    function smartOperationSuccess(kind){
        const s=smartGuide?.snapshot;
        if(!s)return false;
        switch(kind){
            case 'stay':return !!smartOperationNew('stays');
            case 'service':return !!smartOperationNew('charges',x=>x.source==='service');
            case 'frontdesk-payment':return !!smartOperationNew('payments',x=>x.area==='frontdesk');
            case 'receipt':return false;
            case 'order':return !!smartOperationNew('orders',x=>x.destination==='table') || (data.orders||[]).some(x=>x.destination==='table'&&x.status==='pending'&&s.orderUnits&&Object.hasOwn(s.orderUnits,String(x.id))&&(x.items||[]).reduce((n,i)=>n+Number(i.qty||0),0)>s.orderUnits[String(x.id)]);
            case 'restaurant-payment':return !!smartOperationNew('payments',x=>x.area==='restaurant');
            case 'post-room':return !!smartOperationNew('charges',x=>x.source==='restaurant');
            case 'discount':return !!smartOperationNew('discounts',x=>!x.reversed);
            case 'employee':return !!smartOperationNew('employees');
            case 'method':return !!smartOperationNew('methods');
            case 'promotion':return !!smartOperationNew('promotions');
            case 'ticket':return !!smartOperationNew('tickets');
            case 'receipt-settings':return (data.audit||[]).length>s.auditLength && (data.audit||[]).slice(0,(data.audit||[]).length-s.auditLength).some(x=>/updated receipt branding and tax profile/i.test(x.action||''));
            default:return false;
        }
    }
    function smartOpTarget(selector,label,message){return {kind:'target',selector,label,message};}
    function smartOpWorking(op,label){return {kind:'working',label,message:smartOperationCopy[op].working};}
    function smartOperationState(g){
        const op=g.operation;
        if(!op)return null;
        if(smartOperationSuccess(op))return {kind:'done',message:'The expected result was verified in the resortOS records. No action was performed by SmartHelp.'};
        const form=document.querySelector('#modal-root .modal form');
        const has=selector=>!!document.querySelector(selector);
        if(op==='receipt' && form?.getAttribute('id')==='feature-print-form')return {kind:'done',message:'The existing receipt preview is open. Select the format and print if needed; no payment has been recorded.'};
        const forms={stay:'stay-form',service:'service-form','frontdesk-payment':'checkout-pay-form',order:'', 'restaurant-payment':'restaurant-pay-form','post-room':'post-table-form',discount:'discount-apply-form',employee:'feature-employee-form',method:'feature-payment-form',promotion:'promotion-form','receipt-settings':'feature-receipt-form',ticket:'ticket-create-form'};
        if(forms[op]&&has('#'+forms[op]))return smartOpWorking(op,'Review and complete the form');
        const modal=document.querySelector('#modal-root .modal');
        if(modal){
            const selector=op==='restaurant-payment'?'[data-action="table-settle"],[data-action="table-bill"],[data-action="cash-pay"]':op==='post-room'?'[data-action="table-settle"],[data-action="table-bill"],[data-action="choose-post-room"]':op==='discount'?'[data-action="discount-order"]':'';
            if(selector){
                const target=modal.querySelector(selector);
                if(target)return smartOpTarget('[data-action="'+target.dataset.action+'"]'+(target.dataset.id?'[data-id="'+target.dataset.id+'"]':''),'Continue from this dialog','Use the highlighted action after confirming this is the intended order. SmartHelp does not apply discounts or accept payments itself.');
            }
            return {kind:'blocked',message:'Another dialog is open. Finish it or close it safely before continuing; unsaved details will not be discarded.'};
        }
        if(route!==g.destination)return null;
        if(op==='stay')return smartOpTarget('[data-action="register-stay"]','Open Register Stay',smartOperationCopy[op].intro);
        if(op==='service'){
            if(has('#service-form'))return smartOpWorking(op,'Complete the service charge');
            if(has('[data-action="charges-tab"][data-id="services"]'))return smartOpTarget('[data-action="charges-tab"][data-id="services"]','Open additional service charges',smartOperationCopy[op].intro);
            return smartOpTarget('[data-action="nav-addservice"]','Open service charge form',smartOperationCopy[op].intro);
        }
        if(op==='frontdesk-payment'){
            const st=(data.stays||[]).find(x=>x.active&&dueForStay(x.id)>.001);
            if(!st)return {kind:'blocked',message:'No active stay has an outstanding charge. Record a real charge first; SmartHelp will not invent a payment or guest.'};
            return smartOpTarget('[data-action="checkout-stay"][data-id="'+st.id+'"]','Review an outstanding stay',smartOperationCopy[op].intro);
        }
        if(op==='receipt'){
            const button=document.querySelector('[data-action="receipt-payment"],[data-action="receipt-order"]');
            if(!button)return {kind:'blocked',message:'No receipt is available in the current results. Clear the filters or create a genuine payment first.'};
            return smartOpTarget('[data-action="'+button.dataset.action+'"][data-id="'+button.dataset.id+'"]','Open an existing receipt',smartOperationCopy[op].intro);
        }
        if(op==='order')return smartOpWorking(op,'Build and save the restaurant order');
        if(['restaurant-payment','post-room'].includes(op)){
            const eligible=(data.orders||[]).find(x=>x.destination==='table'&&x.status==='awaiting_payment');
            if(!eligible)return {kind:'blocked',message:'No restaurant order is marked Awaiting Payment. Complete a genuine order and mark its table ready before using this guide.'};
            const button=document.querySelector('[data-action="open-table"][data-id="'+eligible.table+'"]');
            if(button)return smartOpTarget('[data-action="open-table"][data-id="'+eligible.table+'"]','Open the waiting table',smartOperationCopy[op].intro);
            return {kind:'blocked',message:'The waiting table cannot currently be found. Clear table filters and try Check again.'};
        }
        if(op==='discount'){
            const eligible=(data.orders||[]).find(x=>canDiscountOrder(x,null)&&['pending','awaiting_payment'].includes(x.status));
            if(!eligible)return {kind:'blocked',message:'No eligible unpaid restaurant order is available, or discount permission is missing. This guide cannot generate a qualifying purchase.'};
            const button=document.querySelector('[data-action="view-order"][data-id="'+eligible.id+'"]');
            if(button)return smartOpTarget('[data-action="view-order"][data-id="'+eligible.id+'"]','Open the eligible order',smartOperationCopy[op].intro);
            return {kind:'blocked',message:'The order is not in the current results. Clear the order filters and retry.'};
        }
        const targets={employee:['[data-action="feature-edit-employee"]','Open Add Employee'],method:['[data-action="feature-edit-payment"]','Open Add Payment Method'],promotion:['[data-action="promotion-new"]','Open Add Promotion'],ticket:['[data-action="ticket-create"]','Open Create Ticket']};
        if(targets[op])return smartOpTarget(targets[op][0],targets[op][1],smartOperationCopy[op].intro);
        if(op==='receipt-settings')return smartOpWorking(op,'Review and save receipt settings');
        return {kind:'blocked',message:'This task is unavailable in the current application state.'};
    }

    let smartGuide=null, smartGuidePaused=null;
    function smartGuideKey(){ return 'resortOS-smartguide-progress-v1:'+String(employee()?.id||role); }
    function smartGuidesForRole(){ return smartGuides.filter(g=>g.role===role && routeAllowed(g.destination)); }
    function smartGuideForArticle(article){
        if(!article) return null;
        const routes=(article.routes||[]).filter(routeAllowed);
        const direct=smartGuidesForRole().filter(g=>routes.includes(g.destination));
        if(!direct.length) return null;
        const wording=(article.title+' '+article.keywords).toLowerCase();
        const wantsOperation=/\b(how|register|record|create|post|apply|settle|save|reprint|payment|add)\b/i.test(article.title);
        if(wantsOperation){
            const matches=[
                [/employee|staff account/, 'employee'], [/receipt settings|branding/, 'receipt-settings'],
                [/reprint|receipt history/, 'receipt'], [/payment method/, 'method'],
                [/promotion/, 'promotion'], [/discount/, 'discount'], [/support ticket|report an issue/, 'ticket'],
                [/additional (service|charge)|post service/, 'service'], [/register (a )?stay|guest stay/, 'stay'],
                [/room post|post to room/, 'post-room'], [/restaurant payment|restaurant checkout/, 'restaurant-payment'],
                [/settle|outstanding payment/, 'frontdesk-payment'], [/new order|create (an )?order/, 'order']
            ];
            const op=matches.find(([pattern])=>pattern.test(wording))?.[1];
            const specific=op&&direct.find(g=>g.operation===op);
            if(specific)return specific;
        }
        // Do not substitute an unrelated task-specific guide just because its page matches.
        return direct.find(g=>!g.operation&&!g.action)||null;
    }
    function smartGuideLoad(){
        try {
            const record=JSON.parse(localStorage.getItem(smartGuideKey())||'null');
            return record && record.role===role && smartGuidesForRole().some(x=>x.id===record.id) ? record : null;
        } catch {return null;}
    }
    function smartGuidePersist(){
        try {
            if(smartGuidePaused) localStorage.setItem(smartGuideKey(),JSON.stringify(smartGuidePaused));
            else localStorage.removeItem(smartGuideKey());
        } catch {}
    }
    function smartGuidePanelButtons(id){
        return `<div class="smart-guide-actions"><button type="button" class="smart-btn smart-primary" data-action="help-adaptive-start" data-id="${esc(id)}">Show Me Where to Click</button><button type="button" class="smart-btn" data-action="help-adaptive-jump" data-id="${esc(id)}">Take Me There</button></div>`;
    }
    function smartGuideListMarkup(){
        const resumed=smartGuidePaused||smartGuideLoad();
        const all=smartGuidesForRole();
        const guides=all.filter(g=>smartGuideSection==='tasks'?!!g.operation:!g.operation);
        return `<div class="smart2-screen-title"><span class="smart2-eyebrow">INTERACTIVE SUPPORT</span><h2>Guides that work with you</h2><p>Follow highlighted controls or safely navigate to a task.</p></div>${resumed?`<div class="smart-guide-resume"><strong>Paused: ${esc(all.find(g=>g.id===resumed.id)?.title||'Guide')}</strong><button class="smart-btn smart-primary" data-action="help-adaptive-resume">Resume →</button><button class="smart-btn" data-action="help-adaptive-forget">Discard</button></div>`:''}<button type="button" class="smart2-guide-explore" data-action="help-explore-start"><span>◇</span><span><strong>Explore this page</strong><small>Point to controls and get explanations</small></span><span>↗</span></button><div class="smart2-segments" role="group" aria-label="Guide categories"><button type="button" data-action="help-guide-section" data-id="tasks" class="${smartGuideSection==='tasks'?'active':''}" aria-pressed="${smartGuideSection==='tasks'}">Complete a task (${all.filter(g=>g.operation).length})</button><button type="button" data-action="help-guide-section" data-id="find" class="${smartGuideSection==='find'?'active':''}" aria-pressed="${smartGuideSection==='find'}">Find a feature (${all.filter(g=>!g.operation).length})</button></div><div class="smart2-library-search"><label for="smart-guide-filter">Find a walkthrough</label><div class="smart2-input-wrap"><span aria-hidden="true">⌕</span><input type="search" id="smart-guide-filter" placeholder="Search guides..." autocomplete="off"></div></div><div class="smart2-list-heading"><strong>${smartGuideSection==='tasks'?'Operational walkthroughs':'Navigation walkthroughs'}</strong><span id="smart-guide-count">${guides.length} guides</span></div><div class="smart2-guides">${guides.map(g=>`<article class="smart2-guide-card" data-guide-entry="${esc(g.title+' '+helpNavName(g.destination))}"><div class="smart2-guide-icon">${g.operation?'✓':'↗'}</div><div class="smart2-guide-body"><strong>${esc(g.title.replace(' · complete task',''))}</strong><small>${esc(helpNavName(g.destination))} · ${g.operation?'Checks successful completion':'Guides real navigation'}</small>${smartGuidePanelButtons(g.id)}</div></article>`).join('')}</div><div class="smart2-empty" id="smart-guide-no-results" hidden>No matching guide. Try a different task or ask SmartHelp.</div><p class="smart-guide-note">SmartHelp never confirms a payment, discount, or permission change for you. Actions and final confirmation stay under your control.</p>`;
    }
    function smartGuideStart(id, mode='show'){
        const guide=smartGuidesForRole().find(g=>g.id===id);
        if(!guide){toast('This guide is not available for this dashboard.',true);return;}
        if(smartNavigationIsUnsafe(guide.destination)) return;
        const origin=route;
        if(mode==='jump'){
            if(route!==guide.destination){
                helpMode='closed';helpRenderRoot();
                go(guide.destination,guide.destination==='neworder' && route==='neworder');
            }
        }
        smartGuide={id,role,origin,mode,status:'active',snapshot:guide.operation?smartOperationSnapshot():null};
        smartGuidePaused=null;smartGuidePersist();
        helpSelected='';helpMode='adaptive';
        smartGuideSync();
    }
    function smartGuideState(g){
        if(!g||g.role!==role) return {kind:'error',message:'This guide is not available with your current permissions.'};
        if(!routeAllowed(g.destination)) return {kind:'error',message:'This destination is no longer accessible.'};
        if(g.operation){const operational=smartOperationState(g);if(operational)return operational;}
        const modal=document.querySelector('#modal-root .modal');
        if(modal){
            const name=String(modal.querySelector('.modal-head h2')?.textContent||'').toLowerCase();
            if(g.modal && route===g.destination && name.includes(g.modal))return {kind:'done',message:'The form is open. Complete and save it yourself after reviewing the required fields.'};
            return {kind:'blocked',message:'A dialog is open. Finish or close it before continuing the guide.'};
        }
        if(route===g.destination){
            if(g.action){
                return {kind:'target',selector:`[data-action="${g.action}"]`,label:'Open '+(g.modal==='add employee'?'Add Employee':'the next form'),message:'Select the highlighted button. SmartHelp will verify that the form opens, but it will not save anything.'};
            }
            return {kind:'done',message:'You reached the correct page. Follow its existing controls or read the related Help article for the remaining task.'};
        }
        if(role==='admin' && g.destination!=='audit' && g.destination!=='tickets' && g.destination!=='dashboard'){
            if(route!=='system')return {kind:'target',selector:'[data-nav="system"]',label:'Open System Management',message:'Click the highlighted System Management navigation entry.'};
            return {kind:'target',selector:`[data-nav="${g.destination}"]`,label:'Open '+helpNavName(g.destination),message:'Click the highlighted management tile.'};
        }
        const nav=document.querySelector(`[data-nav="${g.destination}"]`);
        if(nav)return {kind:'target',selector:`[data-nav="${g.destination}"]`,label:'Open '+helpNavName(g.destination),message:'Click the highlighted sidebar navigation entry.'};
        if(route!=='dashboard')return {kind:'target',selector:'[data-nav="dashboard"]',label:'Open Dashboard',message:'Click Dashboard to find the appropriate shortcut. Your progress will be preserved.'};
        return {kind:'target',selector:`[data-action="nav-${g.destination}"]`,label:'Find '+helpNavName(g.destination),message:'Click the highlighted dashboard shortcut.'};
    }
    function smartGuideInlineAnswer(question){
        if(!smartGuide || helpMode!=='adaptive')return;
        const text=String(question||'').trim().slice(0,180);
        if(!text)return;
        const decision=smart744Policy(text,null);
        const verified=smart744AnswerFor(decision);
        smartGuide.inlineQuestion=text;
        smartGuide.inlineResult=verified&&!verified.restricted?verified.article.id:'';
        smartGuideSync();
    }
    function smartGuideInlineRead(){
        const article=helpAllowed(smartGuide?.inlineResult);
        smartGuidePause();
        if(article)helpOpen(article.id);else helpOpen();
    }
    function smartGuidePause(){
        if(!smartGuide)return;
        smartGuidePaused={id:smartGuide.id,role:smartGuide.role,origin:smartGuide.origin,snapshot:smartGuide.snapshot||null};
        smartGuide=null;smartGuidePersist();helpMode='closed';helpRenderRoot();
        toast('Guide paused. Resume it from SmartHelp → Guides.');
    }
    function smartGuideExit(){smartGuide=null;smartGuidePaused=null;smartGuidePersist();helpMode='closed';helpRenderRoot();}
    function smartGuideResume(){
        const state=smartGuidePaused||smartGuideLoad();
        if(!state)return;
        if(!smartGuidesForRole().some(g=>g.id===state.id)){toast('This guide is no longer available for this dashboard.',true);return;}
        smartGuide={id:state.id,role,origin:state.origin,status:'active',mode:'show',snapshot:state.snapshot||null};
        smartGuidePaused=null;smartGuidePersist();helpMode='adaptive';smartGuideSync();
    }
    function smartGuideSync(){
        if(helpMode!=='adaptive'||!smartGuide)return;
        const guide=smartGuidesForRole().find(g=>g.id===smartGuide.id);
        const state=smartGuideState(guide);
        if(state.kind==='done')smartGuide.status='done';
        helpRenderRoot();
    }
    function smartGuidePosition(){
        if(helpMode!=='adaptive'||!smartGuide)return;
        const root=document.getElementById('help-root');
        const state=smartGuideState(smartGuidesForRole().find(g=>g.id===smartGuide.id));
        if(state.kind!=='target'||!root?.querySelector('.smart-adaptive-focus'))return;
        const target=document.querySelector(state.selector);
        if(!target||!target.getClientRects().length)return;
        const r=target.getBoundingClientRect(), vw=window.innerWidth,vh=window.innerHeight,pad=6;
        const x=Math.max(0,r.left-pad),y=Math.max(0,r.top-pad),right=Math.min(vw,r.right+pad),bottom=Math.min(vh,r.bottom+pad);
        if(right<=x||bottom<=y)return;
        const rects=[{top:0,left:0,width:vw,height:y},{top:bottom,left:0,width:vw,height:vh-bottom},{top:y,left:0,width:x,height:bottom-y},{top:y,left:right,width:vw-right,height:bottom-y}];
        root.querySelectorAll('.smart-adaptive-curtain').forEach((el,i)=>Object.assign(el.style,Object.fromEntries(Object.entries(rects[i]).map(([k,v])=>[k,v+'px']))));
        Object.assign(root.querySelector('.smart-adaptive-focus').style,{left:x+'px',top:y+'px',width:right-x+'px',height:bottom-y+'px'});
        const card=root.querySelector('.smart-adaptive-card');
        if(card){
            const width=Math.min(370,vw-24),height=card.offsetHeight||250;
            const left=Math.max(12,Math.min(x,vw-width-12));
            const top=bottom+height+12<vh?bottom+12:y-height-12>12?y-height-12:Math.max(12,Math.min(vh-height-12,bottom+12));
            Object.assign(card.style,{width:width+'px',top:top+'px',left:left+'px'});
        }
    }
    function smartGuideInlineMarkup(){return `<div class="smart-adaptive-inline"><form id="smart-adaptive-question-form"><label for="smart-adaptive-question">Question about this step?</label><div><input id="smart-adaptive-question" name="question" maxlength="180" autocomplete="off" placeholder="Ask about the current task..."><button type="submit">Ask</button></div></form>${smartGuide.inlineQuestion?`<div class="smart-adaptive-answer">${smartGuide.inlineResult?(()=>{const a=helpAllowed(smartGuide.inlineResult);return a?`<strong>${esc(a.title)}</strong><p>${esc(a.summary)}</p><button type="button" data-action="help-adaptive-inline-read">Read full answer</button>`:'<p>No verified answer is available for that question. You can pause the guide and ask Support & Issues.</p>'})():'<p>I could not find a reliable answer. Try rephrasing, or pause the guide to contact Support & Issues.</p>'}</div>`:''}</div>`;}
    function smartGuideRender(){
        const guide=smartGuidesForRole().find(g=>g.id===smartGuide?.id);
        const state=smartGuideState(guide),root=document.getElementById('help-root');
        if(!root)return;
        if(state.kind==='target'){
            if(window.innerWidth<=780&&state.selector.includes('data-nav')&&!mobile){mobile=true;render();}
            const target=document.querySelector(state.selector);
            if(!target||target.disabled||!target.getClientRects().length){
                root.innerHTML=`<section class="smart-adaptive-message" role="status"><strong>Guide needs your attention</strong><p>The next control is not available. Your progress is preserved. Close any overlapping panel or return to the expected screen.</p><div class="smart-guide-actions"><button class="smart-btn" data-action="help-adaptive-pause">Pause guide</button><button class="smart-btn" data-action="help-adaptive-exit">Exit</button></div></section>`;
                return;
            }
            if(target.getBoundingClientRect().top<0||target.getBoundingClientRect().bottom>window.innerHeight) target.scrollIntoView({block:'nearest'});
            root.innerHTML=`<div class="smart-adaptive-overlay" role="region" aria-label="Live navigation guide"><div class="smart-adaptive-curtain"></div><div class="smart-adaptive-curtain"></div><div class="smart-adaptive-curtain"></div><div class="smart-adaptive-curtain"></div><div class="smart-adaptive-focus" aria-hidden="true"></div><section class="smart-adaptive-card" aria-live="polite"><div class="smart-adaptive-head"><span>SMARTHELP · LIVE GUIDE</span><button type="button" data-action="help-adaptive-exit" aria-label="Exit guide">×</button></div><strong>${esc(guide.title)}</strong><h3>${esc(state.label)}</h3><p>${esc(state.message)}</p><small>Continue by clicking the real highlighted control. Navigation is verified from the current page.</small>${smartGuideInlineMarkup()}<div class="smart-adaptive-actions"><button type="button" data-action="help-adaptive-pause">Pause</button><button type="button" data-action="help-adaptive-exit">Exit</button></div></section></div>`;
            smartGuidePosition();requestAnimationFrame(smartGuidePosition);
            return;
        }
        if(state.kind==='working'){
            root.innerHTML=`<section class="smart-operation-card" role="status"><div class="smart-adaptive-message-head"><span>SMARTHELP · VERIFIED TASK</span><button type="button" data-action="help-adaptive-pause" aria-label="Pause guide">×</button></div><strong>${esc(guide.title)}</strong><h3>${esc(state.label||'Complete this task')}</h3><p>${esc(state.message)}</p><div class="smart-operation-warning">You control all entries and confirmations. SmartHelp verifies the result but never submits this form.</div>${smartGuide.lastError?`${smartRecoveryMarkup(smartGuide.lastError,true)}`:''}${smartGuideInlineMarkup()}<div class="smart-operation-actions"><button data-action="help-adaptive-check">Check result</button><button data-action="help-adaptive-pause">Pause</button><button data-action="help-adaptive-exit">Exit</button></div></section>`;
            return;
        }
        root.innerHTML=`<section class="smart-adaptive-message" role="status"><div class="smart-adaptive-message-head"><span>${state.kind==='done'?'✓ TASK VERIFIED':'GUIDE NEEDS ATTENTION'}</span><button type="button" data-action="help-adaptive-exit" aria-label="Exit guide">×</button></div><h3>${esc(guide?.title||'SmartHelp')}</h3><p>${esc(state.message)}</p><div class="smart-guide-actions">${state.kind==='done'?`<button class="smart-btn smart-primary" data-action="help-adaptive-complete">Finish guide</button><button class="smart-btn" data-action="help-adaptive-article">Read instructions</button>`:`<button class="smart-btn" data-action="help-adaptive-check">Check again</button><button class="smart-btn" data-action="help-adaptive-pause">Pause guide</button><button class="smart-btn" data-action="help-smart-support">Ask Support</button>`}</div></section>`;
    }
    function smartGuideReadArticle(){
        const guide=smartGuidesForRole().find(g=>g.id===smartGuide?.id);
        const article=guide && HELP_ARTICLES.find(a=>a.role===role&&a.routes.includes(guide.destination));
        smartGuideExit();
        if(article)helpOpen(article.id); else helpOpen();
    }

    const smartExploreActionInfo = {
        'register-stay':['Register a guest stay','Open the stay registration form. Review guest and room details before saving.','stays'],
        'view-stay':['View stay details','Inspect a guest stay and its associated charges.','stays'],
        'view-charges':['View room charges','Review the charges associated with a room or guest stay.','charges'],
        'checkout-stay':['Review checkout','Open the checkout workflow and verify the outstanding balance before recording any payment.','checkout'],
        'receipt-payment':['View payment receipt','Open a saved payment acknowledgement. Reprinting does not record a new payment.','receipts'],
        'open-table':['Open table','Inspect this table and its current restaurant order.','tables'],
        'view-order':['View restaurant order','Inspect items, status, and permitted next actions for this restaurant order.','orders'],
        'ticket-create':['Create support ticket','Open a Support & Issues ticket draft. Review its information before submitting.','tickets'],
        'ticket-view':['Open support ticket','Inspect the ticket conversation, status and updates.','tickets'],
        'rs-table-filter':['Filter tables','Change which table statuses are displayed. This does not change any table order.','tables'],
        'fd-room-filter':['Filter rooms','Show only rooms matching the selected occupancy or balance filter.','rooms'],
        'fd-stay-filter':['Filter stays','Change the stay list filter without editing a stay.','stays'],
        'charges-tab':['Switch charges section','Move between outstanding charges and additional service charges.','charges'],
        'roomcharges-tab':['Switch room charge view','Show restaurant postings or charge records linked to rooms.','roomcharges'],
        'cart-plus':['Increase item quantity','Adds another unit of the selected food item to the draft cart. Review the order before posting.','neworder'],
        'cart-minus':['Decrease item quantity','Reduces the draft quantity of this food item.','neworder'],
        'feature-edit-employee':['Manage employee account','Open an employee form. Staff access changes require authorized Admin review and saving.','users'],
        'rb-save':['Save receipt draft','Save the Receipt Builder draft without publishing it as the active design.','receiptbuilder'],
        'rb-publish':['Publish receipt design','Publish the saved layout used for future printed receipts. Review before confirming.','receiptbuilder'],
        'rb-test-print':['Test print layout','Preview or print a test layout without recording a customer payment.','receiptbuilder'],
        'rb-undo':['Undo receipt edit','Undo the most recent available Receipt Builder edit.','receiptbuilder'],
        'rb-redo':['Redo receipt edit','Restore the next available Receipt Builder edit.','receiptbuilder'],
        'rb-branding':['Receipt branding','Open or edit resort identity details used on printed acknowledgements.','receiptsettings'],
        'rb-reset':['Reset receipt layout','Reset the current receipt design. Confirm any destructive reset only after reviewing it.','receiptbuilder'],
        'rb-delete':['Remove receipt block','Remove a selected layout block. This changes the draft design, not saved payments.','receiptbuilder'],
        'rb-add':['Add receipt block','Insert a layout block into the Receipt Builder draft.','receiptbuilder'],
        'rb-select':['Select receipt block','Select this design block for layout editing.','receiptbuilder'],
        'rb-copy':['Copy receipt layout','Create a separate copy of the receipt layout for editing.','receiptbuilder'],
        'rb-duplicate':['Duplicate receipt block','Copy this block within the draft receipt design.','receiptbuilder']
    };
    const smartExploreRouteInfo = {
        dashboard:'Return to the dashboard overview for this department.',
        rooms:'View and manage room availability and related room records.',
        stays:'Review guest stays and register new stays.',
        charges:'Review outstanding room charges and additional services.',
        checkout:'Review charges and record externally received settlement payments.',
        tables:'View restaurant table status and associated orders.',
        orders:'Find and review restaurant orders.',
        neworder:'Prepare a restaurant order before posting or checkout.',
        roomcharges:'Review restaurant charges posted to active room stays.',
        receipts:'Search previous payments and reprint their receipts.',
        audit:'Review historical staff actions and system changes.',
        system:'Open Admin system configuration categories.',
        users:'Manage employee accounts and authorized department access.',
        menu:'Manage restaurant menu items and availability.',
        categories:'Manage restaurant menu categories.',
        services:'Configure additional charge service items.',
        payments:'Configure externally accepted payment methods.',
        discounts:'Review authorized discount settings and statutory discount rules.',
        receiptsettings:'Configure resort identity and printed receipt information.',
        receiptbuilder:'Create and publish receipt layouts.',
        tickets:'Open Support & Issues for questions and problem reports.'
    };
    let smartExploreItems=[], smartExploreSelected=-1, smartExploreOrigin=null;
    const smartExploreClean = v => String(v||'').replace(/\s+/g,' ').trim().slice(0,92);
    function smartExploreArticle(routeHint){
        const context=helpCurrentContext().ids.map(helpAllowed).filter(Boolean);
        return context.find(a=>a.routes.includes(routeHint)) || HELP_ARTICLES.find(a=>a.role===role && a.routes.includes(routeHint)) || (routeHint===route?context[0]:null) || null;
    }
    function smartExploreField(el){
        const id=el.id, name=el.getAttribute('name');
        const label=(id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) || el.closest('.field')?.querySelector('label');
        const title=smartExploreClean(label?.textContent || el.getAttribute('aria-label') || (name?name.replace(/[-_]/g,' '):''));
        if(!title) return null;
        let text='This field is part of the current form. Check the value and the instructions before submitting.';
        if(/amount|received|tender|cash/i.test(title))text='Enter or review the correct amount. Cash and non-cash methods can follow different validation rules. Do not retry an uncertain payment without checking Receipt History.';
        else if(/method|payment/i.test(title))text='Choose the appropriate active payment method. Only methods classified as cash can calculate change.';
        else if(/role|department|access|permission/i.test(title))text='Select only the intended authorized access. Employee permissions are finalized by an Admin when the form is saved.';
        else if(/date|time/i.test(title))text='Review this date or time value for accuracy before saving.';
        else if(/tax|vat|discount/i.test(title))text='Review the applicable financial or discount setting and its related Help article before saving.';
        return {title,description:text,routeHint:route,kind:'field'};
    }
    function smartExploreCandidate(el,modal){
        if(el.closest('#help-root,.help-inline-info,.notification-popover'))return null;
        if(el.disabled || el.getAttribute('aria-hidden')==='true' || el.type==='hidden')return null;
        const r=el.getBoundingClientRect(),st=getComputedStyle(el);
        if(r.width<9||r.height<9||st.visibility==='hidden'||st.display==='none')return null;
        if(r.right<2||r.left>innerWidth-2)return null;
        if(el.matches('input,select,textarea'))return smartExploreField(el);
        const nav=el.dataset.nav || (el.dataset.action?.startsWith('nav-')?el.dataset.action.slice(4):null);
        if(nav){
            if(!routeAllowed(nav))return null;
            return {title:helpNavName(nav),description:smartExploreRouteInfo[nav] || 'Open this authorized resortOS section.',routeHint:nav,kind:'navigation'};
        }
        const act=el.dataset.action;
        if(act && smartExploreActionInfo[act]){
            const [title,description,routeHint]=smartExploreActionInfo[act];
            return {title,description,routeHint,kind:'action'};
        }
        if(modal && el.matches('button')){
            if(act==='modal-close')return {title:'Close window',description:'Close this window. If you entered unsaved information, check whether closing it would discard your changes.',routeHint:route,kind:'action'};
            if(act?.startsWith('help-'))return null;
            const title=smartExploreClean(el.getAttribute('aria-label')||el.textContent);
            if(!title||title==='×'||title.length>64)return null;
            const dangerous=/pay|settle|confirm|save|void|delete|disable|apply discount|submit|post to|record|publish/i.test(title);
            return {title,description:dangerous?'This action may change a real resortOS record. Review the form and its confirmation carefully. Explore Mode will never perform it.':'This control belongs to the current window. Read its label and related instructions before using it.',routeHint:route,kind:'action'};
        }
        return null;
    }
    function smartExploreCollect(){
        const modal=document.querySelector('#modal-root .modal');
        const scope=modal || document.querySelector('#app');
        if(!scope)return [];
        const elements=modal ? scope.querySelectorAll('button,input,select,textarea') : scope.querySelectorAll('.sidebar [data-nav],.content [data-nav],.content [data-action],.content input,.content select,.content textarea');
        const items=[], seen=new Set();
        for(const el of elements){
            const info=smartExploreCandidate(el,!!modal);
            if(!info)continue;
            const key=(el.dataset.action||el.dataset.nav||el.id||info.title)+'|'+info.title;
            if(seen.has(key))continue;
            seen.add(key);
            const article=smartExploreArticle(info.routeHint);
            const guide=smartGuidesForRole().find(g=>g.destination===info.routeHint && (!g.action || g.action===el.dataset.action));
            items.push({...info,el,articleId:article?.id||'',guideId:guide?.id||''});
            if(items.length>=26)break;
        }
        return items;
    }
    function smartExploreStart(){
        if(helpMode==='adaptive')smartGuidePause();
        if(helpMode==='guide')helpFinishGuide();
        smartExploreOrigin=document.activeElement;
        smartExploreItems=smartExploreCollect();
        smartExploreSelected=-1;
        if(!smartExploreItems.length){toast('No supported controls are visible for Explore Mode on this screen.',true);return;}
        helpMode='explore';
        document.getElementById('app').inert=true;
        document.getElementById('modal-root').inert=true;
        helpRenderRoot();
    }
    function smartExploreEnd(openPanel=true){
        document.getElementById('app').inert=false;
        document.getElementById('modal-root').inert=false;
        smartExploreItems=[];smartExploreSelected=-1;
        helpMode=openPanel?'panel':'closed';
        if(openPanel){smartView='home';helpSelected='';}
        helpRenderRoot();
        if(!openPanel&&smartExploreOrigin?.isConnected)smartExploreOrigin.focus();
        smartExploreOrigin=null;
    }
    function smartExplorePick(index){
        const n=Number(index);
        if(!Number.isInteger(n)||n<0||n>=smartExploreItems.length)return;
        smartExploreSelected=n;
        const target=smartExploreItems[n].el;
        if(target?.isConnected){
            target.scrollIntoView({block:'nearest',inline:'nearest'});
        }
        smartExploreRender();
    }
    function smartExploreLaunchGuide(){
        const item=smartExploreItems[smartExploreSelected];
        if(!item?.guideId)return;
        if(document.querySelector('#modal-root .modal')){toast('Finish or close this window before starting a navigation guide. Your form remains unchanged.',true);return;}
        smartExploreEnd(false);
        smartGuideStart(item.guideId,'show');
    }
    function smartExploreReadArticle(){
        const item=smartExploreItems[smartExploreSelected];
        if(!item?.articleId)return;
        smartExploreEnd(false);
        smartView='articles';helpOpen(item.articleId);
    }
    function smartExplorePosition(){
        if(helpMode!=='explore')return;
        const root=document.getElementById('help-root');
        root?.querySelectorAll('.smart-explore-marker').forEach(marker=>{
            const i=Number(marker.dataset.id),item=smartExploreItems[i];
            if(!item?.el?.isConnected){marker.hidden=true;return;}
            const r=item.el.getBoundingClientRect();
            const host=item.el.closest('.modal');
            const hr=host?.getBoundingClientRect();
            const visible=r.width>=9&&r.height>=9&&r.right>=10&&r.left<innerWidth-10&&r.bottom>=10&&r.top<innerHeight-10 && (!hr||(r.bottom>hr.top+10&&r.top<hr.bottom-10));
            marker.hidden=!visible;
            if(!visible)return;
            Object.assign(marker.style,{top:Math.max(8,Math.min(innerHeight-40,r.top+Math.min(9,r.height/2)))+'px',left:Math.max(8,Math.min(innerWidth-40,r.right-16))+'px'});
        });
    }
    function smartExploreRender(){
        if(helpMode!=='explore')return;
        const root=document.getElementById('help-root');
        if(!root)return;
        const item=smartExploreItems[smartExploreSelected];
        root.innerHTML=`<div class="smart-explore-layer" role="region" aria-label="Read-only Explore This Page"><div class="smart-explore-shield" aria-hidden="true"></div>${smartExploreItems.map((entry,i)=>`<button class="smart-explore-marker ${smartExploreSelected===i?'active':''}" data-action="help-explore-pick" data-id="${i}" type="button" aria-label="Explain ${esc(entry.title)}" title="${esc(entry.title)}">${i+1}</button>`).join('')}<div class="smart-explore-toolbar"><div><span class="smart-explore-eyebrow">SMARTHELP · DISCOVER</span><strong>Explore This ${document.querySelector('#modal-root .modal')?'Window':'Page'}</strong><small>${smartExploreItems.length} explained controls · Read-only</small></div><div class="smart-explore-toolbar-buttons"><button data-action="help-explore-prev" type="button" ${smartExploreSelected<=0?'disabled':''}>← Prev</button><button data-action="help-explore-next" type="button" ${smartExploreSelected>=smartExploreItems.length-1?'disabled':''}>Next →</button><button data-action="help-explore-exit" type="button" class="smart-explore-exit">Exit</button></div></div>${item?`<section class="smart-explore-explanation" aria-live="polite"><div class="smart-explore-explanation-head"><span>EXPLANATION ${smartExploreSelected+1} OF ${smartExploreItems.length}</span><button type="button" data-action="help-explore-dismiss" aria-label="Close explanation">×</button></div><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="smart-explore-links">${item.guideId?'<button type="button" data-action="help-explore-guide">Guide Me →</button>':''}${item.articleId?'<button type="button" data-action="help-explore-article">Read Article</button>':''}</div></section>`:''}</div>`;
        smartExplorePosition();requestAnimationFrame(smartExplorePosition);
        (item?root.querySelector('.smart-explore-explanation button'):root.querySelector('.smart-explore-toolbar-buttons .smart-explore-exit'))?.focus({preventScroll:true});
    }

    let helpMode = 'closed', helpQuery = '', helpCategory = 'all', helpSelected = '', helpReturnRoute = null, helpFocusReturn = null, helpPanelLibrary = false, helpDraft = null;
    let helpGuideStep = 0;
    const helpTours = {
        frontdesk: [
            { selector: '[data-nav="rooms"]', title: 'Explore the rooms', text: 'Click Rooms to see which rooms are available or occupied and open a room to review its stay.' },
            { selector: '[data-nav="stays"]', title: 'Guest stays', text: 'Click Room Stays. This is where you register guests and check stay history.' },
            { selector: '[data-nav="charges"]', title: 'Room charges', text: 'Click Charges to review unpaid incidental and restaurant charges, or add a service charge.' },
            { selector: '[data-nav="checkout"]', title: 'Guest checkout', text: 'Click Checkout to review any remaining charges, record externally received payments, and complete a stay.' },
            { selector: '[data-action="nav-receipts"]', title: 'Receipt history', text: 'Click Receipt History. Front Desk can find and reprint both Front Desk and Restaurant payments here.' },
            { selector: '[data-nav="tickets"]', title: 'Support & Issues', text: 'Click Support & Issues to send management a question or report a problem.' },
            { selector: '.top-help-button[data-action="help-open"]', title: 'Help whenever you need it', text: 'Click Help to open instructions for your current screen. This completes your walkthrough!' }
        ],
        restaurant: [
            { selector: '[data-nav="tables"]', title: 'Manage tables', text: 'Click Tables to see which tables are available, dining, or waiting for payment.' },
            { selector: '[data-nav="orders"]', title: 'Review orders', text: 'Click Orders to see existing orders and find their current status.' },
            { selector: '[data-action="nav-receipts"]', title: 'Restaurant receipts', text: 'Click Receipt History to review and reprint confirmed restaurant payments.' },
            { selector: '[data-nav="roomcharges"]', title: 'Room postings', text: 'Click Room Charges to review restaurant charges posted to guest stays for Front Desk settlement.' },
            { selector: '[data-nav="tickets"]', title: 'Ask for support', text: 'Click Support & Issues to report equipment or service problems to management.' },
            { selector: '.top-help-button[data-action="help-open"]', title: 'Find more guidance', text: 'Click Help for context-specific instructions. This completes your walkthrough!' }
        ],
        admin: [
            { selector: '[data-nav="system"]', title: 'System Management', text: 'Click System Management. This is where you configure the resort without deleting past records.' },
            { selector: '[data-nav="payments"]', title: 'Payment methods', text: 'Click Payment Methods to manage shared cash and non-cash options for both departments.' },
            { selector: '[data-nav="system"]', title: 'Back to System Management', text: 'Click System Management again to return to the settings overview.' },
            { selector: '[data-nav="receipts"]', title: 'All saved receipts', text: 'Click Receipt History to review and reprint payments from both departments.' },
            { selector: '[data-nav="audit"]', title: 'Audit Log', text: 'Click Audit Log to trace important staff actions, corrections, and payments.' },
            { selector: '[data-nav="tickets"]', title: 'Support queue', text: 'Click Support & Issues to respond to and resolve requests from staff.' },
            { selector: '.top-help-button[data-action="help-open"]', title: 'Help is one click away', text: 'Click Help for guidance about the current page. This completes your walkthrough!' }
        ]
    };
    function helpPositionSpotlight() {
        if (helpMode !== 'guide') return;
        const root = document.getElementById('help-root');
        const step = helpTours[role]?.[helpGuideStep];
        const target = step && document.querySelector(step.selector);
        if (!root || !target || !root.querySelector('.help-tour-focus')) return;
        const r = target.getBoundingClientRect();
        const vw = window.innerWidth, vh = window.innerHeight;
        const pad = 6;
        const x = Math.max(0, r.left - pad), y = Math.max(0, r.top - pad);
        const right = Math.min(vw, r.right + pad), bottom = Math.min(vh, r.bottom + pad);
        if (right <= x || bottom <= y) return;
        const rects = [
            { top: 0, left: 0, width: vw, height: y },
            { top: bottom, left: 0, width: vw, height: vh - bottom },
            { top: y, left: 0, width: x, height: bottom - y },
            { top: y, left: right, width: vw - right, height: bottom - y }
        ];
        root.querySelectorAll('.help-tour-curtain').forEach((el, i) => {
            const b = rects[i];
            Object.assign(el.style, { top: b.top + 'px', left: b.left + 'px', width: b.width + 'px', height: b.height + 'px' });
        });
        Object.assign(root.querySelector('.help-tour-focus').style, { top: y + 'px', left: x + 'px', width: (right - x) + 'px', height: (bottom - y) + 'px' });
        const card = root.querySelector('.help-tour-card');
        if (!card) return;
        const width = Math.min(365, vw - 24);
        const height = card.offsetHeight || 210;
        const left = Math.max(12, Math.min(x, vw - width - 12));
        const top = bottom + height + 15 < vh ? bottom + 15 : y - height - 15 >= 12 ? y - height - 15 : Math.max(12, Math.min(vh - height - 12, bottom + 15));
        Object.assign(card.style, { width: width + 'px', top: top + 'px', left: left + 'px' });
    }
    function helpShowSpotlight() {
        if (helpMode !== 'guide') return;
        const step = helpTours[role]?.[helpGuideStep];
        if (!step) { helpFinishGuide(); return; }
        if (window.innerWidth <= 780 && step.selector.includes('data-nav') && !mobile) {
            mobile = true;
            render();
        }
        const target = document.querySelector(step.selector);
        if (!target) { helpFinishGuide(); return; }
        const bounds = target.getBoundingClientRect();
        if (bounds.top < 0 || bounds.bottom > window.innerHeight || bounds.left < 0 || bounds.right > window.innerWidth)
            target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        const root = document.getElementById('help-root');
        if (!root) return;
        const steps = helpTours[role];
        root.innerHTML = `<div class="help-tour" role="region" aria-label="Interactive ${esc(HELP_ROLES[role])} walkthrough"><div class="help-tour-curtain"></div><div class="help-tour-curtain"></div><div class="help-tour-curtain"></div><div class="help-tour-curtain"></div><div class="help-tour-focus" aria-hidden="true"></div><section class="help-tour-card" aria-live="polite"><div class="help-tour-heading"><span>GUIDED TOUR · ${esc(HELP_ROLES[role])}</span><button type="button" data-action="help-guide-skip" aria-label="Skip walkthrough">×</button></div><div class="help-tour-step">STEP ${helpGuideStep + 1} OF ${steps.length}</div><h2>${esc(step.title)}</h2><p>${esc(step.text)}</p><div class="help-tour-instruction"><span aria-hidden="true">↖</span> Click the highlighted button to continue</div><div class="help-tour-footer"><div class="help-guide-progress" aria-hidden="true">${steps.map((_, i) => `<span class="${i <= helpGuideStep ? 'on' : ''}"></span>`).join('')}</div><button type="button" data-action="help-guide-skip">Skip tutorial</button></div></section></div>`;
        helpPositionSpotlight();
        requestAnimationFrame(helpPositionSpotlight);
    }
    function helpCurrentContext() {
        const modal = document.querySelector('#modal-root .modal');
        if (modal) {
            const title = (modal.querySelector('.modal-head h2')?.textContent || '').toLowerCase();
            if (title.includes('ticket') || title.includes('support'))
                return { heading: 'Support & Issues', ids: role === 'frontdesk' ? ['fd-tickets'] : role === 'restaurant' ? ['rs-tickets'] : ['ad-tickets'] };
            const ids = role === 'frontdesk' ? (title.includes('checkout') ? ['fd-checkout', 'fd-payment', 'fd-checkout-block'] : title.includes('charge') ? ['fd-charges', 'fd-outstanding', 'fd-service'] : title.includes('stay') ? ['fd-register', 'fd-charges'] : ['fd-service', 'fd-payment']) : role === 'restaurant' ? (title.includes('bill') || title.includes('cash') || title.includes('payment') ? ['rs-ready', 'rs-cash', 'rs-post'] : title.includes('table') ? ['rs-table-status', 'rs-add'] : title.includes('room') ? ['rs-post', 'rs-invalid-room'] : ['rs-add', 'rs-void']) : ['ad-system', 'ad-audit'];
            return {
                heading: modal.querySelector('.modal-head h2')?.textContent || 'Current task',
                ids
            };
        }
        const labels = {
            dashboard: 'Dashboard',
            checkout: 'Checkout',
            rooms: 'Rooms',
            stays: 'Room Stays',
            balances: 'Unpaid Balances',
            addservice: 'Add Service Charge',
            charges: 'Charges',
            tables: 'Tables',
            orders: 'Orders',
            neworder: 'New Order',
            roomcharges: 'Room Charges',
            posts: 'Today’s Posts',
            cash: 'Table Payments',
            system: 'System Management',
            tickets: 'Support & Issues',
            services: 'Service Catalog',
            menu: 'Restaurant Menu',
            users: 'Employees & Roles',
            receiptbuilder: 'Receipt Builder',
            receiptsettings: 'Receipt Settings',
            receipts: 'Receipt History',
            discounts: 'Discount Management',
            payments: 'Payment Methods',
            categories: 'Menu Categories',
            audit: 'Audit Log',
            tickets: 'Support & Issues',
            help: 'Help Center'
        };
        return {
            heading: labels[route] || 'Current page',
            ids: HELP_ARTICLES.filter(a => a.role === role && a.routes.includes(route)).map(a => a.id)
        };
    }
    function helpAllowed(id) {
        const a = HELP_ARTICLES.find(x => x.id === id && hasAccess(x.role));
        return a || null;
    }
    function helpResults(q, cat) {
        const query = q.trim().toLowerCase();
        const tokens = query.split(/\s+/).filter(Boolean);
        return HELP_ARTICLES.filter(a => a.role === role && (cat === 'all' || a.category === cat)).map(a => {
            const hay = (a.title + ' ' + a.summary + ' ' + a.keywords + ' ' + a.steps.join(' ') + ' ' + a.note).toLowerCase();
            const expand = {
                bill: [
                    'bill',
                    'payment',
                    'checkout',
                    'balance',
                    'owed'
                ],
                pay: [
                    'pay',
                    'payment',
                    'paid',
                    'settle'
                ],
                order: [
                    'order',
                    'items',
                    'food',
                    'table'
                ],
                charge: [
                    'charge',
                    'due',
                    'unpaid',
                    'post'
                ],
                employee: ['employee', 'staff', 'user'],
                help: ['help', 'guide', 'tutorial']
            };
            const matches = t => hay.includes(t) || Object.entries(expand).some(([key, alts]) => (t === key || alts.includes(t)) && alts.some(w => hay.includes(w)));
            const pass = tokens.every(matches);
            const score = tokens.reduce((s, t) => s + (a.title.toLowerCase().includes(t) ? 5 : 0) + (a.keywords.includes(t) ? 3 : 0), 0);
            return { ...a, pass, score };
        }).filter(x => x.pass).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
    }
    function helpListEntry(a, compact = false) {
        return `<button type="button" class="help-result ${compact ? 'compact' : ''}" data-action="help-article" data-id="${esc(a.id)}"><span class="help-result-text"><span class="help-category-tag">${esc(HELP_CATEGORIES[a.category])}</span><strong>${esc(a.title)}</strong>${compact ? '' : `<small>${esc(a.summary)}</small>`}</span><span class="help-chevron" aria-hidden="true">›</span></button>`;
    }
    function helpArticleMarkup(id, compact = false) {
        const a = helpAllowed(id);
        if (!a)
            return '<div class="help-empty">This article is unavailable to this role.</div>';
        const guided=smartGuideForArticle(a);
        return `<article class="help-article"><button class="help-back-link" type="button" data-action="help-back">← Back to ${helpMode === 'panel' ? smartView==='library'?'Library':smartView==='ask'?'Ask':'Home' : 'Help Center'}</button><div class="help-category-tag">${esc(HELP_CATEGORIES[a.category])}</div><h2>${esc(a.title)}</h2><p class="help-article-summary">${esc(a.summary)}</p><h3>Follow these steps</h3><ol class="help-steps">${a.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>${a.note ? `<div class="help-note"><strong>Important</strong><p>${esc(a.note)}</p></div>` : ''}${a.related?.length ? `<div class="help-related"><h3>Related help</h3>${a.related.map(id => helpAllowed(id)).filter(Boolean).map(x => helpListEntry(x, true)).join('')}</div>` : ''}${a.role!==role&&hasAccess(a.role)?`<div class="help-article-actions"><button class="btn primary" type="button" data-action="help-smart-workspace" data-id="${esc(a.role)}">Switch to ${esc(HELP_ROLES[a.role])} Dashboard →</button></div>`:a.routes.length ? `<div class="help-article-actions"><button class="btn primary" type="button" data-action="help-go" data-id="${esc(a.routes[0])}">Go to ${esc(helpNavName(a.routes[0]))} →</button></div>` : ''}${guided?`<div class="smart-article-guide"><strong>Follow this in resortOS</strong>${smartGuidePanelButtons(guided.id)}</div>`:''}<div class="help-ticket-link"><span>Still need help from management?</span><button class="btn" type="button" data-action="ticket-create">Create Support Ticket →</button></div></article>`;
    }
    function helpNavName(id) {
        return {
            dashboard: 'Dashboard',
            rooms: 'Rooms',
            stays: 'Room Stays',
            balances: 'Unpaid Balances',
            charges: 'Charges',
            checkout: 'Checkout',
            addservice: 'Add Service Charge',
            tables: 'Tables',
            neworder: 'New Order',
            orders: 'Orders',
            cash: 'Table Payments',
            roomcharges: 'Room Charges',
            posts: 'Today’s Posts',
            audit: 'Audit Log',
            system: 'System Management',
            menu: 'Restaurant Menu',
            services: 'Service Catalog',
            users: 'Employees & Roles',
            payments: 'Payment Methods',
            discounts: 'Discount Management',
            receiptbuilder: 'Receipt Builder',
            receiptsettings: 'Receipt Settings',
            receipts: 'Receipt History',
            categories: 'Menu Categories',
            tickets: 'Support & Issues'
        }[id] || 'Page';
    }
    function helpPanelContent() {
        if (helpSelected)
            return helpArticleMarkup(helpSelected, true);
        if (helpPanelLibrary)
            return `<button class="help-back-link" data-action="help-context">← Back to help for this page</button><div class="help-context"><strong>All ${esc(HELP_ROLES[role])} help topics</strong><small>Search the entire Help Center without leaving this task.</small></div><label class="help-search-label" for="help-panel-search">Search all help</label><input class="input help-search" id="help-panel-search" data-help-search="panel" placeholder="Search help articles…" value="${esc(helpQuery)}" type="search"><div class="help-categories help-panel-categories" role="group" aria-label="Help categories"><button class="help-category-choice ${helpCategory === 'all' ? 'active' : ''}" data-action="help-category" data-id="all">All</button>${Object.entries(HELP_CATEGORIES).map(([id, label]) => `<button class="help-category-choice ${helpCategory === id ? 'active' : ''}" data-action="help-category" data-id="${id}">${esc(label)}</button>`).join('')}</div><div id="help-panel-results">${helpResultCards(helpResults(helpQuery, helpCategory), true)}</div>`;
        const context = helpCurrentContext(), items = context.ids.map(helpAllowed).filter(Boolean);
        return `<div class="help-context"><div class="help-context-label">HELP FOR THIS ${document.querySelector('#modal-root .modal') ? 'WINDOW' : 'PAGE'}</div><strong>${esc(context.heading)}</strong><small>${esc(HELP_ROLES[role])} · Relevant guidance</small></div><label class="help-search-label" for="help-panel-search">Search Help</label><input id="help-panel-search" class="input help-search" data-help-search="panel" type="search" placeholder="What do you need help with?" value="${esc(helpQuery)}" autocomplete="off"><div id="help-panel-results">${helpQuery ? helpResultCards(helpResults(helpQuery, 'all'), true) : `<h3 class="help-minor-heading">Common questions here</h3>${(items.length ? items : HELP_ARTICLES.filter(a => a.role === role && a.category === 'start').slice(0, 3)).slice(0, 6).map(a => helpListEntry(a, true)).join('')}`}</div><button type="button" class="help-full-link" data-action="help-full">Open Full Help Center <span>→</span></button>`;
    }
    function helpResultCards(items, compact) {
        return items.length ? items.map(a => helpListEntry(a, compact)).join('') : `<div class="help-empty"><strong>No articles found</strong><p>Try a shorter word like “payment”, “table”, or “checkout”.</p></div>`;
    }
    function helpCenter() {
        const items = helpResults(helpQuery, helpCategory);
        return `${header('Help Center', 'Find clear, step-by-step instructions for your daily resortOS tasks.', btn('Restart Interactive Tutorial', 'help-restart', { small: true }))}<div class="help-center"><div class="help-center-hero"><div><span class="help-kicker">${esc(HELP_ROLES[role].toUpperCase())} HELP</span><h2>What can we help you with?</h2><p>Search a question, learn a daily task, or understand a system status.</p></div><div class="help-hero-icon" aria-hidden="true">?</div></div><label for="help-center-search" class="help-search-label">Search instructions</label><input id="help-center-search" data-help-search="center" class="input help-search" type="search" placeholder="Try “partial payment”, “add items”, or “audit log”…" value="${esc(helpQuery)}" autocomplete="off"><div class="help-categories" role="group" aria-label="Help categories"><button class="help-category-choice ${helpCategory === 'all' ? 'active' : ''}" data-action="help-category" data-id="all">All topics</button>${Object.entries(HELP_CATEGORIES).map(([id, title]) => `<button class="help-category-choice ${helpCategory === id ? 'active' : ''}" data-action="help-category" data-id="${id}">${esc(title)}</button>`).join('')}</div><div class="help-center-body"><div class="help-center-list"><div class="help-list-heading"><h2>${helpQuery ? 'Search results' : helpCategory === 'all' ? 'All help topics' : HELP_CATEGORIES[helpCategory]}</h2><small>${items.length} ${items.length === 1 ? 'article' : 'articles'}</small></div><div id="help-center-results">${helpResultCards(items, false)}</div></div><div class="help-center-detail" id="help-center-detail">${helpSelected ? helpArticleMarkup(helpSelected) : `<div class="help-center-placeholder"><div class="help-placeholder-icon">◎</div><h3>Choose a help topic</h3><p>Instructions will open here without leaving the Help Center.</p><div class="help-quick-tip"><strong>Quick tip</strong><p>Use the (?) button in the top bar for help with your current page or dialog.</p></div></div>`}</div></div><div class="help-center-footer"><span>Need to return to your work?</span><button class="btn" type="button" data-action="help-return">← Back to ${esc(helpReturnRoute ? helpNavName(helpReturnRoute) : 'Dashboard')}</button></div></div>`;
    }
    function helpRenderRoot() {
        const target=document.getElementById('help-root');
        if(!target)return;
        if(helpMode==='panel')target.innerHTML=`<aside class="help-drawer smarthelp-drawer smart2-drawer ${smartHelpExpanded?'smart2-expanded':''}" role="complementary" aria-label="SmartHelp assistance"><div class="help-drawer-head"><div class="help-drawer-heading"><span class="help-icon">✦</span><div><strong>SmartHelp</strong><small>Your resortOS assistant</small></div></div><div class="smart2-header-actions">${smartSemanticDebugEnabled()?`<button type="button" data-action="help-semantic-debug" class="smart2-header-btn smart71-debug-btn" title="Open semantic model diagnostics" aria-label="Open semantic model diagnostics">◉</button>`:''}<button type="button" data-action="help-smart-expand" class="smart2-header-btn" aria-label="${smartHelpExpanded?'Collapse SmartHelp':'Expand SmartHelp'}" title="${smartHelpExpanded?'Compact view':'Expanded view'}" aria-pressed="${smartHelpExpanded}">${smartHelpExpanded?'↙':'⤢'}</button><button type="button" data-action="help-close" class="help-close-btn" aria-label="Close SmartHelp">×</button></div></div><div class="help-drawer-scroll smarthelp-scroll" id="smart2-scroll">${smartPanelContent()}</div><div class="smart2-drawer-bottom"><button type="button" class="smart2-help-support" data-action="help-smart-support"><span aria-hidden="true">◉</span><span>Still need help? <strong>Contact Support</strong></span><span aria-hidden="true">↗</span></button>${smart2NavMarkup()}</div></aside>`;
        else if(helpMode==='guide')helpShowSpotlight();
        else if(helpMode==='adaptive')smartGuideRender();
        else if(helpMode==='explore')smartExploreRender();
        else target.innerHTML='';
    }
    function helpOpen(id = '') {
        if(helpMode==='explore')smartExploreEnd(false);
        if(helpMode==='guide') helpFinishGuide();
        if(helpMode==='adaptive') smartGuidePause();
        helpFocusReturn=document.activeElement;
        if(!id && smartView!=='ask') {smartView='home';helpQuery='';helpCategory='all';}
        helpMode='panel';
        helpPanelLibrary=false;
        smartRecent=smartLoadActivity();
        if(id && helpAllowed(id)) {
            smartAnswerBeforeArticle=smartView;
            helpSelected=id;
            smartRememberArticle(id);
        }
        helpRenderRoot();
        document.querySelector('.smarthelp-drawer .help-close-btn')?.focus();
    }
    function helpClose() {
        helpMode='closed';
        helpSelected='';
        helpRenderRoot();
        if(helpFocusReturn?.isConnected) helpFocusReturn.focus();
        helpFocusReturn=null;
    }
    function helpShowCenter() {
        helpSelected = '';
        helpQuery = '';
        helpCategory = 'all';
        if (document.querySelector('#modal-root .modal')) {
            helpPanelLibrary = true;
            helpMode = 'panel';
            helpRenderRoot();
            return;
        }
        helpMode = 'closed';
        helpRenderRoot();
        if (route !== 'help') {
            helpCaptureDraft();
            helpReturnRoute = route;
        }
        go('help');
    }
    function helpArticleOpen(id) {
        if (!helpAllowed(id))
            return;
        helpSelected = id;
        if (helpMode === 'panel') {
            smartAnswerBeforeArticle = smartView;
            smartRememberArticle(id);
            helpRenderRoot();
        }
        else {
            const detail = document.getElementById('help-center-detail');
            if (detail)
                detail.innerHTML = helpArticleMarkup(id);
        }
    }
    function smartNavigationIsUnsafe(destination) {
        if(document.querySelector('#modal-root .modal')) {toast('Finish or close your current dialog before switching pages. Your form is unchanged.',true);return true;}
        if(route==='receiptbuilder' && rbDirty) {toast('You have unsaved Receipt Builder changes. Save your draft before navigating.',true);return true;}
        if(role==='restaurant' && route==='neworder' && destination!==route && (draftOrderId || Object.values(cart).some(x=>Number(x)>0))) {toast('Finish or save your restaurant order before leaving this page.',true);return true;}
        const editable=[...document.querySelectorAll('.content form input:not([type=hidden]):not([type=search]),.content form textarea,.content form select')];
        if(destination!==route && editable.some(x=>x.type==='checkbox'||x.type==='radio'?x.checked!==x.defaultChecked:x.tagName==='SELECT'?[...x.options].some(o=>o.selected!==o.defaultSelected):x.value!==x.defaultValue)) {toast('This page has unsaved form changes. Save or cancel your work before navigating.',true);return true;}
        return false;
    }
    function smartSwitchWorkspace(workspace) {
        if (!['frontdesk','restaurant','admin'].includes(workspace) || !hasAccess(workspace)) {
            toast('Your employee account is not authorized for that dashboard.',true);
            return;
        }
        if (workspace===role) return;
        if (smartNavigationIsUnsafe('workspace:'+workspace)) return;
        setRole(workspace,true);
    }
    function helpGoPage(id) {
        if (!routeAllowed(id)) return;
        if(smartNavigationIsUnsafe(id)) return;
        if (helpMode === 'panel')
            helpClose();
        const preserve = route === 'help' && id === 'neworder' && helpReturnRoute === 'neworder';
        if (route === 'help')
            helpReturnRoute = null;
        go(id, preserve);
    }
    function helpStartGuide() {
        if(document.querySelector('#modal-root .modal')) {toast('Finish your open dialog before starting the tutorial.',true);return;}
        if(route==='receiptbuilder' && rbDirty) {toast('Save your Receipt Builder changes before starting the tutorial.',true);return;}
        closeModal();
        helpGuideStep = 0;
        helpMode = 'closed';
        go('dashboard');
        helpMode = 'guide';
        helpRenderRoot();
    }
    function helpFinishGuide() {
        helpMode = 'closed';
        mobile = false;
        helpRenderRoot();
        if (window.innerWidth <= 780) render();
    }
    function helpCaptureDraft() {
        if (route === 'help')
            return;
        const fields = [
            ...document.querySelectorAll('.content input,.content select,.content textarea')
        ].map((el, i) => ({
            i,
            value: el.value,
            checked: el.checked,
            type: el.type
        }));
        helpDraft = { role, route, fields };
    }
    function helpRestoreDraft(next) {
        if (!helpDraft || helpDraft.role !== role || helpDraft.route !== next)
            return;
        const fields = [
            ...document.querySelectorAll('.content input,.content select,.content textarea')
        ];
        helpDraft.fields.filter(x => [
            'select-one',
            'select-multiple',
            'checkbox',
            'radio'
        ].includes(x.type)).forEach(x => {
            const el = fields[x.i];
            if (!el)
                return;
            el.value = x.value;
            if ('checked' in el)
                el.checked = x.checked;
        });
        if (next === 'addservice')
            syncServiceForm();
        helpDraft.fields.filter(x => ![
            'select-one',
            'select-multiple',
            'checkbox',
            'radio'
        ].includes(x.type)).forEach(x => {
            const el = fields[x.i];
            if (el)
                el.value = x.value;
        });
        helpDraft = null;
    }
    function helpReturn() {
        const dest = helpReturnRoute && helpNavName(helpReturnRoute) ? helpReturnRoute : 'dashboard';
        helpReturnRoute = null;
        helpQuery = '';
        helpCategory = 'all';
        helpSelected = '';
        go(dest, dest === 'neworder');
        helpRestoreDraft(dest);
    }
    function helpInsertHints(root) {
        if (!root)
            return;
        const actionHints = {
            "table-ready": "rs-ready",
            "table-resume": "rs-continue",
            "choose-post-room": "rs-post",
            "void-order": "rs-void"
        };
        for (const control of root.querySelectorAll('button[data-action]')) {
            const articleId = actionHints[control.dataset.action];
            if (!articleId || !helpAllowed(articleId) || control.nextElementSibling?.classList.contains('help-inline-info'))
                continue;
            const hint = document.createElement('button');
            hint.type = 'button';
            hint.className = 'help-inline-info';
            hint.dataset.action = 'help-tip';
            hint.dataset.id = articleId;
            hint.textContent = '?';
            hint.title = 'Explain this action';
            hint.setAttribute('aria-label', 'Explain ' + control.textContent.trim());
            control.after(hint);
        }
        const hints = [
            ['Amount received (₱)', 'fd-payment'],
            ['Outstanding incidental charges', 'fd-outstanding'],
            ['Payment method', 'fd-payment'],
            ['Rental duration (hours)', 'fd-duration'],
            ['Duration (hours)', 'fd-duration'],
            ['Additional units / duration field', 'ad-service']
        ];
        for (const el of root.querySelectorAll('.field label, .checkout-total strong, .section-label')) {
            if (el.querySelector('[data-help-tip]'))
                continue;
            const term = el.textContent.trim();
            const pair = hints.find(([label, id]) => term === label && helpAllowed(id));
            if (!pair)
                continue;
            const info = document.createElement('button');
            info.type = 'button';
            info.className = 'help-inline-info';
            info.textContent = '?';
            info.title = 'What does this mean?';
            info.setAttribute('aria-label', 'Help: ' + term);
            info.dataset.action = 'help-tip';
            info.dataset.id = pair[1];
            el.appendChild(info);
        }
    }
    function helpOnRoleChange() {
        if(smartGuide || smartGuidePaused){smartGuide=null;smartGuidePaused=null;smartGuidePersist();}
        smart744LastVerified=null;smart744Transcript=[];smart73AskStatus=null;
        smartView='home';smartQuestion='';smartAnswer=null;smartLastNlpTopic='';smartRecent=smartLoadActivity();
        helpSelected = '';
        helpQuery = '';
        helpCategory = 'all';
        helpStartGuide();
    }
    const tableName = id => data.tables.find(t => t.id === String(id))?.name || ('Table ' + String(id));
    const tableOpenOrders = id => data.orders.filter(o => String(o.table) === String(id) && ['pending', 'awaiting_payment'].includes(o.status));
    const tableState = id => {
        const open = tableOpenOrders(id);
        return open.some(o => o.status === 'awaiting_payment') ? 'waiting' : open.length ? 'occupied' : 'vacant';
    };
    let restaurantTableFilter = 'all';
    let restaurantMenuQuery = '';
    function restaurantTableCard(t, compact = false) {
        const status = tableState(t.id);
        const open = tableOpenOrders(t.id);
        const sum = open.reduce((n, o) => n + orderPayable(o), 0);
        const count = open.reduce((n,o) => n + o.items.reduce((x,item) => x + Number(item.qty||0),0), 0);
        const title = status === 'waiting' ? 'Payment needed' : status === 'occupied' ? 'Guests dining' : 'Ready for guests';
        return `<button type="button" class="rs-table ${status} ${compact ? 'rs-table-compact' : ''}" data-action="open-table" data-id="${esc(t.id)}" aria-label="${esc(t.name)}: ${title}. Open table"><div class="rs-table-top"><span class="rs-table-id">${esc(t.name)}</span><span class="rs-table-state"><i></i>${status === 'waiting' ? 'To settle' : status === 'occupied' ? 'Dining' : 'Available'}</span></div><div class="rs-table-illustration ${status}"><span class="rs-chair rs-chair-a"></span><span class="rs-chair rs-chair-b"></span><span class="rs-chair rs-chair-c"></span><span class="rs-chair rs-chair-d"></span><span class="rs-table-surface">${premiumIcon('tables', 27)}</span></div><div class="rs-table-bottom"><div><strong>${open.length ? money(sum) : 'Start an order'}</strong><small>${open.length ? count + ' menu item' + (count === 1 ? '' : 's') : 'Table is vacant'}</small></div><span class="rs-table-open">${premiumIcon('arrow',17)}</span></div></button>`;
    }
    function tableTiles(tables, compact = false) {
        return `<div class="rs-table-grid ${compact ? 'is-compact' : ''}">${tables.map(t => restaurantTableCard(t, compact)).join('') || '<div class="rs-no-tables">No active tables yet. Ask Admin to add a restaurant table.</div>'}</div>`;
    }

    function rsSummaryCards(items) {
        return `<div class="rs-summary-grid" aria-label="Restaurant overview">${items.map((x, i) => `<article class="rs-summary-card ${i === 0 ? 'is-featured' : ''} ${x.tone ? 'tone-' + x.tone : ''}"><div class="rs-summary-card-top"><span class="rs-summary-title">${x.label}</span><span class="rs-summary-icon">${premiumIcon(x.icon || 'layers', 19)}</span></div><strong class="rs-summary-value">${x.value}</strong><small class="rs-summary-detail">${x.detail}</small></article>`).join('')}</div>`;
    }
    function tablesPage() {
        const active = data.tables.filter(t => t.active);
        const vacant = active.filter(t => tableState(t.id) === 'vacant').length;
        const occupiedTables = active.filter(t => tableState(t.id) === 'occupied').length;
        const waiting = active.filter(t => tableState(t.id) === 'waiting').length;
        if (role === 'admin')
            return `${header('Restaurant Tables Manager', 'Add tables, rename them or disable unused ones.', btn('+ Add Table', 'add-table', { primary: true }))}<div class="grid cols4">${kpi('All tables', data.tables.length, 'Includes inactive tables')}${kpi('Active', active.length, 'Available for restaurant use', 'green')}${kpi('Occupied', occupiedTables, 'Orders in progress', 'amber')}${kpi('Waiting for payment', waiting, 'Guests requesting the bill', 'purple')}</div><div class="section-space">${card('Configured tables', 'Names are editable. Occupied tables cannot be disabled.', table(['Table','Status','Availability','Actions'], data.tables.map(t => `<tr><td>${esc(t.name)}</td><td>${t.active ? badge('active') : '<span class="badge neutral">Inactive</span>'}</td><td>${t.active ? (tableState(t.id) === 'waiting' ? 'Waiting for payment' : tableState(t.id)) : 'Inactive'}</td><td>${btn('Edit', 'edit-table', { id: t.id, small: true })} ${t.active ? btn('Deactivate', 'remove-item', { id: 'table:' + esc(t.id), small: true, danger: true }) : btn('Activate', 'activate-item', { id: 'table:' + esc(t.id), small: true })}</td></tr>`)))}</div>`;
        const counts = {all:active.length, vacant, occupied:occupiedTables, waiting};
        const showing = active.filter(t => restaurantTableFilter === 'all' || tableState(t.id) === restaurantTableFilter);
        const stats = [ ['all', 'All tables'], ['vacant', 'Available'], ['occupied', 'Dining'], ['waiting', 'To settle'] ];
        return `<div class="rs-page rs-tables-page"><div class="rs-page-header"><div><span class="rs-eyebrow">RESTAURANT / SERVICE FLOOR</span><h1>Table overview<span class="rs-heading-dot">.</span></h1><p>A clear view of every table and what needs attention next.</p></div><button class="rs-primary-button" data-action="nav-neworder">${premiumIcon('plus',19)} New order ${premiumIcon('arrow',16)}</button></div>
        ${rsSummaryCards([{ label:'Active tables', value:active.length, detail:'Configured for service', icon:'tables' }, { label:'Available', value:vacant, detail:'Ready for guests', icon:'checkcircle', tone:'green' }, { label:'Dining', value:occupiedTables, detail:'Orders in progress', icon:'users', tone:'amber' }, { label:'To settle', value:waiting, detail:'Choose payment or room posting', icon:'clock', tone:'violet' }])}
        <section class="rs-floor-panel"><div class="rs-floor-head"><div><span class="rs-section-eyebrow">LIVE TABLE STATUS</span><h2>Service floor <span>${showing.length} tables</span></h2><p>Choose a table to take an order, add items or settle its bill.</p></div><div class="rs-table-legend"><span><i class="vacant"></i>Available</span><span><i class="occupied"></i>Dining</span><span><i class="waiting"></i>To settle</span></div></div><div class="rs-filter-row">${stats.map(([key,label]) => `<button class="rs-filter ${restaurantTableFilter === key ? 'is-active' : ''}" data-action="rs-table-filter" data-id="${key}" aria-pressed="${restaurantTableFilter === key}">${label}<b>${counts[key]}</b></button>`).join('')}</div>${tableTiles(showing)}<div class="rs-floor-foot">${premiumIcon('layers',15)} This is a table status overview, not a physical seating plan. Table layout customization can be added later.</div></section>
        </div>`;
    }
        function openTable(id) {
        const t = data.tables.find(x => x.id === String(id));
        if (!t || !t.active)
            return;
        const open = tableOpenOrders(id), sum = open.reduce((n, o) => n + orderPayable(o), 0);
        if (!open.length) {
            showModal(esc(t.name), 'This table is vacant and ready for guests.', `<div class="empty small-empty"><strong>Available for a new order</strong>Add food or drinks now. Payment method will be chosen only when guests finish.</div>`, `${btn('Close', 'modal-close')}${btn('+ Start Order', 'new-for-table', { id: t.id, primary: true })}`);
            return;
        }
        showModal(esc(t.name) + ' · ' + (tableState(id) === 'waiting' ? 'Waiting for payment' : 'Occupied'), `${open.length} open restaurant order${open.length > 1 ? 's' : ''}`, `${open.map(o => `<div class="table-open-order"><div class="item-line"><div><strong>Order #${esc(o.id)}</strong><small>${o.items.reduce((n, i) => n + i.qty, 0)} items • ${prettyTime(o.created)}</small></div>${badge(o.status)}</div><div class="item-line"><strong>Order total</strong><strong>${money(orderPayable(o))}</strong></div></div>`).join('')}<div class="checkout-total"><strong>Outstanding restaurant bill</strong><b>${money(sum)}</b></div><div class="notice">Guests decide whether to pay at the restaurant or post to a room at the end of their meal.</div>`, `${tableState(id) === 'waiting' ? btn('Continue Dining', 'table-resume', { id: t.id }) : btn('Add Items', 'table-add-items', { id: t.id })}${tableState(id) === 'waiting' ? btn('Choose Payment', 'table-settle', { id: t.id, primary: true }) : btn('Mark Waiting for Payment', 'table-ready', { id: t.id, primary: true })}`);
    }
    function dashboardQuickTile(icon, title, description, action, featured = false) {
        return `<button type="button" class="ros-quick-tile${featured ? ' is-featured' : ''}" data-action="${esc(action)}" aria-label="${esc(title)}: ${esc(description)}"><span class="ros-quick-icon">${premiumIcon(icon,21)}</span><span class="ros-quick-copy"><strong>${esc(title)}</strong><small>${esc(description)}</small></span><span class="ros-quick-arrow">${premiumIcon('up',17)}</span></button>`;
    }
    function dashboardQuickActions(items) {
        return `<div class="ros-quick-head"><div><span class="ros-quick-eyebrow">ONE CLICK AWAY</span><h2>Quick actions</h2><p>Your everyday tools, right where you need them.</p></div><span class="ros-quick-decoration">${premiumIcon('sparkle',20)}</span></div><div class="ros-quick-grid">${items.map(item => dashboardQuickTile(item.icon, item.title, item.description, item.action, item.featured)).join('')}</div>`;
    }
    function dashboard() {
        if (role === 'restaurant') return restaurantDashboard();
        if (role === 'admin') return adminDashboard();
        const stays = data.stays.filter(s => s.active);
        const owed = stays.filter(s => dueForStay(s.id) > .001);
        const totalRooms = activeRooms().length;
        const occupancy = totalRooms ? Math.round(occupied() / totalRooms * 100) : 0;
        const balance = owed.reduce((n, s) => n + dueForStay(s.id), 0);
        const dueToday = stays.filter(s => s.checkout && s.checkout <= today());
        const checkoutNeedsReview = dueToday.filter(s => dueForStay(s.id) > .001);
        const attention = [...owed].sort((a,b) => (a.checkout <= today() ? 0 : 1) - (b.checkout <= today() ? 0 : 1) || dueForStay(b.id) - dueForStay(a.id));
        const recentPayments = [...(data.paymentRecords || [])].filter(p => p.area === 'frontdesk').sort((a,b) => new Date(b.at) - new Date(a.at)).slice(0,3);
        const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';
        const todayLabel = new Date().toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        const metric = (icon, label, value, desc, theme, foot, percent = null) => fdFamilyMetric(icon,label.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),value,desc,({ocean:'neutral',emerald:'green',amber:'amber',lavender:'violet'})[theme] || 'neutral', foot);
        const priorityRows = attention.slice(0,4).map(s => {
            const urgent = s.checkout && s.checkout <= today();
            return `<div class="fd-priority-item"><div class="fd-room-identity"><span class="fd-room-glyph">${premiumIcon('rooms',18)}</span><span><strong>${roomLabel(s.room)}</strong><small>${esc(s.name || 'Guest')}</small></span></div><span class="fd-priority-tag ${urgent ? 'urgent' : ''}">${urgent ? 'Checkout due' : 'Balance due'}</span><strong class="fd-priority-amount">${money(dueForStay(s.id))}</strong><button class="fd-row-action" data-action="view-charges" data-id="${esc(s.id)}" aria-label="Review charges for ${esc(roomLabel(s.room))}">${premiumIcon('arrow',17)}</button></div>`;
        }).join('');
        const payments = recentPayments.map(p => `<button class="fd-payment-entry" data-action="receipt-payment" data-id="${esc(p.id)}"><span class="fd-payment-entry-icon">${premiumIcon('receipt',18)}</span><span class="fd-payment-entry-main"><strong>${esc(p.room ? roomLabel(p.room) : 'Front Desk payment')}</strong><small>${esc(p.method || 'External payment')} · ${esc(prettyTime(p.at))}</small></span><span class="fd-payment-entry-value">${money(p.amount)}</span>${premiumIcon('right',15)}</button>`).join('');
        return `<div class="fd-premium-dashboard">
            ${fdPageHeader('YOUR DAILY WORKSPACE',greeting + ',','Front Desk.',"Here's what's happening at your resort today.",`<span class="fd-date-label">${premiumIcon('calendar',17)} ${esc(todayLabel)}</span><button class="fd-soft-action" data-action="nav-receipts">${premiumIcon('receipt',17)} Receipt history</button>`)}
            <section class="fd-hero" aria-label="Front Desk daily overview"><div class="fd-hero-glow"></div><div class="fd-hero-content"><div class="fd-hero-kicker"><span class="fd-pulse"></span> TODAY AT THE RESORT</div><h2>Every detail in place.<br><em>Every stay, effortless.</em></h2><p>Your operations, simplified. See what matters, handle what’s next, and keep the guest experience seamless.</p><div class="fd-hero-actions"><button class="fd-hero-primary" data-action="register-stay">${premiumIcon('plus',19)} Register a stay ${premiumIcon('arrow',17)}</button><button class="fd-hero-secondary" data-action="nav-rooms">View all rooms ${premiumIcon('up',16)}</button></div><div class="fd-hero-caption"><span>${premiumIcon('checkcircle',16)} Charge tracking only — accommodation fees excluded</span></div></div><div class="fd-hero-visual"><div class="fd-orbit fd-orbit-outer"></div><div class="fd-orbit fd-orbit-inner"></div><div class="fd-orbit-ring" style="--occupancy:${occupancy}%"><div class="fd-orbit-center"><span>ROOM OCCUPANCY</span><strong>${occupancy}<small>%</small></strong><span>${occupied()} of ${totalRooms} rooms</span></div></div><div class="fd-orbit-foot"><span class="fd-orbit-dot"></span>${vacantRooms()} available rooms</div></div></section>
            <div class="fd-section-line"><div><span class="fd-mini-label">THE BIG PICTURE</span><h2>Operations at a glance</h2></div><span class="fd-section-side">Updated with your current records</span></div>
            <div class="fd-family-stats fd-metrics-grid">${metric('stays','OCCUPIED ROOMS',occupied(),'Currently checked in','ocean','In house',occupancy)}${metric('rooms','VACANT ROOMS',vacantRooms(),'Ready for guest stays','emerald','Available',totalRooms ? 100-occupancy : 0)}${metric('alert','ROOMS WITH BALANCES',owed.length,'Outstanding guest charges','amber',owed.length ? 'Action needed' : 'All clear')}${metric('wallet','OUTSTANDING BALANCE',money(balance),'Restaurant + extra services','lavender',balance > 0 ? 'To collect' : 'No pending balance')}</div>
            <div class="fd-workspace-grid"><section class="fd-panel fd-priority-panel"><div class="fd-panel-head"><div><span class="fd-mini-label">YOUR NEXT MOVE</span><h2>Needs attention <span class="fd-count-label">${owed.length}</span></h2><p>Outstanding charges and stays awaiting action.</p></div><button class="fd-panel-link" data-action="nav-balances">View all ${premiumIcon('arrow',16)}</button></div>${attention.length ? `<div class="fd-priority-columns"><span>GUEST / ROOM</span><span>PRIORITY</span><span>AMOUNT</span><span></span></div><div class="fd-priority-list">${priorityRows}</div>` : `<div class="fd-premium-empty"><span class="fd-empty-symbol">${premiumIcon('checkcircle',27)}</span><strong>You're all caught up.</strong><span>No outstanding charges right now. Everything's running smoothly.</span><button data-action="nav-stays">Review active stays ${premiumIcon('arrow',15)}</button></div>`}<div class="fd-panel-footer">${premiumIcon('clock',16)} <span>${checkoutNeedsReview.length ? `${checkoutNeedsReview.length} checkout${checkoutNeedsReview.length===1?'':'s'} due with unsettled charges` : 'No checkouts waiting on unpaid charges'}</span></div></section>
            <section class="fd-panel fd-actions-panel ros-quick-panel">${dashboardQuickActions([{icon:'plus',title:'Register stay',description:'Welcome a guest',action:'register-stay',featured:true},{icon:'rooms',title:'Room overview',description:'Check occupancy',action:'nav-rooms'},{icon:'wallet',title:'Add a charge',description:'Post an extra service',action:'nav-addservice'},{icon:'checkout',title:'Guest checkout',description:'Settle & check out',action:'nav-checkout'}])}</section></div>
            <div class="fd-bottom-grid"><section class="fd-panel fd-activity-panel"><div class="fd-panel-head"><div><span class="fd-mini-label">YOUR PAYMENT TRAIL</span><h2>Recent payments</h2><p>Confirmed external payments recorded at Front Desk.</p></div><button class="fd-panel-link" data-action="nav-receipts">All receipts ${premiumIcon('arrow',16)}</button></div>${recentPayments.length ? `<div class="fd-payment-list">${payments}</div>` : `<div class="fd-inline-empty">${premiumIcon('receipt',19)} No Front Desk payments recorded yet. They’ll appear here once confirmed.</div>`}</section><section class="fd-support-strip"><span class="fd-support-icon">${premiumIcon('support',23)}</span><div><span class="fd-mini-label">WE'RE HERE TO HELP</span><h3>Need a hand?</h3><p>Report an issue, follow up on a request, or get assistance.</p><button data-action="nav-tickets">Open Support & Issues ${premiumIcon('arrow',16)}</button></div><span class="fd-support-decor">✳</span></section></div>
            <div class="fd-dashboard-footnote">${premiumIcon('checkcircle',14)} This dashboard tracks guest stays, restaurant postings, and additional service charges. Accommodation fees are not recorded.</div>
        </div>`;
    }
    function restaurantDashboard() {
        const active = data.tables.filter(t => t.active);
        const waiting = active.filter(t => tableState(t.id) === 'waiting');
        const busy = active.filter(t => tableState(t.id) === 'occupied');
        const free = active.filter(t => tableState(t.id) === 'vacant');
        const open = data.orders.filter(o => ['pending','awaiting_payment'].includes(o.status));
        const localToday = today();
        const settledToday = (data.paymentRecords || []).filter(p => p.area === 'restaurant' && String(p.at || '').slice(0,10) === localToday);
        const postedToday = data.orders.filter(o => o.destination === 'room' && String(o.created || '').slice(0,10) === localToday && o.status !== 'void');
        const recent = [...data.orders].sort((a,b) => new Date(b.created) - new Date(a.created)).slice(0,4);
        const prioritize = [...active].sort((a,b) => ({waiting:0,occupied:1,vacant:2}[tableState(a.id)] - {waiting:0,occupied:1,vacant:2}[tableState(b.id)])).slice(0,6);
        const glance = [
           {n:active.length,label:'Active tables',sub:'Configured for service',icon:'tables',kind:'ink'},
           {n:busy.length,label:'Currently dining',sub:'Open table orders',icon:'users',kind:'green'},
           {n:waiting.length,label:'Awaiting settlement',sub:'Choose payment or room',icon:'clock',kind:'amber'},
           {n:money(settledToday.reduce((sum,p) => sum + Number(p.amount || 0),0)),label:'Collected today',sub:settledToday.length + ' direct payment' + (settledToday.length === 1 ? '' : 's'),icon:'wallet',kind:'violet'}
        ];
        return `<div class="rs-page rs-dashboard"><div class="rs-page-header"><div><span class="rs-eyebrow">RESTAURANT / DAILY OPERATIONS</span><h1>Good service starts <em>here.</em></h1><p>Everything your team needs to keep service flowing smoothly.</p></div><div class="rs-header-actions"><button class="rs-soft-button" data-action="nav-orders">${premiumIcon('orders',17)} View orders</button><button class="rs-primary-button" data-action="nav-neworder">${premiumIcon('plus',18)} New order ${premiumIcon('arrow',15)}</button></div></div>
        <section class="rs-hero"><div class="rs-hero-copy"><span class="rs-hero-eyebrow"><i></i> RESTAURANT WORKSPACE</span><h2>From first order<br>to <em>last detail.</em></h2><p>Stay ahead of the rush. See live table status, guide every payment and give guests your best service.</p><div class="rs-hero-buttons"><button class="rs-hero-button" data-action="nav-tables">Explore tables ${premiumIcon('arrow',18)}</button><button class="rs-hero-link" data-action="nav-neworder">Start an order ${premiumIcon('right',15)}</button></div></div><div class="rs-hero-art"><div class="rs-hero-glow"></div><div class="rs-art-ring rs-art-ring-a"></div><div class="rs-art-ring rs-art-ring-b"></div><div class="rs-art-table"><span class="rs-art-chair a"></span><span class="rs-art-chair b"></span><span class="rs-art-chair c"></span><span class="rs-art-chair d"></span><div class="rs-art-tabletop">${premiumIcon('tables',42)}</div></div><div class="rs-art-pill"><span class="rs-art-live"></span>${active.length - free.length} tables in service</div></div></section>
        ${rsSummaryCards(glance.map(x => ({ label:x.label, value:x.n, detail:x.sub, icon:x.icon, tone:x.kind === 'ink' ? '' : x.kind })))}
        <div class="rs-dashboard-body"><section class="rs-dashboard-panel"><div class="rs-panel-title"><div><span class="rs-section-eyebrow">YOUR PRIORITIES</span><h2>Tables at a glance</h2><p>${waiting.length ? `${waiting.length} table${waiting.length === 1 ? '' : 's'} ready for settlement.` : 'See where your team is needed right now.'}</p></div><button class="rs-text-action" data-action="nav-tables">All tables ${premiumIcon('arrow',16)}</button></div>${prioritize.length ? tableTiles(prioritize,true) : '<div class="rs-placeholder">No restaurant tables yet. Ask Admin to set up the table list.</div>'}</section><aside class="rs-dashboard-side"><section class="rs-side-panel ros-quick-panel">${dashboardQuickActions([{icon:'plus',title:'Create an order',description:'Select dishes for a table',action:'nav-neworder',featured:true},{icon:'wallet',title:'Ready for payment',description:waiting.length+' awaiting settlement',action:'nav-cash'},{icon:'rooms',title:'Room postings',description:postedToday.length+' posted today',action:'nav-roomcharges'},{icon:'receipt',title:'Receipt history',description:'Review and reprint',action:'nav-receipts'}])}</section></aside></div>
        <section class="rs-recent-panel"><div class="rs-panel-title"><div><span class="rs-section-eyebrow">RECENT ACTIVITY</span><h2>Latest orders</h2><p>All orders remain available in their original records.</p></div><button class="rs-text-action" data-action="nav-orders">Order history ${premiumIcon('arrow',16)}</button></div><div class="rs-recent-list">${recent.map(o => `<button class="rs-recent-row" data-action="view-order" data-id="${esc(o.id)}"><span class="rs-order-icon">${premiumIcon('orders',20)}</span><span class="rs-order-main"><strong>#${esc(o.id)} · ${o.destination === 'room' ? esc(roomLabel(o.room)) : esc(tableName(o.table))}</strong><small>${esc(prettyTime(o.created))} · ${o.items.reduce((s,i) => s + i.qty,0)} items</small></span><span class="rs-recent-status">${badge(o.status)}</span><strong class="rs-recent-amount">${money(orderPayable(o))}</strong>${premiumIcon('right',15)}</button>`).join('') || '<div class="rs-placeholder">Orders will appear here as staff work.</div>'}</div></section>
        </div>`;
    }
        function adminDashboard() {
        const unresolved = data.tickets.filter(t => t.status !== 'resolved');
        const urgent = unresolved.filter(t => t.priority === 'urgent');
        const pendingReview = unresolved.filter(t => t.status === 'review');
        const unassigned = unresolved.filter(t => !t.assignedTo).length;
        const paymentsToday = data.paymentRecords.filter(p => (p.at || '').slice(0, 10) === today());
        const totalToday = paymentsToday.reduce((n, p) => n + Number(p.amount || 0), 0);
        const activity = [...data.audit].map(normalizeAuditEntry).sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);
        const auditToday = data.audit.filter(a => String(a.time || '').slice(0, 10) === today()).length;
        const activeStaff = data.employees.filter(e => e.active !== false).length;
        const stat = (icon, label, value, detail, kind) => `<article class="shared-stat-card ${kind || ''}"><div class="shared-stat-top"><span class="shared-stat-icon">${premiumIcon(icon,18)}</span><span class="shared-stat-label">${label}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
        return `<div class="ad-page ad-dashboard ad-dashboard-refined">
          <div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / LIVE OVERVIEW</span><h1>Your resort. <span>In complete control.</span></h1><p>Manage support issues, employee access and activity from one clear workspace.</p></div><div class="ad-header-actions"><button class="ad-header-soft" data-action="nav-audit">${premiumIcon('audit',17)} Audit log</button><button class="ad-header-primary" data-action="nav-system">${premiumIcon('system',17)} System Management ${premiumIcon('arrow',16)}</button></div></div>
          <section class="ad-hero ad-hero-clean ad-hero-refined" aria-label="Administration overview"><div class="ad-hero-glow"></div><div class="ad-hero-copy"><span class="ad-hero-kicker"><i></i> ADMINISTRATION WORKSPACE</span><h2>Run the resort.<br><em>Stay in control.</em></h2><p>The right priorities, clear decisions and your essential management tools — all within reach.</p><div class="ad-hero-actions"><button class="ad-hero-primary" data-action="nav-tickets">Review support ${premiumIcon('arrow',18)}</button><button class="ad-hero-secondary" data-action="nav-users">Manage employees ${premiumIcon('right',16)}</button></div><div class="ad-hero-foot">${premiumIcon('checkcircle',17)} Changes remain traceable in the audit history</div></div>
          <aside class="ad-support-brief" aria-label="Support tickets summary"><div class="ad-support-brief-top"><span class="ad-support-brief-icon">${premiumIcon('support',23)}</span><span class="ad-support-brief-overline">SUPPORT AT A GLANCE</span></div><div class="ad-support-primary"><strong>${unresolved.length}</strong><div><b>Unresolved ${unresolved.length === 1 ? 'ticket' : 'tickets'}</b><span>Staff requests needing Admin follow-up</span></div></div><div class="ad-support-brief-bottom"><span class="ad-support-count ${urgent.length ? 'critical' : ''}"><i></i> ${urgent.length} urgent</span><span class="ad-support-count"><i></i> ${unassigned} unassigned</span></div><button class="ad-support-brief-link" data-action="nav-tickets">Open ticket queue ${premiumIcon('arrow',16)}</button></aside></section>
          <div class="shared-stat-grid ad-stat-grid">${stat('users','Active employees',activeStaff,'Accounts available in the demo','green')}${stat('wallet','Payments today',money(totalToday),paymentsToday.length + ' recorded acknowledgment' + (paymentsToday.length === 1 ? '' : 's'),'blue')}${stat('audit','Audit events today',auditToday,'Actions recorded across the resort','purple')}${stat('checkcircle','Awaiting review',pendingReview.length,'Tickets for management review','amber')}</div>
          <div class="ad-dashboard-grid ad-main-grid"><section class="ad-panel ad-main-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">SUPPORT PRIORITIES</span><h2>What needs your attention</h2><p>Handle urgent, unassigned and outstanding employee requests first.</p></div><button class="ad-inline-link" data-action="nav-tickets">All issues ${premiumIcon('arrow',15)}</button></div><div class="ad-priority-list">${[...unresolved].sort((a,b) => Number(b.priority === 'urgent')-Number(a.priority === 'urgent') || Number(!b.assignedTo)-Number(!a.assignedTo)).slice(0,5).map(t=>`<button class="ad-priority-row" data-action="ticket-view" data-id="${esc(t.id)}"><span class="ad-priority-icon ${t.priority==='urgent'?'urgent':''}">${premiumIcon('support',20)}</span><span class="ad-priority-copy"><strong>${esc(t.subject)}</strong><small>${esc(ticketRoleLabel(t.role))} · ${esc(t.author || 'Employee')} · ${esc(prettyTime(t.createdAt))}</small></span>${badge(t.status)}${premiumIcon('right',15)}</button>`).join('')||`<div class="ad-empty-state"><span>${premiumIcon('checkcircle',28)}</span><strong>Support queue is clear</strong><p>New staff issues will appear here for Admin review.</p></div>`}</div></section>
          <aside class="ad-panel ad-shortcuts-panel ros-quick-panel">${dashboardQuickActions([{icon:'users',title:'Employees & access',description:'Staff roles and permissions',action:'nav-users',featured:true},{icon:'wallet',title:'Payment methods',description:'Cash and external options',action:'nav-payments'},{icon:'menu',title:'Restaurant menu',description:'Food descriptions and photos',action:'nav-menu'},{icon:'receipt',title:'Receipt history',description:'Search, review and reprint',action:'nav-receipts'}])}</aside></div>
          <section class="ad-panel ad-audit-panel ad-latest-activity"><div class="ad-panel-head"><div><span class="ad-section-kicker">ACCOUNTABILITY</span><h2>Latest activity</h2><p>Review important events across the resort.</p></div><button class="ad-inline-link" data-action="nav-audit">Full audit log ${premiumIcon('arrow',15)}</button></div><div class="ad-audit-feed">${activity.map(a=>`<button class="ad-audit-row" data-action="view-audit" data-id="${esc(a.id)}"><span class="ad-audit-type ${auditTypeClass(a.type)}">${auditIcon(a.type)}</span><span class="ad-audit-copy"><strong>${esc(a.action)}</strong><small>${esc(a.by)} · ${esc(a.module)} · ${esc(prettyTime(a.time))}</small></span>${premiumIcon('right',16)}</button>`).join('')||'<div class="ad-empty-state"><strong>No activity yet</strong><p>Staff activity will appear here.</p></div>'}</div></section>
        </div>`;
    }

    function promotionForm(id='') {
        if(!adminOnly())return;
        const x=data.promotions.find(p=>p.id===id);
        showModal(x?'Edit Promotion':'New Promotion','Owner-managed promotions are separate from statutory benefits.',`<form id="promotion-form"><input type="hidden" name="id" value="${esc(x?.id||'')}"><div class="field"><label>Promotion name</label><input class="input" name="name" required maxlength="90" value="${esc(x?.name||'')}"></div><div class="field"><label>Discount (%)</label><input class="input" type="number" name="rate" min="0.01" max="100" step="0.01" required value="${esc(x?.rate??10)}"></div><div class="field"><label>Eligible Restaurant items</label><select class="select" name="scope"><option value="all" ${!x?.scope||x.scope==='all'?'selected':''}>All restaurant items</option>${data.categories.map(c=>`<option value="category:${esc(c.name)}" ${x?.scope==='category:'+c.name?'selected':''}>Category: ${esc(c.name)}</option>`).join('')}${data.menu.map(m=>`<option value="item:${m.id}" ${x?.scope==='item:'+m.id?'selected':''}>Menu item: ${esc(m.name)}</option>`).join('')}</select></div><div class="form-grid"><div class="field"><label>Valid from (optional)</label><input class="input" type="date" name="start" value="${esc(x?.start||'')}"></div><div class="field"><label>Valid until (optional)</label><input class="input" type="date" name="end" value="${esc(x?.end||'')}"></div></div><div class="field"><label>Status</label><select class="select" name="active"><option value="true" ${x?.active!==false?'selected':''}>Active</option><option value="false" ${x?.active===false?'selected':''}>Inactive</option></select></div><div class="notice">Promotions do not combine with statutory benefits in this V1 workflow; they are calculated separately and remain traceable.</div><button class="btn primary full" type="submit">Save Promotion</button></form>`);
    }
    function discountsPage() {
        const events=data.discountEvents.slice().sort((a,b)=>new Date(b.at)-new Date(a.at));
        const totalGranted=discountMoney(events.reduce((n,e)=>n+(e.reversed?0:Number(e.discountAmount||0)),0));
        return `<div class="ad-page ad-config-page discount-management"><div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / DISCOUNT MANAGEMENT</span><h1>Fair discounts. <span>Clear records.</span></h1><p>Statutory Senior Citizen and PWD benefits, promotions, and verified late room-charge adjustments.</p></div>${btn('+ Add Promotion','promotion-new',{primary:true})}</div>
        <div class="ad-metric-grid">${[['Recorded discount events',events.length,'Verified and auditable'],['Discounts granted',money(totalGranted),'Excludes VAT relief'],['VAT relief',money(events.reduce((n,e)=>n+(e.reversed?0:Number(e.vatRelief||0)),0)),'From qualifying transactions'],['Active promotions',data.promotions.filter(p=>p.active!==false).length,'Owner-managed offers']].map(([title,value,detail])=>`<article class="ad-metric"><div class="ad-metric-head"><span>${title}</span></div><strong>${value}</strong><small>${detail}</small></article>`).join('')}</div>
        <section class="ad-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">STATUTORY BENEFITS</span><h2>Built-in discount rules</h2><p>Rates are not optional owner promotions. Eligibility and mixed sale treatment require verification.</p></div></div><div class="discount-rule-grid"><div><strong>Senior Citizen</strong><span>20% of eligible VAT-exclusive sale + applicable VAT relief</span><small>Verified identity · eligible consumption only</small></div><div><strong>Person with Disability (PWD)</strong><span>20% of eligible VAT-exclusive sale + applicable VAT relief</span><small>Verified identity · eligible consumption only</small></div></div><p class="hint">Tax profile: ${esc(data.receiptSettings.taxMode)}. Configure VAT/Non-VAT registration in Receipt Settings before applying statutory benefits. This prototype supports standard-rated qualifying restaurant items, not complex mixed or legally exempt supplies.</p></section>
        <section class="ad-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">PROMOTIONAL RULES</span><h2>Owner-managed offers</h2><p>Create percentage discounts, control dates, and keep historical transactions unchanged.</p></div></div>${table(['Promotion','Rate','Valid dates','Status','Action'],data.promotions.map(x=>`<tr><td>${esc(x.name)}</td><td>${x.rate}% · ${esc(x.scope==='all'||!x.scope?'All items':x.scope||'All items')}</td><td>${esc(x.start||'Any')} – ${esc(x.end||'Any')}</td><td>${stateBadge(x.active)}</td><td>${btn('Edit','promotion-edit',{id:x.id,small:true})}</td></tr>`))}</section>
        <section class="ad-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">ACCOUNTABILITY</span><h2>Discount History</h2><p>Saved applications and adjustments (newest first). Full ID numbers are not stored in this browser prototype.</p></div></div>${table(['Date','Order','Type','Beneficiary','Eligible','Discount','VAT relief','Employee','Late?'],events.map(e=>`<tr><td>${esc(prettyTime(e.at))}</td><td>${esc(e.orderId)}</td><td>${esc(e.type)}</td><td>${esc(e.beneficiary||'—')} ${e.idLast4?'••••'+esc(e.idLast4):''}</td><td>${money(e.eligibleGross)}</td><td>${money(e.discountAmount)}</td><td>${money(e.vatRelief)}</td><td>${esc(e.employeeName)}</td><td>${e.reversed?'Reversed':e.late?'Yes':'No'}</td></tr>`))}</section>
        <div class="ad-info-foot">Discount eligibility, detailed VAT treatment, and official invoice compliance require independent review for production use. This demo uses browser-local data and demo employee identities.</div></div>`;
    }

        const managementPages = [
        {
            id: 'rooms',
            icon: '▤',
            title: 'Rooms Manager',
            desc: 'Add room numbers and monitor room availability.'
        },
        {
            id: 'tables',
            icon: '▦',
            title: 'Tables Manager',
            desc: 'Create, rename and activate restaurant tables.'
        },
        {
            id: 'menu',
            icon: '☷',
            title: 'Restaurant Menu',
            desc: 'Maintain menu items, prices and availability.'
        },
        {
            id: 'services',
            icon: '◇',
            title: 'Service Catalog',
            desc: 'Set service pricing and additional input fields.'
        },
        {
            id: 'users',
            icon: '♙',
            title: 'Employees & Roles',
            desc: 'Manage employee accounts and dashboard access.'
        }
    ];
    managementPages.splice(3, 0, { id: 'categories', icon: '▣', title: 'Menu Categories', desc: 'Category photos and ordering groups.' });
    managementPages.push({ id: 'discounts', icon: '%', title: 'Discount Management', desc: 'Senior Citizen, PWD, promotions and discount history.' });
    managementPages.push({ id: 'payments', icon: '₱', title: 'Payment Methods', desc: 'External payment options for both departments.' });
    managementPages.push({ id: 'receiptsettings', icon: '▤', title: 'Receipt Settings', desc: 'Business profile and logo used across receipts.' });
    managementPages.push({ id: 'receiptbuilder', icon: '▥', title: 'Receipt Builder', desc: 'Design, preview and publish Philippine-style receipts.' });
    managementPages.push({ id: 'receipts', icon: '▧', title: 'Receipt History', desc: 'Saved payments and receipt reprints.' });
    function systemManagementPage() {
        const groups = [
            {kicker:'PROPERTY SETUP', title:'Spaces & services', desc:'Manage the spaces and additional charges that support every guest stay.', ids:['rooms','tables','services']},
            {kicker:'RESTAURANT CONTROL', title:'Dining & payments', desc:'Manage food presentation, categories, accepted methods and receipt details.', ids:['menu','categories','discounts','payments','receiptsettings','receiptbuilder']},
            {kicker:'PEOPLE & ACCOUNTABILITY', title:'Team & transaction history', desc:'Manage employee access and keep previous payment records easy to find.', ids:['users','receipts']}
        ];
        const iconMap = {rooms:'rooms',tables:'tables',services:'sparkle',menu:'menu',categories:'layers',discounts:'wallet',payments:'wallet',receiptsettings:'receipt',receiptbuilder:'receipt',users:'users',receipts:'receipt'};
        return `<div class="ad-page ad-system-page"><div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / SYSTEM MANAGEMENT</span><h1>Everything in its <span>right place.</span></h1><p>A clear home for every setting that keeps your resort running.</p></div><button class="ad-header-soft" data-action="nav-audit">${premiumIcon('audit',17)} View audit history</button></div>
        <section class="ad-system-hero"><div><span class="ad-section-kicker">ONE CONNECTED WORKSPACE</span><h2>Control every detail.<br><em>Keep every team in sync.</em></h2><p>Configurations update the Front Desk and Restaurant workflows while retaining your historical records.</p></div><div class="ad-system-summary"><div><strong>${managementPages.length}</strong><small>management areas</small></div><div><strong>${data.employees.filter(e=>e.active!==false).length}</strong><small>active staff</small></div><div><strong>${data.paymentRecords.length}</strong><small>saved payments</small></div></div></section>
        <div class="ad-management-groups">${groups.map(group=>`<section class="ad-panel ad-management-group"><div class="ad-panel-head"><div><span class="ad-section-kicker">${group.kicker}</span><h2>${group.title}</h2><p>${group.desc}</p></div></div><div class="ad-settings-grid">${group.ids.map(id=>{const p=managementPages.find(x=>x.id===id);return p?`<button class="ad-setting-card" data-nav="${p.id}"><span class="ad-setting-icon">${premiumIcon(iconMap[p.id]||'system',22)}</span><span class="ad-setting-copy"><strong>${esc(p.title)}</strong><small>${esc(p.desc)}</small></span><span class="ad-setting-arrow">${premiumIcon('arrow',18)}</span></button>`:''}).join('')}</div></section>`).join('')}</div>
        <div class="ad-info-foot">${premiumIcon('checkcircle',18)} Records are deactivated instead of deleted; audit history is preserved. The prototype saves data in this browser.</div></div>`;
    }
    const fdDateLabel = date => {
        if (!date) return 'Not scheduled';
        const d = new Date(String(date).slice(0,10) + 'T12:00:00');
        return Number.isNaN(d.getTime()) ? String(date) : d.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});
    };
    const fdPageHeader = (kicker,first,accent,detail,actions='') => `<div class="fd-work-header fd-family-header"><div><span class="fd-work-kicker"><span class="ros-eyebrow-mark" aria-hidden="true"></span> ${kicker}</span><h1>${first} <em>${accent}</em></h1><p>${detail}</p></div><div class="fd-work-actions">${actions}</div></div>`;
    const fdFamilyMetric = (icon,title,value,detail,tone='neutral',foot='') => `<article class="fd-family-metric tone-${tone}" aria-label="${esc(title)}: ${esc(String(value))}"><div class="fd-family-metric-top"><span class="fd-family-metric-title">${title}</span><span class="fd-family-metric-icon">${premiumIcon(icon,20)}</span></div><strong class="fd-family-metric-value">${value}</strong><div class="fd-family-metric-bottom"><small>${detail}</small>${foot ? `<span class="fd-family-metric-foot">${foot}</span>` : ''}</div></article>`;
    const fdStat = (icon,title,value,detail,tone='neutral') => fdFamilyMetric(icon,title,value,detail,tone);
    const fdEmpty = (icon,title,desc,action='',label='') => `<div class="fd-work-empty"><span>${premiumIcon(icon,28)}</span><strong>${title}</strong><p>${desc}</p>${action ? `<button type="button" data-action="${action}">${label} ${premiumIcon('arrow',15)}</button>` : ''}</div>`;
    function rooms() {
        if (role === 'admin') {
            const q = search.toLowerCase();
            const list = data.rooms.filter(r => String(r.id).includes(q));
            return `${header('Rooms Manager', 'View room availability and open active stays.', btn('+ Add Room', 'add-room', { primary: true }))}<div class="toolbar"><input class="input" data-search placeholder="Search by room number…" value="${esc(search)}"><span class="text-muted">${occupied()} occupied · ${vacantRooms()} vacant</span></div><div class="rooms-grid">${list.map(r => { const st = stayFor(r.id), due=st?dueForStay(st.id):0; return `<article class="room-card"><span>${r.active === false ? '<span class="badge neutral">Inactive</span>' : badge(st ? 'occupied':'vacant')}</span><h3>Room ${esc(r.id)}</h3><div class="text-muted">${st?esc(st.name||'Guest'):'Available for a new stay'}</div><div class="room-footer"><small>${st?(due?money(due)+' unpaid':'No unpaid charges'):r.active===false?'Inactive room':'No active stay'}</small>${r.active===false?btn('Activate','restore-room',{id:r.id,small:true}):btn('Deactivate','remove-item',{id:'room:'+r.id,small:true,danger:true})}</div></article>`; }).join('')}</div>`;
        }
        const active=activeRooms(), busy=active.filter(r=>!!stayFor(r.id)), free=active.filter(r=>!stayFor(r.id)), outstanding=busy.filter(r=>dueForStay(stayFor(r.id).id)>.001);
        const categories=[['all','All rooms',active.length],['vacant','Available',free.length],['occupied','Occupied',busy.length],['unpaid','With balance',outstanding.length]];
        const list=active.filter(r=>{const st=stayFor(r.id); const due=st?dueForStay(st.id):0;return (fdRoomFilter==='all'||fdRoomFilter==='vacant'&&!st||fdRoomFilter==='occupied'&&!!st||fdRoomFilter==='unpaid'&&due>.001) && ('room '+r.id+' '+(st?.name||'')).toLowerCase().includes(search.toLowerCase());});
        return `<div class="fd-work-page fd-rooms-page">${fdPageHeader('FRONT DESK / ROOM OVERVIEW','Know every room,','instantly.','See occupancy, identify guest needs and open a room in one click.',`<button class="fd-soft-action" data-action="nav-stays">${premiumIcon('users',17)} Active stays</button><button class="fd-primary-action" data-action="register-stay">${premiumIcon('plus',17)} Register stay ${premiumIcon('arrow',16)}</button>`)}
        <section class="fd-room-banner fd-family-operational-banner"><div><span class="fd-banner-eyebrow"><i></i> LIVE ROOM AVAILABILITY</span><h2>Every arrival, <em>well prepared.</em></h2><p>${free.length} rooms currently available. Use the directory below to open a room, welcome a guest, or review charges.</p><button data-action="nav-checkout">Review checkouts ${premiumIcon('arrow',16)}</button></div><div class="fd-banner-ring" style="--fd-progress:${active.length?Math.round(busy.length/active.length*100):0}%"><span>OCCUPANCY</span><strong>${active.length?Math.round(busy.length/active.length*100):0}<small>%</small></strong><small>${busy.length} occupied</small></div></section>
        <div class="fd-family-stats fd-work-stats">${fdStat('rooms','Active rooms',active.length,'Rooms in operation')}${fdStat('checkcircle','Available',free.length,'Ready to register','green')}${fdStat('users','Occupied',busy.length,'Current guest stays','blue')}${fdStat('wallet','With unpaid charges',outstanding.length,'Need settlement','amber')}</div>
        <section class="fd-work-panel"><div class="fd-work-panel-head"><div><span class="fd-work-section">ROOM DIRECTORY</span><h2>Your room overview</h2><p>Filter by availability or search for a specific room or guest.</p></div><span class="fd-count">${list.length} room${list.length===1?'':'s'}</span></div><div class="fd-room-toolbar"><div class="fd-filter-pills">${categories.map(([id,title,n])=>`<button type="button" class="${fdRoomFilter===id?'selected':''}" data-action="fd-room-filter" data-id="${id}" aria-pressed="${fdRoomFilter===id}">${title}<b>${n}</b></button>`).join('')}</div><label class="fd-search">${premiumIcon('search',18)}<input data-search placeholder="Search room or guest…" aria-label="Search rooms" value="${esc(search)}"></label></div>
        <div class="fd-room-cards">${list.map(r=>{const st=stayFor(r.id),due=st?dueForStay(st.id):0;const needs=due>.001; const overdue=st&&st.checkout&&st.checkout<=today();return `<article class="fd-room-item ${st?'occupied':'vacant'}"><div class="fd-room-card-top"><span class="fd-room-symbol">${premiumIcon('rooms',25)}</span><span class="fd-state ${st?'occupied':'vacant'}"><i></i>${st?'Occupied':'Available'}</span></div><span class="fd-room-number">Room ${esc(r.id)}</span><div class="fd-room-card-desc">${st?`<strong>${esc(st.name||'Guest')}</strong><span>${overdue?'Checkout due · ':''}Until ${fdDateLabel(st.checkout)}</span>`:`<strong>Ready for check-in</strong><span>No active guest stay</span>`}</div><div class="fd-room-card-footer"><span>${st?needs?`<b class="fd-due">${money(due)} due</b>`:'<b class="fd-clear">No unpaid charges</b>':'<b class="fd-clear">Ready for guests</b>'}</span><button type="button" data-action="${st?'view-stay':'register-room'}" data-id="${esc(st?st.id:r.id)}" aria-label="${st?'View stay in':'Register guest for'} Room ${esc(r.id)}">${st?'View stay':'Register'} ${premiumIcon('arrow',16)}</button></div></article>`}).join('') || fdEmpty('rooms','No matching rooms','Try another search or filter.','fd-room-reset','Show all rooms')}</div></section></div>`;
    }
    function stays() {
        const active=data.stays.filter(s=>s.active), history=data.stays.filter(s=>!s.active), todayDue=active.filter(s=>s.checkout&&s.checkout<=today()), unpaid=active.filter(s=>dueForStay(s.id)>.001);
        const tabs=[['active','Active stays',active.length],['due','Checkout due',todayDue.length],['history','Completed',history.length]];
        const chosen=(fdStayFilter==='history'?history:fdStayFilter==='due'?todayDue:active).filter(s=>(s.id+' '+s.name+' '+s.room).toLowerCase().includes(search.toLowerCase()));
        return `<div class="fd-work-page fd-stays-page">${fdPageHeader('FRONT DESK / GUEST STAYS','Every guest,','every detail.','A beautiful, organized view of who is staying and what comes next.',`<button class="fd-soft-action" data-action="nav-rooms">${premiumIcon('rooms',17)} Room overview</button><button class="fd-primary-action" data-action="register-stay">${premiumIcon('plus',17)} Register stay ${premiumIcon('arrow',16)}</button>`)}
        <div class="fd-family-stats fd-work-stats">${fdStat('users','Active stays',active.length,'Guests currently checked in')}${fdStat('calendar','Checkout due',todayDue.length,'Scheduled today or earlier','amber')}${fdStat('wallet','Unpaid stays',unpaid.length,'Outstanding room charges','violet')}${fdStat('checkcircle','Completed',history.length,'Historical guest stays','green')}</div>
        <section class="fd-work-panel"><div class="fd-work-panel-head"><div><span class="fd-work-section">GUEST DIRECTORY</span><h2>Stay records</h2><p>View current stays and previous departures without losing history.</p></div><span class="fd-count">${chosen.length} matching</span></div><div class="fd-room-toolbar"><div class="fd-filter-pills">${tabs.map(([key,label,n])=>`<button type="button" class="${fdStayFilter===key?'selected':''}" data-action="fd-stay-filter" data-id="${key}" aria-pressed="${fdStayFilter===key}">${label}<b>${n}</b></button>`).join('')}</div><label class="fd-search">${premiumIcon('search',18)}<input data-search placeholder="Search guest, room or stay ID…" aria-label="Search stays" value="${esc(search)}"></label></div>
        <div class="fd-stay-list">${chosen.map(s=>{const due=dueForStay(s.id),urgent=s.active&&s.checkout&&s.checkout<=today(),charges=data.charges.filter(c=>c.stayId===s.id&&c.status!=='void');return `<article class="fd-stay-row"><span class="fd-stay-avatar">${esc((s.name||'G').trim().split(/\s+/).slice(0,2).map(w=>w.charAt(0)).join('').toUpperCase())}</span><div class="fd-stay-main"><strong>${esc(s.name||'Guest')}</strong><small>${esc(s.id)} · ${roomLabel(s.room)}</small></div><div class="fd-stay-dates"><span>CHECK-IN</span><strong>${fdDateLabel(s.checkin)}</strong></div><div class="fd-stay-dates"><span>${s.active?'EXPECTED CHECKOUT':'SCHEDULED CHECKOUT'}</span><strong>${fdDateLabel(s.checkout)}</strong></div><div class="fd-stay-balance"><span>${s.active&&urgent?'<i class="fd-urgent-mark">Due now</i>':s.active?'<i class="fd-live-mark">Active</i>':'<i class="fd-muted-mark">Completed</i>'}</span><strong class="${due>.001?'fd-due':'fd-clear'}">${money(due)} ${due>.001?'due':'outstanding'}</strong><small>${charges.length} charge${charges.length===1?'':'s'}</small></div><button class="fd-stay-open" data-action="view-stay" data-id="${esc(s.id)}" aria-label="View ${esc(s.name||'guest')} stay">View details ${premiumIcon('arrow',16)}</button></article>`}).join('') || fdEmpty('users',fdStayFilter==='history'?'No completed stays yet':'No matching stays',fdStayFilter==='history'?'Completed stays will appear here after checkout.':'Try a different search or filter.','fd-stay-reset','Show active stays')}</div></section></div>`;
    }
    function chargesPage() {
        const unpaid=pendingCharges(), affected=new Set(unpaid.map(c=>c.stayId)).size, totalDue=unpaid.reduce((sum,c)=>sum+remain(c),0),roomPosts=unpaid.filter(c=>c.source==='restaurant').length;
        const tabs=`<div class="fd-branch-tabs" role="group" aria-label="Charge workspace"><button class="${chargesTab==='unpaid'?'selected':''}" data-action="charges-tab" data-id="unpaid" aria-pressed="${chargesTab==='unpaid'}">${premiumIcon('wallet',18)} Unpaid balances <b>${unpaid.length}</b></button><button class="${chargesTab==='services'?'selected':''}" data-action="charges-tab" data-id="services" aria-pressed="${chargesTab==='services'}">${premiumIcon('plus',17)} Add service charge</button></div>`;
        return `<div class="fd-work-page fd-charges-page">${fdPageHeader('FRONT DESK / ROOM CHARGES','Charges made','simple.','Track restaurant and additional-service charges with complete clarity.',`<button class="fd-soft-action" data-action="nav-receipts">${premiumIcon('receipt',17)} Receipt history</button><button class="fd-primary-action" data-action="${chargesTab==='unpaid'?'nav-addservice':'nav-balances'}">${premiumIcon(chargesTab==='unpaid'?'plus':'wallet',17)} ${chargesTab==='unpaid'?'Add a service charge':'View balances'} ${premiumIcon('arrow',16)}</button>`)}
        <div class="fd-family-stats fd-work-stats">${fdStat('wallet','Outstanding',money(totalDue),'Unsettled incidental charges','amber')}${fdStat('rooms','Affected stays',affected,'Guests with a balance')}${fdStat('receipt','Open charges',unpaid.length,'Unpaid or partially paid','violet')}${fdStat('orders','Restaurant posts',roomPosts,'Awaiting Front Desk settlement','green')}</div>${tabs}${chargesTab==='unpaid'?balances(true):servicePage(true)}</div>`;
    }
    function balances(embedded=false) {
        const charges=pendingCharges().filter(c=>{const stay=data.stays.find(s=>s.id===c.stayId);return (String(stay?.room||'')+' '+String(stay?.name||'')+' '+c.label).toLowerCase().includes(search.toLowerCase())});
        const rows=charges.map(c=>{const st=data.stays.find(s=>s.id===c.stayId);const paid=Number(c.paid||0);return `<tr><td><strong>${st?roomLabel(st.room):'—'}</strong><small>${esc(st?.name||'Guest')}</small></td><td><strong>${esc(c.label)}</strong><small>${esc(prettyTime(c.date))}</small></td><td><span class="fd-type-chip ${c.source==='restaurant'?'food':'service'}">${premiumIcon(c.source==='restaurant'?'orders':'sparkle',14)}${c.source==='restaurant'?'Restaurant':'Service'}</span></td><td>${money(c.amount)}</td><td>${money(paid)}</td><td><strong class="fd-due">${money(remain(c))}</strong></td><td>${btn('Record payment','pay-charge',{id:c.id,small:true})}</td></tr>`;});
        return `${embedded?'':fdPageHeader('FRONT DESK / CHARGES','Outstanding','balances.','Only additional-service and posted restaurant charges are tracked here.')}<section class="fd-work-panel"><div class="fd-work-panel-head"><div><span class="fd-work-section">SETTLEMENT QUEUE</span><h2>Outstanding charges</h2><p>Choose an item to record an externally received payment. Partial payments are supported.</p></div><span class="fd-count">${charges.length} open</span></div><div class="fd-charge-tools"><label class="fd-search">${premiumIcon('search',17)}<input data-search value="${esc(search)}" placeholder="Search room, guest or charge…" aria-label="Search charges"></label><span>${premiumIcon('checkcircle',16)} No accommodation fees included</span></div>${charges.length?table(['ROOM / GUEST','CHARGE','SOURCE','TOTAL','ALREADY PAID','DUE','ACTION'],rows):fdEmpty('checkcircle','All charges are settled','No outstanding room charges at the moment.','nav-stays','View active stays')}</section>`;
    }
    function servicePage(embedded=false) {
        const st=data.stays.filter(s=>s.active), sv=data.services.filter(x=>x.active);
        return `${embedded?'':fdPageHeader('FRONT DESK / ADDITIONAL SERVICES','Post an extra','service.','Only add services requested by a guest and linked to an active stay.')}<div class="fd-service-layout"><section class="fd-work-panel"><div class="fd-work-panel-head"><div><span class="fd-work-section">ADD ROOM CHARGE</span><h2>Service details</h2><p>Select an occupied room, service, quantity and optional duration.</p></div></div><form id="service-form"><div class="form-grid"><div class="field"><label for="svc-room">Active guest room</label><select class="select" id="svc-room" name="room" required>${st.map(s=>`<option value="${s.room}">${roomLabel(s.room)} · ${esc(s.name||'Guest')}</option>`).join('')}</select></div><div class="field"><label for="svc-id">Additional service</label><select class="select" id="svc-id" name="service" required>${sv.map(s=>`<option value="${s.id}">${esc(s.name)} · ${money(s.rate)} / ${esc(s.unit)}</option>`).join('')}</select></div><div class="field"><label for="svc-qty" id="svc-qty-label">Quantity</label><input class="input" id="svc-qty" name="qty" type="number" min="0.01" step="0.01" value="1" required></div><div class="field" id="svc-units-wrap" hidden><label id="svc-units-label" for="svc-duration">Additional units</label><input class="input" id="svc-duration" name="units" type="number" min="0.01" step="0.01" value="1"></div></div><div class="service-estimate"><div><span>Calculated service charge</span><strong id="svc-price-note">Select a service</strong></div><b id="svc-preview-total">—</b></div><div class="fd-form-foot"><button class="fd-primary-action" type="submit" ${!st.length||!sv.length?'disabled':''}>${premiumIcon('plus',17)} Post service charge ${premiumIcon('arrow',16)}</button></div></form></section><aside class="fd-service-info"><span>${premiumIcon('info',23)}</span><span class="fd-work-section">HOW THIS WORKS</span><h3>Only the extras, nothing else.</h3><p>Charges are added to the selected guest stay. They can be reviewed and settled by Front Desk later.</p><ul><li>Room rental and accommodation fees are excluded.</li><li>Directly paid services are not recorded here.</li><li>Services with duration use the Admin-configured extra-unit field.</li></ul><button data-action="nav-balances">Review unpaid balances ${premiumIcon('arrow',16)}</button></aside></div>`;
    }
    function syncServiceForm() {
        const select = document.getElementById('svc-id');
        if (!select)
            return;
        const sv = data.services.find(s => s.id === Number(select.value));
        if (!sv)
            return;
        const unitsWrap = document.getElementById('svc-units-wrap'), units = document.getElementById('svc-duration'), label = document.getElementById('svc-units-label');
        unitsWrap.hidden = !sv.requiresUnits;
        units.disabled = !sv.requiresUnits;
        units.required = !!sv.requiresUnits;
        label.textContent = sv.unitsLabel || 'Duration / extra units';
        document.getElementById('svc-qty-label').textContent = sv.requiresUnits ? 'Quantity of rentals / items' : 'Quantity (' + sv.unit + ')';
        document.getElementById('svc-price-note').textContent = money(sv.rate) + ' per ' + sv.unit + (sv.requiresUnits ? ' × extra units' : '');
        const q = Number(document.getElementById('svc-qty').value) || 0, u = sv.requiresUnits ? (Number(units.value) || 0) : 1;
        document.getElementById('svc-preview-total').textContent = money(sv.rate * q * u);
    }
    function checkout() {
        const active=data.stays.filter(s=>s.active),ready=active.filter(s=>dueForStay(s.id)<.001),pending=active.filter(s=>dueForStay(s.id)>=.001),dueToday=active.filter(s=>s.checkout&&s.checkout<=today()),recent=[...data.paymentRecords].filter(p=>p.area==='frontdesk').sort((a,b)=>new Date(b.at)-new Date(a.at)).slice(0,3);
        const ordered=[...active].sort((a,b)=>(a.checkout||'9999').localeCompare(b.checkout||'9999'));
        return `<div class="fd-work-page fd-checkout-page">${fdPageHeader('FRONT DESK / CHECKOUT','A smoother','departure.','Review balances, record external payments and finish checkout without losing your place.',`<button class="fd-soft-action" data-action="nav-receipts">${premiumIcon('receipt',17)} Receipt history</button><button class="fd-primary-action" data-action="nav-stays">${premiumIcon('users',17)} All guest stays ${premiumIcon('arrow',16)}</button>`)}
        <section class="fd-checkout-banner fd-family-operational-banner"><div><span class="fd-banner-eyebrow"><i></i> CHECKOUT WORKSPACE</span><h2>Every departure, <em>handled with care.</em></h2><p>Review each stay, confirm any outstanding payment and finish checkout without losing your place.</p></div><span class="fd-checkout-graphic">${premiumIcon('checkout',82)}</span></section>
        <div class="fd-family-stats fd-work-stats">${fdStat('users','Active stays',active.length,'Ready for checkout review')}${fdStat('checkcircle','Ready to complete',ready.length,'No remaining charges','green')}${fdStat('wallet','Payment required',pending.length,'Settle before checkout','amber')}${fdStat('calendar','Due today / overdue',dueToday.length,'Scheduled checkout','violet')}</div>
        <div class="fd-checkout-layout"><section class="fd-work-panel"><div class="fd-work-panel-head"><div><span class="fd-work-section">DEPARTURE QUEUE</span><h2>Guest checkout review</h2><p>Select a stay to review every charge and complete the checkout.</p></div><span class="fd-count">${active.length} active</span></div><div class="fd-departures">${ordered.map(s=>{const due=dueForStay(s.id),ready=due<.001;const urgent=s.checkout&&s.checkout<=today();return `<article class="fd-departure-row"><span class="fd-departure-room">${premiumIcon('rooms',20)}</span><div class="fd-departure-person"><strong>${esc(s.name||'Guest')}</strong><small>${roomLabel(s.room)} · Expected ${fdDateLabel(s.checkout)}</small></div><div class="fd-departure-status"><span class="fd-state ${ready?'vacant':'occupied'}"><i></i>${ready?'Ready to check out':'Payment required'}</span>${urgent?'<small class="fd-due">Checkout due</small>':''}</div><div class="fd-departure-money"><strong class="${ready?'fd-clear':'fd-due'}">${money(due)}</strong><small>remaining</small></div><button class="fd-departure-action" data-action="checkout-stay" data-id="${esc(s.id)}">${ready?'Complete checkout':'Review & settle'} ${premiumIcon('arrow',16)}</button></article>`}).join('')||fdEmpty('checkcircle','No active stays to check out','New guest stays will appear here once registered.','register-stay','Register a stay')}</div></section><aside class="fd-work-panel fd-checkout-aside"><div class="fd-work-panel-head"><div><span class="fd-work-section">RECENT PAYMENTS</span><h2>Payment activity</h2><p>Reopen any saved acknowledgment.</p></div></div><div class="fd-checkout-payments">${recent.map(p=>`<button data-action="receipt-payment" data-id="${esc(p.id)}"><span>${premiumIcon('receipt',18)}</span><span><strong>${esc(p.room?roomLabel(p.room):'Front Desk payment')}</strong><small>${esc(p.method||'External')} · ${prettyTime(p.at)}</small></span><b>${money(p.amount)}</b></button>`).join('')||'<p class="fd-aside-empty">No Front Desk payments recorded yet.</p>'}</div><button class="fd-aside-link" data-action="nav-receipts">Open receipt history ${premiumIcon('arrow',17)}</button><div class="fd-checkout-aside-note">${premiumIcon('checkcircle',18)} Checkout only includes incidental and restaurant charges. Accommodation fees are excluded.</div></aside></div></div>`;
    }
    function orderRow(o) {
        return `<tr><td>#${esc(o.id)}</td><td>${o.destination === 'room' ? roomLabel(o.room) + (o.table ? ' · ' + esc(tableName(o.table)) : '') : esc(tableName(o.table))}</td><td>${money(orderPayable(o))}</td><td>${badge(o.status)}</td><td>${btn('View Order', 'view-order', { id: o.id, small: true })}</td></tr>`;
    }
    function orders() {
        let arr = data.orders.filter(o => filter === 'all' || o.status === filter).filter(o => (o.id+' '+o.room+' '+o.table).toLowerCase().includes(search.toLowerCase()));
        const paid = data.orders.filter(x => x.status === 'paid').length;
        const room = data.orders.filter(x => x.status === 'posted').length;
        const open = data.orders.filter(x => ['pending','awaiting_payment'].includes(x.status)).length;
        return `<div class="rs-page rs-ledger-page"><div class="rs-page-header"><div><span class="rs-eyebrow">RESTAURANT / TRANSACTIONS</span><h1>Order history<span class="rs-heading-dot">.</span></h1><p>Find every order, see its status and follow up in one place.</p></div><div class="rs-header-actions"><button class="rs-soft-button" data-action="nav-receipts">${premiumIcon('receipt',17)} Receipt history</button><button class="rs-primary-button" data-action="nav-neworder">${premiumIcon('plus',18)} New order ${premiumIcon('arrow',15)}</button></div></div>
            ${rsSummaryCards([{ label:'All orders', value:data.orders.length, detail:'Recorded orders', icon:'orders' }, { label:'Still open', value:open, detail:'Dining or to settle', icon:'clock', tone:'amber' }, { label:'Posted to rooms', value:room, detail:'Handled by Front Desk', icon:'rooms', tone:'green' }, { label:'Paid directly', value:paid, detail:'At the restaurant', icon:'wallet', tone:'violet' }])}
            <section class="rs-ledger-panel"><div class="rs-panel-title"><div><span class="rs-section-eyebrow">ORDER DIRECTORY</span><h2>All restaurant orders</h2><p>Search by order number, room or table, and filter by current status.</p></div></div><div class="rs-ledger-toolbar"><input class="input" data-search aria-label="Search restaurant orders" placeholder="Search orders, tables or rooms…" value="${esc(search)}"><select class="select" data-filter aria-label="Filter order status">${['all','pending','awaiting_payment','posted','paid','void'].map(v => `<option value="${v}" ${filter===v ? 'selected' : ''}>${v==='all' ? 'All statuses' : v==='awaiting_payment' ? 'Waiting for payment' : v[0].toUpperCase()+v.slice(1)}</option>`).join('')}</select></div>${table(['Order','Table / Room','Total','Status','Created','Action'],arr.map(o => `<tr><td><strong>#${esc(o.id)}</strong></td><td>${o.destination === 'room' ? roomLabel(o.room) : esc(tableName(o.table))}</td><td>${money(orderPayable(o))}</td><td>${badge(o.status)}</td><td>${prettyTime(o.created)}</td><td>${btn('View Order','view-order',{id:o.id,small:true})}</td></tr>`))}</section></div>`;
    }
        function restaurantFoodTile(item, waiting) {
        const count = cart[item.id] || 0;
        const category = String(item.category || 'Other');
        const glyph = /drink|beverage|juice|coffee/i.test(category) ? '🥤' : /dessert/i.test(category) ? '🍨' : /rice/i.test(category) ? '🍚' : /noodle|pasta/i.test(category) ? '🍜' : /side/i.test(category) ? '🥗' : '🍽';
        return `<article class="rs-food-card ${count ? 'selected' : ''}"><div class="rs-food-photo ${item.imageId ? 'with-photo' : ''}">${item.imageId && assetCache.has(item.imageId) ? assetImg(item.imageId, 'rs-food-image') : `<span class="rs-food-fallback">${glyph}</span>`}${count ? `<span class="rs-food-picked">${count} added</span>` : ''}</div><div class="rs-food-info"><span class="rs-food-category">${esc(category)}</span><h3>${esc(item.name)}</h3><p>${esc(item.description || 'Freshly prepared for your guests.')}</p><div class="rs-food-footer"><strong>${money(item.price)}</strong><div class="rs-food-controls">${count ? `<button data-action="cart-minus" data-id="${item.id}" ${waiting ? 'disabled' : ''} aria-label="Remove one ${esc(item.name)}">−</button><span>${count}</span>` : ''}<button class="rs-food-plus" data-action="cart-plus" data-id="${item.id}" ${waiting ? 'disabled' : ''} aria-label="Add one ${esc(item.name)}">${premiumIcon('plus',18)}</button></div></div></div></article>`;
    }
    function newOrder() {
        const ts = data.tables.filter(t => t.active);
        if (!ts.some(t => t.id === String(currentTable))) currentTable = ts[0]?.id || '';
        const selected = Object.entries(cart).filter(([,qty]) => qty > 0).map(([id,qty]) => ({...data.menu.find(m => m.id === Number(id)),qty})).filter(x => x.id);
        const items = data.menu.filter(item => item.active && categoryActive(item.category));
        const cats = data.categories.filter(c => c.active && items.some(item => item.category === c.name)).sort((a,b) => a.sort - b.sort);
        if (menuCategory !== null && !cats.some(c => c.name === menuCategory)) menuCategory = null;
        const q = restaurantMenuQuery.trim().toLowerCase();
        const filtered = items.filter(item => (menuCategory === null || item.category === menuCategory) && (!q || (item.name+' '+item.description+' '+item.category).toLowerCase().includes(q)));
        const open = tableOpenOrders(currentTable);
        const existing = open[0];
        const waiting = existing?.status === 'awaiting_payment';
        const prev = existing ? total(existing) : 0;
        const addedTotal = selected.reduce((sum,item) => sum + item.price * item.qty, 0);
        const qtyTotal = selected.reduce((sum,item) => sum + item.qty, 0);
        const blocked = !selected.length || !ts.length || waiting || open.length > 1;
        return `<div class="rs-page rs-order-page rs-family-pos"><div class="rs-page-header"><div><span class="rs-eyebrow">RESTAURANT / POINT OF SERVICE</span><h1>${existing ? 'Add to the table' : 'Create an order'}<span class="rs-heading-dot">.</span></h1><p>${existing ? 'Build on the existing bill, without replacing earlier items.' : 'Pick a table, choose dishes and save. Payment comes after dining.'}</p></div><button class="rs-soft-button" data-action="nav-tables">${premiumIcon('tables',17)} Table overview</button></div>
        <a class="rs-mobile-cart-jump" href="#rs-cart-panel">${premiumIcon('orders',18)} Review order · ${qtyTotal} item${qtyTotal === 1 ? '' : 's'} <strong>${money(prev + addedTotal)}</strong> ${premiumIcon('arrow',16)}</a><div class="rs-pos-layout"><section class="rs-menu-workspace"><div class="rs-pos-toolbar"><div class="rs-pos-toolbar-copy"><span class="rs-section-eyebrow">OUR MENU</span><h2>Made to order <span>${items.length} available</span></h2><p>Explore the menu and build the perfect table order.</p></div><div class="rs-menu-search"><span>${premiumIcon('orders',18)}</span><input type="search" id="restaurant-menu-search" placeholder="Find a dish or drink…" value="${esc(restaurantMenuQuery)}" aria-label="Search restaurant menu"></div></div>
        <div class="rs-category-scroller"><button class="rs-category-pill ${menuCategory === null ? 'active' : ''}" data-action="menu-category-back" aria-pressed="${menuCategory === null}"><span class="rs-cat-glyph">✦</span><strong>All dishes</strong><small>${items.length}</small></button>${cats.map(cat => `<button class="rs-category-pill ${menuCategory === cat.name ? 'active' : ''}" data-action="menu-category" data-id="${esc(cat.name)}" aria-pressed="${menuCategory === cat.name}"><span class="rs-cat-glyph">${cat.imageId && assetCache.has(cat.imageId) ? assetImg(cat.imageId, 'rs-cat-image') : '◈'}</span><strong>${esc(cat.name)}</strong><small>${items.filter(i=>i.category===cat.name).length}</small></button>`).join('')}</div>
        <div class="rs-menu-count"><strong>${q ? `Search results` : menuCategory || 'Explore all dishes'}</strong><span>${filtered.length} item${filtered.length === 1 ? '' : 's'}</span></div><div class="rs-food-grid">${filtered.map(item=>restaurantFoodTile(item,waiting)).join('') || `<div class="rs-menu-empty"><div>${premiumIcon('orders',29)}</div><strong>No dishes found</strong><p>Try another category or search. Admin controls menu availability.</p></div>`}</div></section>
        <aside class="rs-cart-panel" id="rs-cart-panel"><div class="rs-cart-top"><div><span class="rs-section-eyebrow">YOUR CURRENT TABLE</span><h2>Order summary</h2></div><span class="rs-cart-symbol">${premiumIcon('orders',23)}</span></div><label for="table-choice" class="rs-cart-label">Choose table</label><select id="table-choice" class="rs-cart-select" aria-label="Choose restaurant table">${ts.map(t => `<option value="${esc(t.id)}" ${t.id === String(currentTable) ? 'selected' : ''}>${esc(t.name)}${tableState(t.id) === 'waiting' ? ' · To settle' : tableState(t.id) === 'occupied' ? ' · Dining' : ''}</option>`).join('')}</select>
        ${open.length > 1 ? '<div class="rs-cart-notice">This table has multiple older open orders. Please ask a supervisor to review them.</div>' : ''}${waiting ? '<div class="rs-cart-notice">This table is waiting for payment. Reopen dining from Tables to add more items.</div>' : ''}
        ${existing ? `<div class="rs-cart-previous"><span>Existing order · #${esc(existing.id)}</span><strong>${money(prev)}</strong></div>` : ''}<div class="rs-cart-items-head"><strong>${existing ? 'Items to add' : 'Selected dishes'}</strong><span>${qtyTotal} item${qtyTotal === 1 ? '' : 's'}</span></div><div class="rs-cart-items">${selected.length ? selected.map(item => `<div class="rs-cart-line"><div><strong>${esc(item.name)}</strong><small>${item.qty} × ${money(item.price)}</small></div><span>${money(item.price * item.qty)}</span><button data-action="cart-minus" data-id="${item.id}" ${waiting ? 'disabled' : ''} aria-label="Remove one ${esc(item.name)}">×</button></div>`).join('') : `<div class="rs-cart-empty"><span>${premiumIcon('orders',30)}</span><strong>Your selection is empty</strong><small>Choose dishes on the left to get started.</small></div>`}</div>
        <div class="rs-cart-summary"><div><span>${existing ? 'Previous bill' : 'Subtotal'}</span><strong>${existing ? money(prev) : money(addedTotal)}</strong></div>${existing ? `<div><span>New items</span><strong>${money(addedTotal)}</strong></div>` : ''}<div class="rs-cart-grand"><span>${existing ? 'Updated bill total' : 'Order total'}</span><strong>${money(prev+addedTotal)}</strong></div></div><button class="rs-cart-save" id="save-order" ${blocked ? 'disabled' : ''}>${premiumIcon('checkcircle',18)} ${existing ? 'Add to existing order' : 'Save table order'} ${premiumIcon('arrow',15)}</button><p class="rs-cart-help">Payment is selected only when guests finish dining. Switching tables clears unsaved selections.</p></aside></div></div>`;
    }
        function roomChargesPage() {
        const n = data.orders.filter(o => o.destination === 'room').length;
        const due = data.orders.filter(o => o.destination === 'room' && o.status === 'posted').reduce((sum,o) => sum + orderPayable(o),0);
        const tabs = `<div class="workspace-tabs" role="group" aria-label="Restaurant room charge workspace"><button type="button" class="workspace-tab ${roomChargesTab === 'charges' ? 'active' : ''}" data-action="roomcharges-tab" data-id="charges" aria-pressed="${roomChargesTab === 'charges'}">Room Charges</button><button type="button" class="workspace-tab ${roomChargesTab === 'posts' ? 'active' : ''}" data-action="roomcharges-tab" data-id="posts" aria-pressed="${roomChargesTab === 'posts'}">Posting history</button></div>`;
        return `<div class="rs-page rs-ledger-page"><div class="rs-page-header"><div><span class="rs-eyebrow">RESTAURANT / GUEST ROOM CHARGES</span><h1>Room postings<span class="rs-heading-dot">.</span></h1><p>Track restaurant bills transferred to guest stays for Front Desk settlement.</p></div><button class="rs-primary-button" data-action="nav-tables">${premiumIcon('tables',18)} Open tables ${premiumIcon('arrow',15)}</button></div>${rsSummaryCards([{label:'Room-linked orders',value:n,detail:'Including historical postings',icon:'rooms'},{label:'Posted order value',value:money(due),detail:'Not the remaining guest balance',icon:'wallet',tone:'green'}])}<section class="rs-ledger-panel"><div class="rs-panel-title"><div><span class="rs-section-eyebrow">ROOM POSTING WORKSPACE</span><h2>Restaurant to Front Desk</h2><p>Front Desk confirms settlement; Restaurant can review or void permitted charges.</p></div></div>${tabs}${roomChargesTab === 'posts' ? posts(true) : roomCharges(true)}</section></div>`;
    }
    function roomCharges(embedded = false) {
        const posted = data.orders.filter(o => o.destination === 'room');
        return `${embedded ? '' : header('Restaurant Room Charges','View restaurant charges assigned to guest rooms.')}<div class="rs-embedded-ledger">${table(['Order','Room','Amount','Status','Posted by','Action'],posted.map(o => `<tr><td><strong>#${esc(o.id)}</strong></td><td>${roomLabel(o.room)}</td><td>${money(orderPayable(o))}</td><td>${badge(o.status)}</td><td>${esc(o.staff)}</td><td>${btn('View','view-order',{id:o.id,small:true})}</td></tr>`))}</div>`;
    }
    function posts(embedded = false) {
        const posted = data.orders.filter(o => o.destination === 'room').sort((a,b) => b.created.localeCompare(a.created));
        return `${embedded ? '' : header('Posting History','Review restaurant room posting activity.')}<div class="rs-post-list">${posted.map(o => `<button class="rs-post-row" data-action="view-order" data-id="${esc(o.id)}"><span class="rs-order-icon">${premiumIcon('rooms',19)}</span><span class="rs-order-main"><strong>#${esc(o.id)} · ${roomLabel(o.room)}</strong><small>${esc(o.staff)} · ${prettyTime(o.created)}</small></span>${badge(o.status)}<strong>${money(orderPayable(o))}</strong>${premiumIcon('right',15)}</button>`).join('') || '<div class="rs-placeholder">No room postings have been recorded.</div>'}</div>`;
    }
        function cash() {
        const arr = data.orders.filter(o => o.destination === 'table' && o.status === 'awaiting_payment');
        return `${header('Table Payments', 'Guests choose to pay directly or post their restaurant bill to an active room after dining.', btn('View Tables', 'nav-tables', { primary: true }))}${card('Tables ready for payment', 'Only orders marked ready for the bill appear here.', table([
            'Order',
            'Table',
            'Total',
            'Status',
            'Action'
        ], arr.map(o => `<tr><td>#${esc(o.id)}</td><td>${esc(tableName(o.table))}</td><td>${money(orderPayable(o))}</td><td>${badge(o.status)}</td><td>${btn('Review Bill', 'table-bill', { id: o.id, small: true })}</td></tr>`)))}`;
    }

    const ticketCategories = {
        system: 'System Problem',
        question: 'Question or Assistance',
        operational: 'Operational Issue'
    };
    const ticketStatuses = {
        open: 'Open',
        progress: 'In Progress',
        waiting: 'Waiting for Employee',
        review: 'Pending Admin Review',
        resolved: 'Resolved'
    };
    const ticketRoleLabel = r => ({ frontdesk: 'Front Desk', restaurant: 'Restaurant', admin: 'Admin' }[r] || r);
    const ticketVisibilities = {
        private: 'Only me & Admin',
        department: 'My Department',
        all: 'All Staff'
    };
    const ticketDefaultVisibility = category => category === 'operational' ? 'department' : 'private';
    const ticketVisibility = t => ticketVisibilities[t.visibility] ? t.visibility : 'private';
    const ticketOwner = (t, activeRole = role) => t.authorId ? (t.authorId === employee()?.id || t.assignedTo === employee()?.id) && employee()?.access.includes(activeRole) : t.role === activeRole && t.byRole === activeRole;
    const ticketSharedWith = (t, activeRole = role) => {
        if (activeRole === 'admin') return true;
        const visibility = ticketVisibility(t);
        return visibility === 'all' || (visibility === 'department' && t.role === activeRole);
    };
    const ticketCanView = t => adminOnly() || ticketOwner(t) || ticketSharedWith(t);
    const ticketAudience = t => ticketVisibility(t) === 'all'
        ? ['frontdesk', 'restaurant']
        : ticketVisibility(t) === 'department' ? [t.role] : [];
    const ticketVisibilityLabel = t => ticketVisibilities[ticketVisibility(t)];
    const ticketVisibilityBadge = t => `<span class="ticket-visibility ${ticketVisibility(t)}">${ticketVisibility(t) === 'private' ? '🔒' : ticketVisibility(t) === 'department' ? '◉' : '◎'} ${esc(ticketVisibilityLabel(t))}</span>`;
    const ticketSharedOnly = t => role !== 'admin' && !ticketOwner(t);
    const ticketClass = status => ({ open: 'amber', progress: 'violet', waiting: 'neutral', review: 'amber', resolved: 'green' }[status] || 'neutral');
    const ticketBadge = status => `<span class="badge ${ticketClass(status)}">${esc(ticketStatuses[status] || status)}</span>`;
    const ticketPriority = priority => `<span class="ticket-priority ${priority === 'urgent' ? 'urgent' : ''}">${priority === 'urgent' ? '● Urgent' : 'Normal'}</span>`;
    function ticketNeedsAttention(t, targetRole = role) {
        if (!t) return false;
        return t.unreadFor?.[targetRole] === true && (targetRole === 'admin' || ticketOwner(t, targetRole));
    }
    function ticketMarkUnread(t, targetRole) {
        if (!t.unreadFor || typeof t.unreadFor !== 'object') t.unreadFor = {};
        t.unreadFor[targetRole] = true;
    }
    function ticketMarkRead(t, targetRole = role) {
        if (!ticketNeedsAttention(t, targetRole)) return false;
        t.unreadFor[targetRole] = false;
        save();
        return true;
    }
    const ticketAttention = (targetRole = role) => (data.tickets || []).filter(t => ticketNeedsAttention(t, targetRole));
    function ticketAttentionMarkup() {
        const attention = ticketAttention();
        if (!attention.length) return '';
        const urgent = attention.some(t => t.priority === 'urgent');
        const count = attention.length > 99 ? '99+' : String(attention.length);
        return `<span class="ticket-nav-badge ${urgent ? 'urgent' : 'normal'}" aria-hidden="true">${count}</span>`;
    }
    function ticketSidebarLabel() {
        const attention = ticketAttention();
        return attention.length
            ? `Support & Issues, ${attention.length} ticket${attention.length === 1 ? '' : 's'} with new activity${attention.some(t => t.priority === 'urgent') ? ', including urgent' : ''}`
            : 'Support & Issues';
    }
    function syncTicketSidebar() {
        const nav = document.querySelector('[data-nav="tickets"]');
        if (!nav) return;
        const existing = nav.querySelector('.ticket-nav-badge');
        if (existing) existing.remove();
        nav.insertAdjacentHTML('beforeend', ticketAttentionMarkup());
        nav.setAttribute('aria-label', ticketSidebarLabel());
    }
    function ticketFocusFromSidebar() {
        ticketFilters = {
            query: '',
            status: 'all',
            category: 'all',
            priority: 'all',
            department: 'all',
            attention: ticketAttention().length ? 'needs' : 'all',
            view: role === 'admin' ? 'all' : 'mine'
        };
    }
    const ticketIdentity = () => employeeLabel();
    const ticketOrder = () => [...(data.tickets || [])].filter(ticketCanView).sort((a, b) => {
        if (a.status !== 'resolved' && b.status === 'resolved') return -1;
        if (a.status === 'resolved' && b.status !== 'resolved') return 1;
        if (a.priority !== b.priority) return a.priority === 'urgent' ? -1 : 1;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    function ticketDuration(t) {
        const from = new Date(t.createdAt).getTime();
        const to = new Date(t.status === 'resolved' && t.resolvedAt ? t.resolvedAt : Date.now()).getTime();
        if (!Number.isFinite(from) || !Number.isFinite(to)) return '—';
        const mins = Math.max(0, Math.floor((to - from) / 60000));
        const days = Math.floor(mins / 1440), hours = Math.floor(mins % 1440 / 60), rest = mins % 60;
        return `${days ? days + 'd ' : ''}${hours}h ${rest}m`;
    }
    function ticketsPage() {
        const all = ticketOrder();
        const view = ticketFilters.view || (role === 'admin' ? 'all' : 'mine');
        const q = ticketFilters.query.trim().toLowerCase();
        const visible = all.filter(t => view === 'shared'
            ? ticketVisibility(t) !== 'private' && (role === 'admin' || ticketSharedWith(t))
            : view === 'resolved' && role === 'admin'
                ? t.status === 'resolved'
                : view === 'mine' ? ticketOwner(t) : true);
        const filtered = visible.filter(t => {
            const matchText = [t.id, t.subject, t.description, t.location, ticketRoleLabel(t.role), ticketCategories[t.category]].join(' ').toLowerCase().includes(q);
            return matchText && (ticketFilters.attention !== 'needs' || ticketNeedsAttention(t))
                && (ticketFilters.status === 'all' || t.status === ticketFilters.status)
                && (ticketFilters.category === 'all' || t.category === ticketFilters.category)
                && (ticketFilters.priority === 'all' || t.priority === ticketFilters.priority)
                && (ticketFilters.department === 'all' || t.role === ticketFilters.department);
        });
        const attentionCount = ticketAttention().length;
        const tabs = role === 'admin'
            ? [['all', 'All Tickets'], ['resolved', 'Resolved'], ['shared', 'Shared Issues']]
            : [['mine', 'My Tickets'], ['shared', 'Shared Issues']];
        const focusControls = `<div class="ticket-view-tabs" role="group" aria-label="Ticket visibility view">
            ${tabs.map(([id, label]) => `<button type="button" class="ticket-view-tab ${view === id ? 'selected' : ''}" data-action="ticket-select-view" data-id="${id}">${label}${id === 'shared' ? ` <span class="ticket-tab-count">${all.filter(t => ticketVisibility(t) !== 'private' && (role === 'admin' || ticketSharedWith(t))).length}</span>` : id === 'resolved' ? ` <span class="ticket-tab-count">${all.filter(t => t.status === 'resolved').length}</span>` : ''}</button>`).join('')}
        </div><div class="ticket-focus-controls" role="group" aria-label="Ticket list filter">
            <button type="button" class="ticket-focus-option ${ticketFilters.attention === 'all' ? 'selected' : ''}" data-action="ticket-view-all">All</button>
            <button type="button" class="ticket-focus-option ${ticketFilters.attention === 'needs' ? 'selected' : ''}" data-action="ticket-view-attention">New Activity <span class="ticket-focus-count">${attentionCount}</span></button>
            <span class="ticket-focus-caption">The sidebar shows only new tickets (Admin), status changes and replies.</span>
        </div>`;
        const select = (label, key, values) => `<div class="ticket-filter"><label for="ticket-filter-${key}">${label}</label><select id="ticket-filter-${key}" class="select" data-ticket-filter="${key}"><option value="all">All ${label.toLowerCase()}</option>${Object.entries(values).map(([value, name]) => `<option value="${esc(value)}" ${ticketFilters[key] === value ? 'selected' : ''}>${esc(name)}</option>`).join('')}</select></div>`;
        const stat = (icon, label, value, detail, kind = '') => `<article class="shared-stat-card ${kind}"><div class="shared-stat-top"><span class="shared-stat-icon">${premiumIcon(icon,18)}</span><span class="shared-stat-label">${label}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
        const stats = role === 'admin'
            ? `<div class="shared-stat-grid ticket-stat-grid">${stat('support','Unresolved',all.filter(t => t.status !== 'resolved').length,'Tickets needing follow-up','amber')}${stat('warning','Urgent',all.filter(t => t.priority === 'urgent' && t.status !== 'resolved').length,'Unresolved urgent tickets','purple')}${stat('users','Assigned',all.filter(t => t.status !== 'resolved' && t.assignedTo).length,'Tickets already assigned','green')}${stat('checkcircle','Resolved',all.filter(t => t.status === 'resolved').length,'Retained in ticket history')}</div>`
            : `<div class="shared-stat-grid ticket-stat-grid">${stat('support','My open tickets',all.filter(t => ticketOwner(t) && t.status !== 'resolved').length,'Requests still being worked on','amber')}${stat('clock','Awaiting admin reply',all.filter(t => ticketOwner(t) && ['open','review'].includes(t.status)).length,'Still in progress','purple')}${stat('layers','Shared issues',all.filter(t => ticketVisibility(t) !== 'private' && (role === 'admin' || ticketSharedWith(t))).length,'Visible team-wide updates','green')}</div>`;
        const rows = filtered.map(t => `<tr><td><strong>${esc(t.id)}</strong><small>${esc(prettyTime(t.createdAt))}</small></td><td><strong>${esc(t.subject)}</strong>${ticketNeedsAttention(t) ? '<span class="ticket-unread-indicator">New</span>' : ''}<small>${esc(ticketCategories[t.category] || 'Other')}${t.location ? ' · ' + esc(t.location) : ''}</small><small>${ticketVisibilityBadge(t)}</small></td>${role === 'admin' ? `<td>${esc(ticketRoleLabel(t.role))}<small>${esc(t.author)}</small></td>` : ''}<td>${ticketPriority(t.priority)}</td><td>${ticketBadge(t.status)}</td><td><strong>${esc(prettyTime(t.updatedAt))}</strong><small>${esc(ticketDuration(t))} · ${esc(data.employees.find(e => e.id === t.assignedTo)?.name || 'Unassigned')}</small></td><td>${btn(ticketSharedOnly(t) ? 'View Issue →' : 'View Ticket →', 'ticket-view', { id: t.id, small: true })}</td></tr>`);
        const mobileCards = filtered.map(t => `<article class="ticket-mobile-card"><div class="ticket-mobile-top"><strong>${esc(t.id)}</strong>${ticketBadge(t.status)}</div><h3>${esc(t.subject)} ${ticketNeedsAttention(t) ? '<span class="ticket-unread-indicator">New</span>' : ''}</h3><p>${esc(ticketCategories[t.category])} · ${ticketVisibilityBadge(t)}</p><div class="ticket-mobile-bottom"><span>${ticketPriority(t.priority)} · ${esc(prettyTime(t.updatedAt))}</span>${btn(ticketSharedOnly(t) ? 'View Issue →' : 'View Ticket →', 'ticket-view', { id: t.id, small: true })}</div></article>`).join('');
        const description = role === 'admin' ? 'Review, assign, respond to and resolve resort issues from one clean workspace.' : 'Manage your requests and see official issues shared with your team.';
        const sectionTitle = ticketFilters.attention === 'needs' ? 'Tickets with new activity' : view === 'shared' ? 'Shared Issues' : view === 'resolved' ? 'Resolved Ticket History' : role === 'admin' ? 'All support tickets' : 'My Tickets';
        const empty = ticketFilters.attention === 'needs' ? 'No new ticket activity right now.' : view === 'shared' ? 'No shared issues match these filters.' : view === 'resolved' ? 'No resolved tickets match these filters.' : 'No matching tickets. Try clearing the filters or create a request.';
        return `${header('Support & Issues', description, role !== 'admin' ? btn('+ Create Ticket', 'ticket-create', { primary: true }) : '')}${stats}
            <section class="card section-space ticket-workspace ticket-premium"><div class="card-head"><div><h2>${sectionTitle}</h2><p class="sub">${view === 'shared' ? 'Visible issue summaries and official management updates. Private conversations stay private.' : 'Search and review tickets. Replies, assignments and history are preserved.'}</p></div><span class="audit-match-count">${filtered.length} of ${visible.length} tickets</span></div>${focusControls}
            <div class="ticket-filter-grid"><div class="ticket-search"><label for="ticket-query">Search tickets</label><input id="ticket-query" class="input" data-ticket-search placeholder="Reference, topic, location…" value="${esc(ticketFilters.query)}"></div>${select('Status', 'status', ticketStatuses)}${select('Type', 'category', ticketCategories)}${select('Priority', 'priority', { normal: 'Normal', urgent: 'Urgent' })}${role === 'admin' ? select('Department', 'department', { frontdesk: 'Front Desk', restaurant: 'Restaurant' }) : ''}</div>
            <div class="ticket-filter-footer"><span>${role === 'admin' ? 'Resolved tickets remain available in All Tickets and Resolved. All ticket activity is audited.' : 'For immediate hazards, contact management directly.'}</span>${btn('Clear Filters', 'ticket-clear-filters', { small: true })}</div>
            ${table(role === 'admin' ? ['Ticket', 'Subject', 'Department', 'Priority', 'Status', 'Updated', 'Action'] : ['Ticket', 'Subject', 'Priority', 'Status', 'Updated', 'Action'], rows)}
            <div class="ticket-mobile-list">${mobileCards}</div>${filtered.length ? '' : `<div class="ticket-empty-note">${empty}</div>`}</section>
            <p class="ticket-demo-note">V1 uses browser storage and shared role identities. Privacy and cross-device sharing require authenticated backend enforcement before real deployment.</p>`;
    }
    function openNewTicket() {
        const relatedArticle = helpAllowed(helpSelected);
        if (document.querySelector('#modal-root .modal')) {
            toast('Please finish or close your current window before creating a ticket.', true);
            return;
        }
        const draft=smartSupportDraft?.role===role?smartSupportDraft:null;
        smartSupportDraft=null;
        const sourceContext = draft ? `SmartHelp: ${draft.context}` : relatedArticle ? `Help article: ${relatedArticle.title}` : route !== 'tickets' ? `Page: ${helpNavName(route)}` : '';
        if (helpMode === 'panel') helpClose();
        showModal('Create Support Ticket', 'Report a problem or ask management for help.', `
            <form id="ticket-create-form" class="ticket-form">
                ${sourceContext ? `<div class="ticket-context">Related: ${esc(sourceContext)}</div>` : ''}
                <input type="hidden" name="context" value="${esc(sourceContext)}">
                <div class="field"><label for="ticket-category">What do you need help with?</label><select class="select" id="ticket-category" name="category" required>
                    <option value="system">System Problem</option><option value="question" ${draft?'selected':''}>Question or Assistance</option><option value="operational">Operational Issue</option>
                </select></div>
                <div class="field"><label for="ticket-subject">Subject</label><input class="input" id="ticket-subject" name="subject" minlength="4" maxlength="110" placeholder="Briefly describe the issue" value="${esc(draft?.question||'')}" required></div>
                <div class="field" id="ticket-location-field" hidden><label for="ticket-location">Where did it happen?</label><input class="input" id="ticket-location" name="location" maxlength="100" placeholder="e.g. Restaurant kitchen"></div>
                <div class="field"><label for="ticket-description">Description</label><textarea id="ticket-description" class="input ticket-textarea" name="description" minlength="10" maxlength="2500" rows="5" required placeholder="What happened? What help do you need?">${draft?esc(`Help requested for ${draft.context}.\nPlease describe what happened, which steps you tried, and what you need help with. Remove any details you do not want shared.`):''}</textarea></div>
                <div class="field"><label for="ticket-priority">Priority</label><select class="select" name="priority" id="ticket-priority"><option value="normal">Normal</option><option value="urgent">Urgent — needs prompt attention</option></select></div>
                <fieldset class="ticket-visibility-picker"><legend>Who should see this issue?</legend><p class="ticket-visibility-hint">Suggested from the category. You can change it.</p>
                    <label class="ticket-visibility-choice"><input type="radio" name="visibility" value="private" checked><span><strong>Only me & Admin</strong><small>Private question or individual issue</small></span></label>
                    <label class="ticket-visibility-choice"><input type="radio" name="visibility" value="department"><span><strong>My Department</strong><small>Shared with ${esc(ticketRoleLabel(role))} staff and Admin</small></span></label>
                    <label class="ticket-visibility-choice"><input type="radio" name="visibility" value="all"><span><strong>All Staff</strong><small>Shared with Front Desk, Restaurant and Admin</small></span></label>
                </fieldset>
                <div id="ticket-visibility-explanation" class="ticket-sharing-note" aria-live="polite"></div>
                ${draft?'<div class="smart-ticket-prefill-note">SmartHelp prepared this draft. Review and edit the subject, description, category and visibility before choosing Submit Ticket.</div>':''}<div class="ticket-notice">Everyone in the selected audience can read the issue title, description and official updates. Replies to Admin stay private. Do not include passwords, payment details or unnecessary guest information. For emergencies, contact management directly.</div>
                <div class="ticket-form-actions">${btn('Cancel', 'modal-close')}<button type="submit" class="btn primary">Submit Ticket</button></div>
            </form>`);
        document.getElementById('ticket-category')?.dispatchEvent(new Event('change', { bubbles: true }));
        document.getElementById('ticket-subject')?.focus();
    }
    function syncTicketVisibilityInfo() {
        const value = document.querySelector('#ticket-create-form input[name="visibility"]:checked')?.value || 'private';
        const node = document.getElementById('ticket-visibility-explanation');
        if (!node) return;
        node.textContent = value === 'private'
            ? 'Visible only to you and authorized Admin staff.'
            : value === 'department'
                ? `Immediately visible to ${ticketRoleLabel(role)} staff and Admin in Shared Issues.`
                : 'Immediately visible to every department in Shared Issues. Check that your description is suitable for all staff.';
    }
    function submitTicket(v) {
        if (!['frontdesk', 'restaurant', 'admin'].includes(role) || !ticketCategories[v.category]) return;
        const subject = String(v.subject || '').trim();
        const description = String(v.description || '').trim();
        const location = String(v.location || '').trim();
        const visibility = String(v.visibility || ticketDefaultVisibility(v.category));
        if (subject.length < 4 || subject.length > 110 || description.length < 10 || description.length > 2500 || (v.category === 'operational' && !location)) {
            toast('Please complete the subject, description and any required location.', true);
            return;
        }
        if (!ticketVisibilities[visibility]) return;
        if (visibility === 'all' && !window.confirm('Share this ticket title and description with ALL resort employees? Private replies will remain separate.')) return;
        const time = new Date().toISOString();
        const existing = data.tickets.map(t => Number(String(t.id).match(/\d+$/)?.[0] || 0));
        const next = Math.max(0, ...existing) + 1;
        const ticket = {
            id: 'T-' + String(next).padStart(4, '0'),
            role,
            byRole: role,
            author: ticketIdentity(),
            authorId: employee()?.id || '',
            assignedTo: '',
            resolutionCycles: [],
            resolvedAt: null,
            category: v.category,
            subject,
            description,
            context: String(v.context || '').slice(0, 180),
            location: v.category === 'operational' ? location : '',
            visibility,
            priority: v.priority === 'urgent' ? 'urgent' : 'normal',
            status: 'open',
            unreadFor: { admin: role !== 'admin' },
            createdAt: time,
            updatedAt: time,
            messages: [],
            publicUpdates: [],
            history: [{ at: time, by: ticketIdentity(), detail: 'Ticket created' }]
        };
        data.tickets.unshift(ticket);
        audit(`Created support ticket ${ticket.id}`, ticketIdentity(), {
            module: 'Support & Issues', type: 'support', target: ticket.id, note: ticket.subject,
            changes: { Priority: ticket.priority, Category: ticketCategories[ticket.category], Visibility: ticketVisibilities[visibility] }
        });
        notify(['admin'], `New ${ticket.priority === 'urgent' ? 'urgent ' : ''}support ticket`, `${ticket.id}: ${ticket.subject}`, {
            kind: ticket.priority === 'urgent' ? 'warning' : 'info', route: 'tickets', entityId: ticket.id
        });
        const viewers = ticketAudience(ticket);
        if (viewers.length) notify(viewers, 'New shared issue', `${ticket.id}: ${ticket.subject}`, {
            kind: ticket.priority === 'urgent' ? 'warning' : 'info', route: 'tickets', entityId: ticket.id
        });
        save();
        closeModal();
        ticketFilters.view = role === 'admin' ? 'all' : 'mine';
        ticketFilters.attention = 'all';
        go('tickets');
        toast(`Ticket ${ticket.id} submitted.`);
        openTicket(ticket.id);
    }
    function openTicket(id) {
        const t = data.tickets.find(t => t.id === String(id));
        if (!t || !ticketCanView(t)) return;
        const sharedReader = ticketSharedOnly(t);
        if (!sharedReader && ticketMarkRead(t)) {
            if (ticketFilters.attention === 'needs' && ticketAttention().length === 0) ticketFilters.attention = 'all';
            render();
        }
        if (!sharedReader && role !== 'admin') {
            const adminReplies = (t.messages || []).filter(m => m.role === 'admin');
            const latest = adminReplies[adminReplies.length - 1];
            if (latest && t.employeeSeenReplyId !== latest.id) {
                t.employeeSeenReplyId = latest.id;
                save();
                render();
            }
        }
        const updates = (t.publicUpdates || []).map(u => `<div class="ticket-public-update"><strong>Management update</strong><small>${esc(prettyTime(u.at))}</small><p>${esc(u.text)}</p></div>`).join('');
        const sharedSummary = `<div class="ticket-detail-summary"><div>${ticketBadge(t.status)} ${ticketPriority(t.priority)} ${ticketVisibilityBadge(t)}</div><p><strong>${esc(ticketCategories[t.category])}</strong> · ${esc(ticketRoleLabel(t.role))} · ${esc(prettyTime(t.createdAt))}</p>${t.location ? `<p><strong>Location:</strong> ${esc(t.location)}</p>` : ''}<div class="ticket-metadata"><span><b>Created by</b> ${esc(t.author || 'Unknown')}</span><span><b>Assigned to</b> ${esc(data.employees.find(e => e.id === t.assignedTo)?.name || 'Unassigned')}</span><span><b>Time ${t.status === 'resolved' ? 'to resolution' : 'open'}</b> ${esc(ticketDuration(t))}</span>${t.resolvedAt ? `<span><b>Resolved by</b> ${esc(t.resolvedBy || 'Admin')} · ${esc(prettyTime(t.resolvedAt))}</span>` : ''}</div></div>
            <div class="ticket-original"><strong>Issue report</strong><p>${esc(t.description)}</p></div>
            <div class="ticket-public-updates"><h3>Official Updates</h3>${updates || '<div class="ticket-thread-empty">No management updates yet.</div>'}</div>`;
        if (sharedReader) {
            showModal(`Shared Issue ${esc(t.id)}`, esc(t.subject), `<div class="ticket-detail">${sharedSummary}<div class="ticket-sharing-note">This issue is shared with authorized staff. The reporter’s private conversation with Admin is not shown.</div></div>`);
            return;
        }
        const history = [
            ...(t.history || []).map(h => ({ time: h.at, kind: 'history', author: h.by, content: h.detail })),
            ...(t.messages || []).map(m => ({ time: m.at, kind: 'message', author: m.by, role: m.role, content: m.text }))
        ].sort((a, b) => new Date(a.time) - new Date(b.time));
        const messages = history.map(item => `<div class="ticket-message ${item.kind === 'history' ? 'ticket-event' : item.role === role ? 'own' : ''}">${item.kind === 'history' ? `<span>● ${esc(item.content)}</span><small>${esc(item.author)} · ${esc(prettyTime(item.time))}</small>` : `<div><strong>${esc(item.author)}</strong><small>${esc(prettyTime(item.time))}</small></div><p>${esc(item.content)}</p>`}</div>`).join('');
        const canReply = t.status !== 'resolved';
        const reply = canReply ? `<form id="ticket-reply-form" class="ticket-reply-form"><input type="hidden" name="id" value="${esc(t.id)}"><label for="ticket-reply">Private reply to ${role === 'admin' ? 'employee' : 'Admin'}</label><textarea id="ticket-reply" class="input ticket-textarea" name="message" rows="3" maxlength="1800" minlength="1" placeholder="Write a private reply…" required></textarea><button type="submit" class="btn primary">Send Private Reply</button></form>` : `<div class="ticket-notice">This ticket is resolved. ${role === 'admin' ? 'Change its status to continue the conversation.' : 'Reopen it if the issue still exists.'}</div>`;
        const adminControls = role === 'admin' ? `<form id="ticket-manage-form" class="ticket-manage-form"><input name="id" type="hidden" value="${esc(t.id)}"><div class="grid form-grid"><div class="field"><label for="manage-ticket-status">Status</label><select class="select" id="manage-ticket-status" name="status">${Object.entries(ticketStatuses).map(([key, name]) => `<option value="${esc(key)}" ${t.status === key ? 'selected' : ''}>${esc(name)}</option>`).join('')}</select></div><div class="field"><label for="manage-ticket-priority">Priority</label><select class="select" id="manage-ticket-priority" name="priority"><option value="normal" ${t.priority === 'normal' ? 'selected' : ''}>Normal</option><option value="urgent" ${t.priority === 'urgent' ? 'selected' : ''}>Urgent</option></select></div></div>
            <div class="field"><label>Assign employee</label><select class="select" name="assignedTo"><option value="">Unassigned</option>${data.employees.filter(e => e.active && e.role !== 'admin').map(e => `<option value="${esc(e.id)}" ${t.assignedTo === e.id ? 'selected' : ''}>${esc(e.name)} · ${esc(e.department)}</option>`).join('')}</select></div><div class="field"><label for="manage-ticket-visibility">Who can see this issue?</label><select class="select" id="manage-ticket-visibility" name="visibility">${Object.entries(ticketVisibilities).map(([key, name]) => `<option value="${key}" ${ticketVisibility(t) === key ? 'selected' : ''}>${esc(name)}</option>`).join('')}</select></div>
            <div class="field" id="ticket-visibility-reason-wrap" hidden><label for="ticket-visibility-reason">Reason for changing visibility</label><input class="input" id="ticket-visibility-reason" name="visibilityReason" maxlength="300" placeholder="Why should the audience change?"></div>
            <button class="btn" type="submit">Save Ticket Settings</button></form>
            <form id="ticket-public-update-form" class="ticket-reply-form"><input type="hidden" name="id" value="${esc(t.id)}"><label for="ticket-public-update">Publish a shared update</label><textarea class="input ticket-textarea" id="ticket-public-update" name="message" minlength="3" maxlength="1200" rows="2" placeholder="An update visible to everyone allowed to see the issue…" required></textarea><button class="btn" type="submit">Publish Update</button></form>` : t.status === 'resolved' ? `<div class="ticket-form-actions">${btn('Reopen Ticket', 'ticket-reopen', { id: t.id, primary: true })}</div>` : '';
        showModal(`Ticket ${esc(t.id)}`, esc(t.subject), `<div class="ticket-detail">${sharedSummary}${role !== 'admin' && t.assignedTo === employee()?.id && !['review', 'resolved'].includes(t.status) ? btn('Ready for Admin Review', 'ticket-ready', { id: t.id, primary: true }) : ''}<div class="ticket-thread"><h3>Private Conversation & Activity</h3>${messages || '<div class="ticket-thread-empty">No replies yet.</div>'}</div>${adminControls}${reply}</div>`);
        const thread = document.querySelector('#modal-root .modal-body');
        if (thread) thread.scrollTop = 0;
    }
    function replyTicket(v) {
        const t = data.tickets.find(t => t.id === String(v.id));
        if (!t || !ticketCanView(t) || t.status === 'resolved') return;
        const message = String(v.message || '').trim();
        if (!message || message.length > 1800) {
            toast('Write a reply before sending.', true);
            return;
        }
        const now = new Date().toISOString();
        t.messages.push({ id: uid('MSG'), role, by: ticketIdentity(), text: message, at: now });
        if (t.status === 'waiting' && role !== 'admin') {
            t.history.push({ at: now, by: ticketIdentity(), detail: 'Employee replied; ticket moved to In Progress' });
            t.status = 'progress';
        }
        if (t.status === 'open' && role === 'admin') {
            t.history.push({ at: now, by: 'Admin', detail: 'Ticket moved to In Progress' });
            t.status = 'progress';
        }
        t.updatedAt = now;
        ticketMarkUnread(t, role === 'admin' ? t.role : 'admin');
        audit(`Replied to support ticket ${t.id}`, ticketIdentity(), { module: 'Support & Issues', type: 'support', target: t.id, note: 'Reply added' });
        notify(role === 'admin' ? [t.role] : ['admin'], `New reply on ${t.id}`, t.subject, { route: 'tickets', entityId: t.id, kind: 'info' });
        save();
        render();
        openTicket(t.id);
        toast('Reply sent.');
    }
    function manageTicket(v) {
        if (role !== 'admin') return;
        const t = data.tickets.find(t => t.id === String(v.id));
        if (!t || !ticketStatuses[v.status] || !['normal', 'urgent'].includes(v.priority) || !ticketVisibilities[v.visibility]) return;
        const beforeStatus = t.status;
        const beforePriority = t.priority;
        const beforeVisibility = ticketVisibility(t);
        const oldAssigned = t.assignedTo || '';
        if (beforeStatus === v.status && beforePriority === v.priority && beforeVisibility === v.visibility && oldAssigned === (v.assignedTo || '')) {
            toast('Nothing changed.');
            return;
        }
        const reason = String(v.visibilityReason || '').trim();
        if (beforeVisibility !== v.visibility && reason.length < 5) {
            toast('Please enter a reason for changing who can see this issue.', true);
            return;
        }
        if (beforeVisibility !== v.visibility && v.visibility === 'all' && !window.confirm('Share this issue title and description with ALL staff?')) return;
        const oldAudience = ticketAudience(t);
        const now = new Date().toISOString();
        t.status = v.status;
        t.priority = v.priority;
        t.visibility = v.visibility;
        t.assignedTo = data.employees.some(e => e.id === v.assignedTo && e.active && e.role !== 'admin') ? v.assignedTo : '';
        if (beforeStatus !== 'resolved' && t.status === 'resolved') { t.resolvedAt = now; t.resolvedBy = employeeLabel(); t.resolutionCycles.push({ at: now, from: t.createdAt, by: employeeLabel() }); }
        if (beforeStatus === 'resolved' && t.status !== 'resolved') { t.resolvedAt = null; t.resolvedBy = ''; }
        t.updatedAt = now;
        t.history.push({ at: now, by: 'Admin', detail: 'Ticket settings updated' });
        const changes = {};
        if (beforeStatus !== t.status) {
            changes.Status = `${ticketStatuses[beforeStatus]} → ${ticketStatuses[t.status]}`;
            ticketMarkUnread(t, t.role);
        }
        if (oldAssigned !== t.assignedTo) changes.Assigned = `${data.employees.find(e => e.id === oldAssigned)?.name || 'Unassigned'} → ${data.employees.find(e => e.id === t.assignedTo)?.name || 'Unassigned'}`;
        if (beforePriority !== t.priority) changes.Priority = `${beforePriority} → ${t.priority}`;
        if (beforeVisibility !== t.visibility) {
            changes.Visibility = `${ticketVisibilities[beforeVisibility]} → ${ticketVisibilities[t.visibility]}`;
            changes.Reason = reason;
        }
        audit(`Updated support ticket ${t.id}`, 'Admin', { module: 'Support & Issues', type: 'support', target: t.id, changes });
        if (beforeStatus !== t.status || beforePriority !== t.priority) notify([t.role], `Ticket ${t.id} updated`, `${t.subject} · ${ticketStatuses[t.status]}`, { route: 'tickets', entityId: t.id, kind: t.status === 'resolved' ? 'success' : 'info' });
        const newAudience = ticketAudience(t);
        if (beforeVisibility !== t.visibility) {
            data.notifications = data.notifications.filter(n => n.entityId !== t.id || n.role === 'admin' || n.role === t.role || ticketSharedWith(t, n.role));
            const newlyShared = newAudience.filter(r => !oldAudience.includes(r));
            if (newlyShared.length) notify(newlyShared, 'Issue shared with your team', `${t.id}: ${t.subject}`, { route: 'tickets', entityId: t.id, kind: 'info' });
            notify([t.role], `Visibility changed on ${t.id}`, ticketVisibilities[t.visibility], { route: 'tickets', entityId: t.id, kind: 'info' });
        }
        if (beforeStatus !== t.status && t.visibility !== 'private') notify(newAudience.filter(r => r !== t.role), `Shared issue ${t.id} updated`, `${t.subject} · ${ticketStatuses[t.status]}`, { route: 'tickets', entityId: t.id, kind: t.status === 'resolved' ? 'success' : 'info' });
        save();
        render();
        openTicket(t.id);
        toast('Ticket updated.');
    }
    function publishTicketUpdate(v) {
        if (role !== 'admin') return;
        const t = data.tickets.find(t => t.id === String(v.id));
        const message = String(v.message || '').trim();
        if (!t || message.length < 3 || message.length > 1200) {
            toast('Write a short update before publishing.', true);
            return;
        }
        const now = new Date().toISOString();
        if (!Array.isArray(t.publicUpdates)) t.publicUpdates = [];
        t.publicUpdates.push({ id: uid('PUB'), text: message, at: now });
        t.updatedAt = now;
        t.history.push({ at: now, by: 'Admin', detail: 'Published an official issue update' });
        audit(`Published update on ticket ${t.id}`, 'Admin', { module: 'Support & Issues', type: 'support', target: t.id, note: message });
        notify([...new Set([t.role, ...ticketAudience(t)])], `Management update on ${t.id}`, t.subject, { route: 'tickets', entityId: t.id, kind: 'info' });
        save();
        render();
        openTicket(t.id);
        toast('Update published.');
    }
    function reopenTicket(id) {
        const t = data.tickets.find(t => t.id === String(id));
        if (!t || role === 'admin' || !ticketCanView(t) || t.status !== 'resolved') return;
        const time = new Date().toISOString();
        t.status = 'open';
        t.resolvedAt = null;
        t.resolvedBy = '';
        t.updatedAt = time;
        ticketMarkUnread(t, 'admin');
        t.history.push({ at: time, by: ticketIdentity(), detail: 'Ticket reopened' });
        audit(`Reopened support ticket ${t.id}`, ticketIdentity(), { module: 'Support & Issues', type: 'support', target: t.id });
        notify(['admin'], `Ticket ${t.id} reopened`, t.subject, { route: 'tickets', entityId: t.id, kind: 'warning' });
        save();
        render();
        openTicket(t.id);
        toast('Ticket reopened.');
    }
    function menuPage() {
        return `${header('Restaurant Menu', 'Manage available menu items and prices.', btn('+ Add Menu Item', 'add-menu', { primary: true }))}${card('Menu items', 'Changes affect new orders; historical order prices are retained.', table([
            'Item',
            'Category',
            'Price',
            'Status',
            'Action'
        ], data.menu.map(x => `<tr><td><div class="menu-admin-item">${assetImg(x.imageId, 'list-thumb')}<span><strong>${esc(x.name)}</strong><small>${esc(x.description || 'No description')}</small></span></div></td><td>${esc(x.category)}</td><td>${money(x.price)}</td><td>${x.active ? badge('active') : '<span class="badge neutral">Inactive</span>'}</td><td>${btn('Edit', 'edit-menu', { id: x.id, small: true })} ${x.active ? btn('Deactivate', 'remove-item', { id: 'menu:' + x.id, small: true, danger: true }) : btn('Activate', 'activate-item', { id: 'menu:' + x.id, small: true })}</td></tr>`)))}`;
    }
    function servicesPage() {
        return `${header('Additional Service Catalog', 'Configure services that may be posted to a guest stay.', btn('+ Add Service', 'add-catalog-service', { primary: true }))}${card('Extra services', 'Admin decides which services require a duration or extra-unit input.', table([
            'Service',
            'Rate',
            'Pricing unit',
            'Charge inputs',
            'Status',
            'Action'
        ], data.services.map(x => `<tr><td>${esc(x.name)}</td><td>${money(x.rate)}</td><td>Per ${esc(x.unit)}</td><td>${x.requiresUnits ? `Quantity + ${esc(x.unitsLabel || 'extra units')}` : 'Quantity only'}</td><td>${x.active ? badge('active') : '<span class="badge neutral">Inactive</span>'}</td><td>${btn('Edit', 'edit-catalog-service', { id: x.id, small: true })} ${x.active ? btn('Deactivate', 'remove-item', { id: 'service:' + x.id, small: true, danger: true }) : btn('Activate', 'activate-item', { id: 'service:' + x.id, small: true })}</td></tr>`)))}`;
    }
    function oldUsersPage() {
        return `${header('Users & Roles', 'Prototype permissions overview.')}${card('Access roles', 'Role switching in the demo is available from the top-right menu.', table(['Role', 'Can manage', 'Restrictions'], [
            [
                'Admin',
                'Rooms, catalogs, roles and audit',
                'Cannot record accommodation fees'
            ],
            [
                'Front Desk',
                'Stays, additional charges and settlement',
                'Cannot post restaurant orders'
            ],
            [
                'Restaurant Staff',
                'Orders, table payments and room posting',
                'Cannot settle guest room charges'
            ]
        ].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`)))}`;
    }
    const auditTypes = {
        payment: 'Payment',
        posting: 'Room posting',
        order: 'Restaurant order',
        checkout: 'Checkout',
        stay: 'Guest stay',
        create: 'Created',
        update: 'Updated',
        remove: 'Deactivated',
        void: 'Voided',
        other: 'Other',
        support: 'Support ticket'
    };
    function auditTypeClass(type) {
        return [
            'payment',
            'posting',
            'order',
            'checkout',
            'stay',
            'create',
            'update',
            'remove',
            'void',
            'support'
        ].includes(type) ? type : 'other';
    }
    function auditIcon(type) {
        return ({
            payment: '₱',
            posting: '↗',
            order: '▤',
            checkout: '✓',
            stay: '⌂',
            create: '+',
            update: '✎',
            remove: '−',
            void: '!',
            other: '◎'
        })[type] || '◎';
    }
    function auditTag(type) {
        return `<span class="audit-tag ${auditTypeClass(type)}"><span class="audit-tag-icon">${auditIcon(type)}</span>${esc(auditTypes[type] || 'Other')}</span>`;
    }
    function auditMatches() {
        const q = auditFilters.query.toLowerCase().trim();
        return [...data.audit].map(normalizeAuditEntry).filter(a => {
            if (auditFilters.module !== 'all' && a.module !== auditFilters.module)
                return false;
            if (auditFilters.type !== 'all' && a.type !== auditFilters.type)
                return false;
            if (auditFilters.staff !== 'all' && a.by !== auditFilters.staff)
                return false;
            const date = (a.time || '').slice(0, 10);
            if (auditFilters.from && date < auditFilters.from)
                return false;
            if (auditFilters.to && date > auditFilters.to)
                return false;
            if (q && !([
                a.action,
                a.by,
                a.module,
                a.target,
                a.type,
                a.note,
                JSON.stringify(a.changes || {})
            ].join(' ').toLowerCase().includes(q)))
                return false;
            return true;
        }).sort((a, b) => new Date(b.time) - new Date(a.time));
    }
    function auditPage() {
        const records = auditMatches(), n = data.audit.length;
        const names = [...new Set(data.audit.map(x => x.by || 'Unknown'))].sort();
        const areas = [
            ...new Set(data.audit.map(x => x.module || inferAuditModule(x.action, x.by)))
        ].sort();
        const types = [...new Set(data.audit.map(x => x.type || inferAuditType(x.action)))].sort();
        const perPage = 15, pages = Math.max(1, Math.ceil(records.length / perPage));
        auditPageNum = Math.min(auditPageNum, pages);
        const visible = records.slice((auditPageNum - 1) * perPage, auditPageNum * perPage);
        const todayDate = today(), todayCount = data.audit.filter(x => x.time?.slice(0, 10) === todayDate).length;
        const paymentCount = data.audit.filter(x => x.type === 'payment').length;
        const voidCount = data.audit.filter(x => x.type === 'void').length;
        const options = (items, selected, defaultLabel) => `<option value="all">${defaultLabel}</option>${items.map(v => `<option value="${esc(v)}" ${selected === v ? 'selected' : ''}>${esc(auditTypes[v] || v)}</option>`).join('')}`;
        const stat = (icon, label, value, detail, kind = '') => `<article class="shared-stat-card ${kind}"><div class="shared-stat-top"><span class="shared-stat-icon">${premiumIcon(icon,18)}</span><span class="shared-stat-label">${label}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
        return `${header('Audit Log', 'Find out who changed what, when, and where — with clearer filters and cleaner review tools.', btn('Export Filtered CSV', 'audit-export', { primary: true }))}
 <div class="shared-stat-grid audit-stat-grid">${stat('audit','Recorded events',n,'All saved actions')}${stat('clock','Today',todayCount,'Actions recorded today','green')}${stat('wallet','Payments',paymentCount,'Recorded payment actions','purple')}${stat('warning','Voids / corrections',voidCount,'Reversed or voided activity','amber')}</div>
 <section class="card section-space audit-workspace audit-premium"><div class="card-head"><div><h2>Activity history</h2><p class="sub">Search, filter and open any event for full detail. Newest records appear first.</p></div><span class="audit-match-count">${records.length} matching ${records.length === 1 ? 'event' : 'events'}</span></div>
 <div class="audit-filter-grid"><div class="audit-search-wrap"><label for="audit-search">Search records</label><input class="input" id="audit-search" data-audit-search value="${esc(auditFilters.query)}" placeholder="Order ID, room, table, employee, action…"></div>
 <div><label for="audit-module">Work area</label><select class="select" id="audit-module" data-audit-filter="module">${options(areas, auditFilters.module, 'All areas')}</select></div>
 <div><label for="audit-type">Action type</label><select class="select" id="audit-type" data-audit-filter="type">${options(types, auditFilters.type, 'All action types')}</select></div>
 <div><label for="audit-staff">Employee</label><select class="select" id="audit-staff" data-audit-filter="staff">${options(names, auditFilters.staff, 'All employees')}</select></div>
 <div><label for="audit-from">From date</label><input class="input" id="audit-from" type="date" data-audit-filter="from" value="${esc(auditFilters.from)}"></div>
 <div><label for="audit-to">To date</label><input class="input" id="audit-to" type="date" data-audit-filter="to" value="${esc(auditFilters.to)}"></div></div>
 <div class="audit-filter-footer"><span>Use multiple filters together to narrow the exact record you need.</span>${btn('Clear Filters', 'audit-clear', { small: true })}</div>
 <div class="table-wrap audit-table-wrap"><table class="audit-table"><thead><tr><th>Date & time</th><th>Employee</th><th>Work area</th><th>Action type</th><th>Activity</th><th>Record</th></tr></thead>
 <tbody>${visible.length ? visible.map(a => `<tr><td><strong>${esc(new Date(a.time).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }))}</strong><small>${esc(new Date(a.time).toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit', second: '2-digit' }))}</small></td><td><strong>${esc(a.by)}</strong></td><td><span class="audit-area">${esc(a.module)}</span></td><td>${auditTag(a.type)}</td><td class="audit-description"><strong>${esc(a.action)}</strong><small>${esc(a.note || '')}</small></td><td>${btn('Details →', 'view-audit', { id: a.id, small: true })}</td></tr>`).join('') : `<tr><td colspan="6"><div class="empty"><strong>No matching activity</strong>Try changing your filters or search keywords.<div style="margin-top:15px">${btn('Clear Filters', 'audit-clear')}</div></div></td></tr>`}</tbody></table></div>
 <div class="audit-pagination"><span>${records.length ? `Showing ${(auditPageNum - 1) * perPage + 1}–${Math.min(auditPageNum * perPage, records.length)} of ${records.length}` : 'No records'}</span><div>${btn('← Previous', 'audit-prev', { small: true })}<span>Page ${auditPageNum} / ${pages}</span>${btn('Next →', 'audit-next', { small: true })}</div></div></section>
 <p class="audit-security-note">Audit history is read-only in the interface. This V1 demo stores events only in this browser; the final system should use an authenticated, append-only server audit log for reliable employee tracking.</p>`;
    }
    function showAuditDetails(id) {
        const e = data.audit.find(a => a.id === id);
        if (!e)
            return;
        const a = normalizeAuditEntry(e, 0);
        const detail = (label, value) => `<div class="audit-detail-row"><span>${esc(label)}</span><strong>${esc(value ?? '—')}</strong></div>`;
        const changes = a.changes && typeof a.changes === 'object' ? Object.entries(a.changes) : [];
        const extras = [
            ['Affected record', a.target],
            ['Payment amount', a.amount != null ? money(a.amount) : null],
            ['Payment method', a.method],
            ['Reason', a.reason],
            ['Notes', a.note]
        ].filter(x => x[1] != null);
        showModal('Audit record details', 'Read-only activity evidence', `<div class="audit-detail-top">${auditTag(a.type)}<span class="audit-detail-id">${esc(a.id)}</span></div><h3 class="audit-event-title">${esc(a.action)}</h3><div class="audit-detail-list">${detail('Employee', a.by)}${detail('Work area', a.module)}${detail('Date and time', new Date(a.time).toLocaleString('en-PH', { dateStyle: 'full', timeStyle: 'medium' }))}${extras.map(([k, v]) => detail(k, v)).join('')}</div>
 ${changes.length ? `<h3 class="audit-change-heading">Recorded changes</h3><div class="audit-detail-list">${changes.map(([key, val]) => detail(key, typeof val === 'object' ? JSON.stringify(val) : val)).join('')}</div>` : ''}
 <div class="notice section-space">This entry is preserved for review; it cannot be edited or deleted from the Audit Log screen.</div>`, btn('Close', 'modal-close', { primary: true }));
    }
    function exportAuditCsv() {
        const cols = [
            'Timestamp',
            'Employee',
            'Work area',
            'Action type',
            'Affected record',
            'Action description',
            'Payment amount',
            'Method',
            'Reason',
            'Notes',
            'Recorded changes'
        ];
        const csvField = x => {
            let v = String(x == null ? '' : x);
            if (/^[=+@\-]/.test(v.trimStart()))
                v = "'" + v;
            return '"' + v.replace(/"/g, '""') + '"';
        };
        const lines = [
            cols,
            ...auditMatches().map(a => [
                a.time,
                a.by,
                a.module,
                auditTypes[a.type] || 'Other',
                a.target,
                a.action,
                a.amount ?? '',
                a.method || '',
                a.reason || '',
                a.note || '',
                a.changes ? JSON.stringify(a.changes) : ''
            ])
        ];
        const blob = new Blob(['\uFEFF' + lines.map(row => row.map(csvField).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob), anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'resortOS-V1-audit-' + today() + '.csv';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 500);
        toast('Exported ' + (lines.length - 1) + ' audit record(s) to CSV.');
    }
    function showModal(title, subtitle, body, footer = '') {
        document.getElementById('modal-root').innerHTML = `<div class="modal-overlay"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><div><h2>${title}</h2><p class="sub">${subtitle}</p></div><div class="modal-help-actions"><button class="modal-help-btn" type="button" data-action="help-open" aria-label="Help with this window" title="Help with this window">? Help</button><button class="icon-btn" data-action="modal-close" aria-label="Close">×</button></div></div><div class="modal-body">${body}</div>${footer ? `<div class="modal-footer">${footer}</div>` : ''}</section></div>`;
        document.body.style.overflow = 'hidden';
        helpInsertHints(document.getElementById('modal-root'));
        if(helpMode==='panel' && smartView==='home' && !helpSelected) helpRenderRoot();
    }
    function closeModal() {
        document.getElementById('modal-root').innerHTML = '';
        document.body.style.overflow = '';
        if(helpMode==='panel' && smartView==='home' && !helpSelected) helpRenderRoot();
    }
    function toast(message, error = false) {
        if(error && ['frontdesk','restaurant','admin'].includes(role))smartLastError={role,message:String(message).slice(0,180),at:Date.now()};
        if(error && smartGuide && smartGuides.some(g=>g.id===smartGuide.id&&g.operation)) { smartGuide.lastError=String(message).slice(0,200);requestAnimationFrame(smartGuideSync); }
        let el = document.getElementById('toast');
        el.innerHTML = `<div class="toast ${error ? 'error' : ''}">${esc(message)}</div>`;
        setTimeout(() => {
            if (el)
                el.innerHTML = '';
        }, 3100);
    }
    function viewStay(id) {
        const s = data.stays.find(x => x.id === id);
        if (!s)
            return;
        const charges = data.charges.filter(c => c.stayId === s.id);
        showModal(roomLabel(s.room) + ' · Stay Details', 'Guest stay and charges', `<div class="grid form-grid"><div><div class="section-label">Guest</div><strong>${esc(s.name || 'Guest')}</strong></div><div><div class="section-label">Status</div>${s.active ? badge('active') : '<span class="badge green">Checked out</span>'}</div><div><div class="section-label">Check in</div><strong>${esc(s.checkin)}</strong></div><div><div class="section-label">Expected checkout</div><strong>${esc(s.checkout)}</strong></div></div><div class="checkout-total"><strong>Outstanding incidental charges</strong><b>${money(dueForStay(s.id))}</b></div>${charges.map(c => `<div class="item-line"><div><strong>${esc(c.label)}</strong><small>${money(c.amount)} total · ${esc(c.source)}</small></div><div>${badge(c.status)}<div class="text-amber" style="margin-top:5px;text-align:right">${money(remain(c))} due</div></div></div>`).join('') || '<div class="empty">No charges yet.</div>'}`, `${btn('Payment History', 'receipt-history', { id: s.id })}${btn('View Charges', 'modal-charges', { id: s.id })}${role === 'frontdesk' && s.active ? btn('Review Checkout', 'checkout-stay', { id: s.id, primary: true }) : ''}`);
        document.querySelector('#modal-root .modal')?.classList.add('fd-detail-modal');
    }
    function viewCharges(stayId) {
        let s = data.stays.find(x => x.id === stayId);
        if (!s)
            return;
        const all = data.charges.filter(c => c.stayId === stayId);
        showModal(`${roomLabel(s.room)} · Room Charges`, 'Restaurant and additional service charges only', `${all.map(c => `<div class="item-line"><div><strong>${esc(c.label)}</strong><small>${esc(c.source)} · ${prettyTime(c.date)} · ${money(c.amount)} total</small><small>${badge(c.status)} ${money(remain(c))} outstanding</small></div>${remain(c) > 0 ? btn('Record Payment', 'pay-charge', { id: c.id, small: true }) : ''}</div>`).join('') || '<div class="empty">No charges recorded for this stay.</div>'}<div class="checkout-total"><strong>Outstanding balance</strong><b>${money(dueForStay(stayId))}</b></div>`);
        document.querySelector('#modal-root .modal')?.classList.add('fd-detail-modal');
    }
    function viewOrder(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o)
            return;
        showModal('Order #' + esc(o.id), 'Restaurant order and transaction details', `<div class="item-line"><strong>${o.destination === 'room' ? roomLabel(o.room) + (o.table ? ' · ' + esc(tableName(o.table)) : '') : esc(tableName(o.table))}</strong>${badge(o.status)}</div>${o.items.map(i => `<div class="item-line"><div><strong>${esc(i.name)} × ${i.qty}</strong><small>${money(i.price)} each</small></div><span class="line-amount">${money(i.qty * i.price)}</span></div>`).join('')}<div class="checkout-total"><strong>Total</strong><b>${money(orderPayable(o))}</b></div><div class="notice">${o.destination === 'room' ? 'This order was posted to a room. Front Desk handles collection and settlement.' : 'Restaurant orders are settled after the guest finishes dining.'}</div><p class="hint">Created by ${esc(o.staff)} · ${prettyTime(o.created)}</p>`, `${o.destination === 'table' && o.status === 'awaiting_payment' ? btn('Choose Payment', 'table-bill', { id: o.id, primary: true }) : ''}${['pending','awaiting_payment'].includes(o.status) && role==='restaurant' ? btn('Apply Discount','discount-order',{id:o.id}):''}${o.status === 'pending' ? btn('Add Items', 'edit-order', { id: o.id }) + btn('Mark Waiting for Payment', 'table-ready', { id: o.table, primary: true }) : ''}${o.status === 'paid' ? btn('Print Receipt', 'receipt-order', { id: o.id }) : ''}${['posted', 'pending', 'awaiting_payment'].includes(o.status) && canVoid() ? btn('Void Order', 'void-order', { id: o.id, danger: true }) : ''}`);
    }
    function payCharge(id) {
        const c = data.charges.find(x => x.id === id);
        if (!c || remain(c) <= 0)
            return;
        const s = data.stays.find(x => x.id === c.stayId);
        showModal('Record External Payment', 'Front Desk confirms money received outside the application.', `<form id="payment-form" data-payment-calculator data-due="${remain(c)}" data-payment-kind="frontdesk"><input type="hidden" name="id" value="${esc(id)}"><div class="muted-panel"><div class="item-line"><strong>${esc(c.label)}</strong><span>${money(c.amount)}</span></div><div class="checkout-total"><strong>Outstanding</strong><b>${money(remain(c))}</b></div><div class="text-muted">${roomLabel(s.room)} · ${esc(s.name || 'Guest')}</div></div>${paymentInputs(remain(c), remain(c))}<div class="notice">Cash change is not counted as payment. Partial payments are supported, and each payment is audited.</div><button class="btn primary full" type="submit" style="margin-top:20px">Confirm Payment Received</button></form>`);
        updatePaymentCalculator(document.getElementById('payment-form'));
    }
    function registerStay(room = '') {
        const available = activeRooms().filter(r => !stayFor(r.id));
        showModal('Register Guest Stay', 'Accommodation pricing and payment are intentionally excluded.', `<form id="stay-form"><div class="field"><label>Vacant room</label><select class="select" name="room" required>${available.map(r => `<option value="${r.id}" ${String(room) === String(r.id) ? 'selected' : ''}>${roomLabel(r.id)}</option>`).join('')}</select></div><div class="field"><label>Guest name (optional)</label><input class="input" name="name" placeholder="Guest name"></div><div class="form-grid"><div class="field"><label>Check-in date</label><input class="input" name="checkin" type="date" value="${today()}" required></div><div class="field"><label>Expected checkout</label><input class="input" name="checkout" type="date" value="${today()}" required></div></div><button class="btn primary full" type="submit">Register Stay</button></form>`);
    }
    function checkoutStay(id) {
        const st = data.stays.find(s => s.id === id);
        if (!st || !st.active)
            return;
        const all = data.charges.filter(c => c.stayId === id && c.status !== 'void');
        const unpaid = all.filter(c => remain(c) > .001), due = Math.round(dueForStay(id) * 100) / 100, paid = all.reduce((n, c) => n + Number(c.paid || 0), 0);
        const rows = all.length ? all.map(c => `<div class="checkout-charge ${remain(c) < .001 ? 'closed' : ''}"><div class="checkout-charge-label"><div><strong>${esc(c.label)}</strong><small>${c.source === 'restaurant' ? 'Restaurant' : 'Additional service'} · ${prettyTime(c.date)}</small>${roomChargeDetailsMarkup(c)}${c.source==='restaurant' && Number(c.paid||0)<.001 && c.status==='unpaid' && mayApplyLateDiscount()?btn('Apply Late Discount','late-discount',{id:c.id,small:true}):''}</div>${badge(c.status)}</div><div class="checkout-charge-meta"><span>Charge: ${money(c.amount)}</span><span>Already paid: ${money(c.paid || 0)}</span><strong>Remaining: ${money(remain(c))}</strong></div></div>`).join('') : '<div class="notice">No restaurant or additional service charges have been posted to this stay.</div>';
        const paymentForm = unpaid.length ? `<div class="checkout-pay-panel"><h3>Record a payment</h3><p class="sub">Only enter money already received from the guest.</p><form id="checkout-pay-form" data-payment-calculator data-due="${due}" data-payment-kind="frontdesk"><input name="stayId" type="hidden" value="${esc(id)}">${paymentInputs(due)}<div class="notice">Payments apply to existing incidental charges in order. Cash change is returned to the guest, not added to the payment. No accommodation charges are included.</div></form></div><div class="checkout-list">${rows}</div>` : `<div class="notice success">No outstanding restaurant or additional service charges. You can check out this guest now.</div><div class="checkout-list">${rows}</div>`;
        showModal('Checkout · ' + roomLabel(st.room), 'Review charges, record any payment, and finish checkout here.', `<div class="checkout-summary"><div><span class="section-label">Guest / stay</span><strong>${esc(st.name || 'Guest')}</strong><small>${esc(st.checkin)} → ${esc(st.checkout)}</small></div><div><span class="section-label">Payments recorded</span><strong>${money(paid)}</strong></div><div><span class="section-label">Still to pay</span><strong class="${due ? 'text-amber' : 'text-teal'}">${money(due)}</strong></div></div><div class="checkout-section-label">Room charges · ${all.length}</div><div class="receipt-history-link">${btn('Payment History / Reprint', 'receipt-history', { id })}</div>${paymentForm}`, `${btn('Close', 'modal-close')}${due > .001 ? '<button class="btn primary" type="submit" form="checkout-pay-form">Record Payment</button>' : btn('Complete Checkout', 'confirm-checkout', { id, primary: true })}`);
        const dialog = document.querySelector('#modal-root .modal');
        if (dialog) dialog.classList.add('modal-wide', 'fd-checkout-modal');
        updatePaymentCalculator(document.getElementById('checkout-pay-form'));
    }
    function paymentSuccess(paymentId) {
        const payment = data.paymentRecords.find(p => p.id === paymentId);
        if (!payment) return;
        const isFrontDesk = payment.area === 'frontdesk';
        const stay = isFrontDesk ? data.stays.find(s => s.id === payment.stayId) : null;
        const outstanding = isFrontDesk ? Number(payment.balance ?? dueForStay(payment.stayId)) : 0;
        const details = [
            ['Actual bill', peso2(payment.billTotal ?? payment.amount)],
            ['Payment applied', peso2(payment.amount)],
            [isFrontDesk ? 'Room' : 'Restaurant table', isFrontDesk ? roomLabel(payment.room) : tableName(payment.table)],
            ['Payment method', payment.method],
            ...(payment.methodType === 'cash' ? [['Cash received', peso2(payment.tendered)], ['Change to return', peso2(payment.change || 0)]] : [['Amount received', peso2(payment.tendered ?? payment.amount)]]),
            ...(isFrontDesk ? [['Remaining room charges', peso2(outstanding)]] : []),
            ['Receipt reference', payment.id]
        ];
        const summary = `<div class="payment-success-left"><div class="payment-result-icon">✓</div><div class="payment-result-details">${details.map(([label,value])=>`<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join('')}</div><div class="notice ${!outstanding ? 'success' : ''}">${isFrontDesk ? outstanding > .001 ? `Payment saved. ${peso2(outstanding)} remains unpaid; continue in Checkout to record another payment.` : 'All posted charges are settled. You can complete checkout now.' : 'Payment saved. This table is now available for the next guests.'}</div></div>`;
        const receipt = `<div class="payment-success-right"><div class="payment-success-receipt-head"><strong>Receipt Preview</strong><span>From the published ${isFrontDesk ? 'Front Desk' : 'Restaurant'} layout</span></div><div class="payment-success-paper" id="success-receipt-paper">${rbPaymentPreview(payment, '80')}</div><div class="payment-receipt-actions"><div class="field"><label for="success-receipt-format">Receipt format</label><select class="select" id="success-receipt-format" data-payment-id="${esc(payment.id)}">${rbFormats.map(([key,label])=>`<option value="${key}">${esc(label)}</option>`).join('')}</select></div>${btn('Print Receipt (optional)', 'quick-print-receipt', { id: payment.id })}</div></div>`;
        const actions = isFrontDesk ? `${btn('Continue Checkout', 'payment-continue-checkout', { id: payment.stayId })}${outstanding < .001 && stay?.active ? btn('Complete Checkout', 'confirm-checkout', { id: payment.stayId, primary: true }) : ''}` : btn('Back to Tables', 'payment-return-tables', { primary: true });
        showModal('Payment recorded successfully', isFrontDesk ? `${roomLabel(payment.room)} · Ready for the next step` : 'Restaurant payment confirmed', `<div class="payment-success-split">${summary}${receipt}</div>`, actions);
        document.querySelector('#modal-root .modal')?.classList.add('payment-success-modal');
    }
    function cashPay(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o || o.destination !== 'table' || o.status !== 'awaiting_payment')
            return;
        showModal('Receive Restaurant Payment', 'Collect the payment and return the correct change before releasing the table.', `<form id="restaurant-pay-form" data-payment-calculator data-due="${orderPayable(o)}" data-payment-kind="restaurant"><div class="muted-panel"><div class="item-line"><strong>Order #${esc(o.id)} · ${esc(tableName(o.table))}</strong>${badge(o.status)}</div><div class="checkout-total"><strong>Amount to collect</strong><b>${money(orderPayable(o))}</b></div></div>${paymentInputs(orderPayable(o), orderPayable(o), 'restaurant')}<div class="notice warning">Confirm only when payment has been received. Cash change will appear on the receipt; the table becomes available once paid.</div></form>`, `${btn('Apply Discount','discount-order',{id:o.id})}${btn('Preview Unpaid Bill', 'quick-print-bill', { id: o.id })}${btn('Back', 'table-bill', { id: o.id })}${btn('Confirm Payment Received', 'confirm-cash', { id: o.id, primary: true })}`);
        updatePaymentCalculator(document.getElementById('restaurant-pay-form'));
    }
    function voidOrder(id) {
        const o = data.orders.find(x => x.id === id);
        if (!canVoid() || !o || !['posted', 'pending', 'awaiting_payment'].includes(o.status))
            return;
        showModal('Void Order #' + esc(id), 'The original order remains visible in history.', `<form id="void-form"><input type="hidden" name="id" value="${esc(id)}"><div class="notice warning">Voiding a posted restaurant charge will void the linked room charge. If any payment was recorded, resolve it with Front Desk first.</div><div class="field" style="margin-top:18px"><label>Reason for void *</label><textarea class="textarea" name="reason" required minlength="5" placeholder="Explain why this order is being voided"></textarea></div><button type="submit" class="btn danger full">Confirm Void with Reason</button></form>`);
    }
    function orderSequence() {
        return 'R-' + (Math.max(1048, ...data.orders.map(o => Number(o.id.split('-')[1]) || 0)) + 1);
    }
    function submitOrder() {
        const additions = Object.entries(cart).filter(([id, q]) => q > 0).map(([id, q]) => ({ ...data.menu.find(m => m.id === Number(id)), qty: q })).filter(i => i.id && i.active).map(({ id, name, price, qty }) => ({
            id,
            name,
            price,
            qty,
            statutoryEligible: data.menu.find(m => Number(m.id) === Number(id))?.statutoryEligible !== false,
            category: data.menu.find(m => Number(m.id) === Number(id))?.category || ''
        }));
        if (!additions.length) {
            toast('Choose at least one menu item.', true);
            return;
        }
        const tableNo = String(document.getElementById('table-choice')?.value || currentTable);
        const t = data.tables.find(t => t.active && t.id === tableNo);
        if (!t) {
            toast('Choose an active table.', true);
            return;
        }
        const existing = tableOpenOrders(tableNo);
        if (existing.length > 1) {
            toast('Multiple active orders found. Review this table before adding items.', true);
            return;
        }
        const ongoing = existing[0];
        if (ongoing) {
            if (ongoing.status !== 'pending') {
                toast('This table is already waiting for payment. Reopen dining first.', true);
                return;
            }
            if(discountEntries(ongoing).length) {
                data.discountEvents.filter(e=>e.orderId===ongoing.id && !e.reversed).forEach(e=>{e.reversed=true;e.reversedAt=new Date().toISOString();e.reversedBy=employeeLabel();e.reversalReason='Order items changed before payment';});
                audit('Reset pending discounts after items were added to '+ongoing.id,employeeLabel(),{module:'Restaurant',type:'update',target:ongoing.id});
                ongoing.discounts=[];
            }
            for (const item of additions) {
                const prev = ongoing.items.find(x => Number(x.id) === Number(item.id) && Number(x.price) === Number(item.price));
                if (prev)
                    prev.qty += item.qty;
                else
                    ongoing.items.push(item);
            }
            audit('Added ' + additions.reduce((n, i) => n + i.qty, 0) + ' items to ongoing order ' + ongoing.id + ' at ' + t.name, 'Restaurant Staff', {
                type: 'order',
                target: ongoing.id,
                amount: orderPayable(ongoing),
                changes: {
                    'Items added': additions.map(i => i.name + ' × ' + i.qty).join(', '),
                    'New order total': money(orderPayable(ongoing))
                }
            });
            cart = {};
            draftOrderId = null;
            currentTable = tableNo;
            save();
            go('tables');
            toast('Items added. ' + t.name + ' total is now ' + money(orderPayable(ongoing)) + '.');
            return;
        }
        const order = {
            id: orderSequence(),
            destination: 'table',
            room: null,
            table: tableNo,
            items: additions,
            status: 'pending',
            created: new Date().toISOString(),
            staff: employeeLabel(),
            employeeId: employee()?.id || '',
            paymentMethod: null
        };
        data.orders.unshift(order);
        audit('Created restaurant order ' + order.id + ' at ' + t.name, 'Restaurant Staff', {
            type: 'order',
            target: order.id,
            amount: total(order),
            changes: {
                Table: t.name,
                Items: order.items.map(i => i.name + ' × ' + i.qty).join(', '),
                Total: money(total(order))
            }
        });
        cart = {};
        draftOrderId = null;
        currentTable = tableNo;
        save();
        go('tables');
        toast('Order saved. ' + t.name + ' is now occupied. Add items any time before the bill.');
    }
    function tableBill(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o || o.destination !== 'table')
            return;
        if (o.status === 'pending') {
            openTable(o.table);
            toast('Only choose payment after marking the table ready for the bill.');
            return;
        }
        if (o.status !== 'awaiting_payment')
            return;
        showModal('Final bill · ' + esc(tableName(o.table)), 'Guests now choose how to settle the order.', `<div class="muted-panel"><div class="item-line"><strong>Order #${esc(o.id)}</strong>${badge(o.status)}</div>${o.items.map(i => `<div class="item-line"><span>${esc(i.name)} × ${i.qty}</span><strong>${money(i.price * i.qty)}</strong></div>`).join('')}${discountEntries(o).length?`<div class="discount-bill-breakdown">${discountEntries(o).map(d=>`<div><span>${esc(d.type)} · ${esc(d.name)}</span><strong>−${money(discountMoney(d.vatRelief+d.discountAmount))}</strong></div>`).join('')}</div>`:''}<div class="checkout-total"><strong>Restaurant total after discounts</strong><b>${money(orderPayable(o))}</b></div></div><div class="notice">Ask the guests now: pay at the restaurant or post this bill to their active resort room? Nothing has been charged to a room yet.</div>`, `${btn('Back to Table', 'open-table', { id: o.table })}${btn('Apply Discount', 'discount-order', {id:o.id})}${btn('Pay at Restaurant', 'cash-pay', { id: o.id })}${btn('Post to Guest Room', 'choose-post-room', { id: o.id, primary: true })}`);
    }
    function postTableToRoom(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o || o.destination !== 'table' || o.status !== 'awaiting_payment')
            return;
        const stays = data.stays.filter(s => s.active);
        showModal('Post Restaurant Bill to Room', 'Confirm an active guest stay before posting this bill.', `<div class="muted-panel"><div class="item-line"><strong>${esc(tableName(o.table))} · Order #${esc(o.id)}</strong>${badge(o.status)}</div><div class="checkout-total"><strong>Restaurant bill</strong><b>${money(orderPayable(o))}</b></div></div><form id="post-table-form"><input type="hidden" name="orderId" value="${esc(o.id)}"><div class="field"><label>Occupied guest room</label><select class="select" name="room" required><option value="">Choose an active room...</option>${stays.map(s => `<option value="${s.room}">${roomLabel(s.room)} · ${esc(s.name || 'Guest')}</option>`).join('')}</select></div><div class="notice warning">Check that guests have authorized posting to this room. Front Desk will later settle this room charge.</div><div class="modal-inline-footer">${btn('Back to Bill', 'table-bill', { id: o.id })}<button class="btn primary" type="submit" ${!stays.length ? 'disabled' : ''}>Confirm Posting to Room</button></div></form>`);
    }
    function editTable(id) {
        const t = data.tables.find(x => x.id === String(id));
        showModal(t ? 'Edit Restaurant Table' : 'Add Restaurant Table', 'Admin configures table names and availability.', `<form id="table-form"><input type="hidden" name="id" value="${esc(t?.id || '')}"><div class="field"><label>Table number / identifier</label><input class="input" name="number" required maxlength="20" value="${esc(t?.id || '')}" placeholder="e.g. 13" ${t ? 'readonly' : ''}></div><div class="field"><label>Display name</label><input class="input" name="name" required maxlength="60" value="${esc(t?.name || '')}" placeholder="e.g. Patio Table 13"></div><div class="field"><label>Availability</label><select class="select" name="active"><option value="true" ${t?.active !== false ? 'selected' : ''}>Active</option><option value="false" ${t?.active === false ? 'selected' : ''}>Inactive</option></select></div><div class="notice">Occupied and waiting-for-payment tables cannot be disabled. Existing order history keeps its table reference.</div><button class="btn primary full" type="submit" style="margin-top:20px">Save Table</button></form>`);
    }
    function editCatalog(type, id) {
        const arr = type === 'menu' ? data.menu : data.services, item = arr.find(x => x.id === Number(id));
        showModal(item ? 'Edit ' + (type === 'menu' ? 'Menu Item' : 'Service') : 'Add ' + (type === 'menu' ? 'Menu Item' : 'Service'), 'Admin catalog configuration', `<form id="catalog-form"><input type="hidden" name="type" value="${type}"><input type="hidden" name="id" value="${item?.id || ''}"><div class="field"><label>Name</label><input class="input" name="name" required value="${esc(item?.name || '')}"></div>
 ${type === 'menu' ? `<div class="field"><label>Category</label><select class="select" name="category" required>${data.categories.filter(c => c.active || c.name === item?.category).map(c => `<option value="${esc(c.name)}" ${c.name === (item?.category || 'Main Dishes') ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></div><div class="field"><label>Permanent food description</label><textarea class="textarea" name="description" maxlength="500" placeholder="Ingredients, chili content or preparation notes">${esc(item?.description || '')}</textarea></div>${imageField(item?.imageId || '')}` : `<div class="form-grid"><div class="field"><label>Pricing unit</label><select class="select" name="unit">${[
            'hour',
            'item',
            'trip',
            'kg',
            'night',
            'flat'
        ].map(u => `<option ${item?.unit === u ? 'selected' : ''}>${u}</option>`).join('')}</select></div><div class="field"><label>Additional units / duration field</label><select class="select" id="catalog-units-toggle" name="requiresUnits"><option value="false" ${!item?.requiresUnits ? 'selected' : ''}>Not needed • quantity only</option><option value="true" ${item?.requiresUnits ? 'selected' : ''}>Yes • add extra field</option></select></div></div><div class="field" id="catalog-units-label-wrap" ${item?.requiresUnits ? '' : 'hidden'}><label>Field label shown to Front Desk</label><input class="input" name="unitsLabel" value="${esc(item?.unitsLabel || 'Duration (hours)')}" placeholder="e.g. Rental duration (hours)"></div><p class="hint">Example: Extra Towels uses only quantity. Motorbike Rental uses quantity AND rental duration.</p>`}
 <div class="field"><label>Statutory discount eligibility</label><select class="select" name="statutoryEligible"><option value="true" ${item?.statutoryEligible===true || (!item && type==='menu') ? 'selected':''}>Eligible qualifying item / service</option><option value="false" ${item?.statutoryEligible===false || (!item && type==='service') ? 'selected':''}>Not eligible</option></select><small class="text-muted">Classify only after checking applicable statutory rules. Services are not presumed eligible.</small></div><div class="field"><label>Rate / Price (₱)</label><input class="input" name="rate" type="number" step="0.01" min="0" required value="${item?.price ?? item?.rate ?? 0}"></div><div class="field"><label>Status</label><select class="select" name="active"><option value="true" ${item?.active !== false ? 'selected' : ''}>Active</option><option value="false" ${item?.active === false ? 'selected' : ''}>Inactive</option></select></div><button type="submit" class="btn primary full">Save</button></form>`);
    }
    function itemRemovePlan(kind, id) {
        if (![
            'room',
            'table',
            'menu',
            'service'
        ].includes(kind))
            return null;
        const arr = kind === 'room' ? data.rooms : kind === 'table' ? data.tables : kind === 'menu' ? data.menu : data.services;
        const item = arr.find(x => String(x.id) === String(id));
        if (!item)
            return null;
        const label = kind === 'room' ? roomLabel(item.id) : item.name;
        const inUse = kind === 'room' ? !!stayFor(item.id) : kind === 'table' ? tableOpenOrders(item.id).length > 0 : false;
        const historic = kind === 'room' ? data.stays.some(s => Number(s.room) === Number(id)) : kind === 'table' ? data.orders.some(o => String(o.table) === String(id)) : kind === 'menu' ? data.orders.some(o => o.items.some(i => Number(i.id) === Number(id))) : data.charges.some(c => c.source === 'service' && (String(c.sourceId) === String(id) || String(c.label).startsWith(item.name)));
        return {
            kind,
            id,
            item,
            label,
            inUse,
            historic,
            action: 'Deactivate',
            arr
        };
    }
    function removeItemPrompt(value) {
        if (role !== 'admin')
            return;
        const idx = String(value).indexOf(':');
        if (idx < 0)
            return;
        const kind = value.slice(0, idx), id = value.slice(idx + 1), plan = itemRemovePlan(kind, id);
        if (!plan)
            return;
        const { label, inUse, historic, action } = plan;
        const detail = inUse ? 'This record is in active use. Finish the current stay or order before deactivation.' : 'This record will be marked Inactive, not deleted. Historical records and the ability to reactivate are preserved.';
        showModal(action + ' ' + esc(label), 'Admin · safe system management', `<div class="notice ${inUse ? 'warning' : ''}">${esc(detail)}</div><form id="remove-item-form"><input name="kind" type="hidden" value="${esc(kind)}"><input name="id" type="hidden" value="${esc(id)}"><div class="field section-space"><label>Reason for ${action.toLowerCase()} *</label><textarea name="reason" class="textarea" minlength="5" required placeholder="Explain why this change is needed" ${inUse ? 'disabled' : ''}></textarea></div><div class="modal-inline-footer">${btn('Cancel', 'modal-close')}<button class="btn danger" type="submit" ${inUse ? 'disabled' : ''}>${action} ${esc(label)}</button></div></form>`);
    }
    function applyRemoval(kind, id, reason) {
        if (role !== 'admin')
            return false;
        const plan = itemRemovePlan(kind, id);
        if (!plan || plan.item.active === false || plan.inUse || String(reason).trim().length < 5) {
            toast('Cannot remove this item. Check active transactions and provide a reason.', true);
            return false;
        }
        plan.item.active = false;
        audit(`Deactivated ${kind} ${plan.label}`, 'Admin', {
            type: 'remove',
            module: 'System Management',
            target: plan.label,
            reason: String(reason).trim(),
            changes: {
                Action: plan.action,
                Reference: kind + ' #' + id,
                'Historical records': plan.historic ? 'Preserved' : 'None'
            }
        });
        notify(['admin'], `Deactivated ${plan.label}`, `Admin changed ${kind} configuration. History preserved.`, { kind: 'info', route: 'audit' });
        if (kind === 'menu' || kind === 'table')
            notify(['restaurant'], `Deactivated ${plan.label}`, 'Restaurant configuration has changed.', { kind: 'info', route: kind === 'table' ? 'tables' : 'orders' });
        if (kind === 'service' || kind === 'room')
            notify(['frontdesk'], `Deactivated ${plan.label}`, 'Front Desk configuration has changed.', { kind: 'info', route: 'rooms' });
        save();
        closeModal();
        render();
        toast('Item deactivated. Historical records preserved.');
        return true;
    }
    const navAction = action => {
        if (action.startsWith('nav-')) {
            go(action.slice(4));
            return true;
        }
        return false;
    };
    document.addEventListener('click', e => {
        const nav = e.target.closest('[data-nav]');
        if (nav) {
            if (nav.dataset.nav === 'help' && document.querySelector('#modal-root .modal')) {
                helpOpen();
                return;
            }
            closeModal();
            if (nav.dataset.nav === 'charges')
                chargesTab = 'unpaid';
            if (nav.dataset.nav === 'roomcharges')
                roomChargesTab = 'charges';
            if (nav.dataset.nav === 'help' && route !== 'help') {
                helpCaptureDraft();
                helpReturnRoute = route;
                helpQuery = '';
                helpSelected = '';
                helpCategory = 'all';
            }
            if (nav.dataset.nav === 'tickets') ticketFocusFromSidebar();
            go(nav.dataset.nav);
            return;
        }
        const el = e.target.closest('[data-action]');
        if (!el)
            return;
        const act = el.dataset.action, id = el.dataset.id;
        if (featureAction(act, id)) return;
        if (act.startsWith('notify-')) {
            if (act === 'notify-toggle') {
                bellOpen = !bellOpen;
                notificationShow = 'all';
                syncBell();
            }
            else if (act === 'notify-filter') {
                notificationShow = id === 'unread' ? 'unread' : 'all';
                syncBell();
            }
            else if (act === 'notify-read-all') {
                data.notifications.filter(n => n.role === role).forEach(n => n.read = true);
                save();
                syncBell();
            }
            else if (act === 'notify-open') {
                const n = data.notifications.find(n => n.id === id && n.role === role);
                if (n)
                    notifyNavigate(n);
            }
            return;
        }
        if (act.startsWith('help-')) {
            if (act === 'help-open')
                helpOpen();
            else if (act === 'help-close')
                helpClose();
            else if (act === 'help-tip')
                helpOpen(id);
            else if (act === 'help-article')
                helpArticleOpen(id);
            else if (act === 'help-back') {
                helpSelected = '';
                if (helpMode === 'panel') { smartView = smartAnswerBeforeArticle; helpRenderRoot(); }
                else
                    document.getElementById('help-center-detail').innerHTML = '<div class="help-center-placeholder"><h3>Choose a help topic</h3><p>Choose a question from the list to read its instructions.</p></div>';
            }
            else if (act === 'help-full') { smartView = 'library';smartLibrarySection='articles'; helpSelected = ''; helpRenderRoot(); }
            else if (act === 'help-context') {
                helpPanelLibrary = false; smartView = 'home';
                helpSelected = ''; helpQuery = ''; helpCategory = 'all';
                helpRenderRoot();
            }
            else if (act === 'help-return')
                helpReturn();
            else if (act === 'help-category') {
                helpCategory = id;
                helpSelected = '';
                if (helpMode === 'panel') helpRenderRoot();
                else render();
            }
            else if (act === 'help-go')
                helpGoPage(id);
            else if (act === 'help-smart-workspace')
                smartSwitchWorkspace(id);
            else if (act === 'help-restart')
                helpStartGuide();
            else if (act === 'help-guide-skip')
                helpFinishGuide();
            else if (act === 'help-adaptive-start') smartGuideStart(id,'show');
            else if (act === 'help-adaptive-jump') smartGuideStart(id,'jump');
            else if (act === 'help-adaptive-pause') smartGuidePause();
            else if (act === 'help-adaptive-exit' || act === 'help-adaptive-complete') smartGuideExit();
            else if (act === 'help-adaptive-resume') smartGuideResume();
            else if (act === 'help-adaptive-forget') {smartGuidePaused=null;smartGuidePersist();helpRenderRoot();}
            else if (act === 'help-adaptive-check') smartGuideSync();
            else if (act === 'help-adaptive-article') smartGuideReadArticle();
            else if (act === 'help-adaptive-inline-read') smartGuideInlineRead();
            else if (act === 'help-explore-start') smartExploreStart();
            else if (act === 'help-explore-exit') smartExploreEnd(true);
            else if (act === 'help-explore-pick') smartExplorePick(id);
            else if (act === 'help-explore-dismiss') {smartExploreSelected=-1;smartExploreRender();}
            else if (act === 'help-explore-next') smartExplorePick(smartExploreSelected+1);
            else if (act === 'help-explore-prev') smartExplorePick(smartExploreSelected-1);
            else if (act === 'help-explore-guide') smartExploreLaunchGuide();
            else if (act === 'help-explore-article') smartExploreReadArticle();
            else if (act === 'help-smart-support') smartSupportStart();
            else if (act === 'help-smart-tab' && ['home','ask','guides','library','articles','troubleshoot','activity'].includes(id)) { const next={'articles':'articles','troubleshoot':'fixes','activity':'recent'}[id]; if(next){smartLibrarySection=next;smartView='library';}else smartView=id;helpSelected='';helpQuery='';helpCategory='all';helpRenderRoot(); }
            else if (act === 'help-smart-library' && ['articles','fixes','recent'].includes(id)) {smartLibrarySection=id;helpQuery='';helpCategory='all';helpRenderRoot();}
            else if (act === 'help-guide-section' && ['tasks','find'].includes(id)) {smartGuideSection=id;helpRenderRoot();}
            else if (act === 'help-semantic-debug' && smartSemanticDebugEnabled()){smartView='diagnostics';helpSelected='';helpRenderRoot();}
            else if (act === 'help-semantic-test' && smartSemanticDebugEnabled())void smartSemanticDiagnosticsRun();
            else if (act === 'help-semantic-copy' && smartSemanticDebugEnabled())void smartSemanticCopyReport();
            else if (act === 'help-benchmark-run' && smartSemanticDebugEnabled())void smart72Run(id);
            else if (act === 'help-benchmark-classic' && smartSemanticDebugEnabled())void smart72RunClassic(id);
            else if (act === 'help-benchmark-stop' && smartSemanticDebugEnabled()){smart72Cancel=true;toast('Benchmark will stop after the current batch.');}
            else if (act === 'help-benchmark-download' && smartSemanticDebugEnabled())smart72Download();
            else if (act === 'help-benchmark-copy' && smartSemanticDebugEnabled())void smart72Copy();
            else if (act === 'help-smart-expand') {const previous=document.getElementById('smart2-scroll')?.scrollTop||0;smartHelpExpanded=!smartHelpExpanded;helpRenderRoot();const scroller=document.getElementById('smart2-scroll');if(scroller)scroller.scrollTop=previous;}
            else if (act === 'help-smart-question') smartRunQuestion(id);
            else if (act === 'help-smart-prompt-category' && ['foryou','staff','payments','restaurant','settings'].includes(id)) { smartAskCategory=id; helpRenderRoot(); }
            else if (act === 'help-smart-reset') { smartSemanticRunId++;smartQuestion='';smartAnswer=null;smartAskDraft='';smartLastNlpTopic='';smart744LastVerified=null;smart744Transcript=[];smart73AskStatus=null;smartSemanticState='idle';smartSemanticMessage='';smartSemanticLastRanking=null;helpRenderRoot();document.getElementById('smart-question-ask')?.focus(); }
            return;
        }
        if (navAction(act)) {
            closeModal();
            return;
        }
        switch (act) {
            case 'fd-room-filter':
                if (role === 'frontdesk' && ['all','vacant','occupied','unpaid'].includes(id)) { fdRoomFilter=id; render(); }
                break;
            case 'fd-room-reset':
                fdRoomFilter='all'; search=''; render();
                break;
            case 'fd-stay-filter':
                if (role === 'frontdesk' && ['active','due','history'].includes(id)) { fdStayFilter=id; render(); }
                break;
            case 'fd-stay-reset':
                fdStayFilter='active'; search=''; render();
                break;
            case 'charges-tab':
                if (role === 'frontdesk' && route === 'charges' && ['unpaid', 'services'].includes(id)) {
                    chargesTab = id;
                    render();
                }
                break;
            case 'roomcharges-tab':
                if (role === 'restaurant' && route === 'roomcharges' && ['charges', 'posts'].includes(id)) {
                    roomChargesTab = id;
                    render();
                }
                break;
            case 'toggle-menu':
                mobile = !mobile;
                render();
                break;
            case 'ticket-create':
                openNewTicket();
                break;
            case 'ticket-view':
                openTicket(id);
                break;
            case 'ticket-reopen':
                reopenTicket(id);
                break;
            case 'ticket-view-all':
                ticketFilters.attention = 'all';
                render();
                break;
            case 'ticket-select-view':
                ticketFilters.view = role === 'admin' && id === 'resolved' ? 'resolved' : id === 'shared' ? 'shared' : role === 'admin' ? 'all' : 'mine';
                ticketFilters.attention = 'all';
                ticketFilters.status = 'all';
                render();
                break;
            case 'ticket-view-attention':
                ticketFilters.attention = 'needs';
                ticketFilters.view = role === 'admin' ? 'all' : 'mine';
                render();
                break;
            case 'ticket-clear-filters':
                ticketFilters = { query: '', status: 'all', category: 'all', priority: 'all', department: 'all', attention: 'all', view: role === 'admin' ? 'all' : 'mine' };
                render();
                break;
            case 'view-audit':
                showAuditDetails(id);
                break;
            case 'audit-export':
                exportAuditCsv();
                break;
            case 'audit-clear':
                auditFilters = {
                    query: '',
                    module: 'all',
                    type: 'all',
                    staff: 'all',
                    from: '',
                    to: ''
                };
                auditPageNum = 1;
                render();
                break;
            case 'audit-prev':
                if (auditPageNum > 1) {
                    auditPageNum--;
                    render();
                }
                break;
            case 'audit-next':
                if (auditPageNum < Math.ceil(auditMatches().length / 15)) {
                    auditPageNum++;
                    render();
                }
                break;
            case 'close-menu':
                mobile = false;
                render();
                break;
            case 'switch-frontdesk-dashboard':
                setRole('frontdesk');
                go('dashboard');
                break;
            case 'switch-restaurant-dashboard':
                setRole('restaurant');
                go('dashboard');
                break;
            case 'modal-close':
                closeModal();
                break;
            case 'modal-backdrop':
                break;
            case 'register-stay':
                registerStay();
                break;
            case 'register-room':
                registerStay(id);
                break;
            case 'view-stay':
                viewStay(id);
                break;
            case 'view-charges':
            case 'modal-charges':
                viewCharges(id);
                break;
            case 'pay-charge': {
                const c = data.charges.find(x => x.id === id);
                if (c)
                    checkoutStay(c.stayId);
                break;
            }
            case 'checkout-stay':
                checkoutStay(id);
                break;
            case 'payment-continue-checkout':
                checkoutStay(id);
                break;
            case 'payment-return-tables':
                closeModal();
                go('tables');
                break;
            case 'quick-print-receipt': {
                const format = document.getElementById('success-receipt-format')?.value || '80';
                openReceiptPrint('payment', id, format);
                break;
            }
            case 'quick-print-bill':
                openReceiptPrint('bill', id, '80');
                break;
            case 'confirm-checkout': {
                const st = data.stays.find(x => x.id === id);
                if (!st || !st.active)
                    return;
                if (dueForStay(id) > .001) {
                    checkoutStay(id);
                    toast('Record the remaining payment before checking out.', true);
                    return;
                }
                st.active = false;
                audit('Checked out ' + roomLabel(st.room), 'Front Desk', {
                    type: 'checkout',
                    target: roomLabel(st.room),
                    changes: { 'Stay status': 'Active → Checked out' },
                    note: 'No remaining incidental charges at checkout'
                });
                save();
                closeModal();
                render();
                toast('Checkout completed.');
                break;
            }
            case 'open-table':
                openTable(id);
                break;
            case 'new-for-table':
                cart = {};
                draftOrderId = null;
                currentTable = String(id);
                closeModal();
                go('neworder');
                break;
            case 'table-add-items': {
                const o = tableOpenOrders(id).find(x => x.status === 'pending');
                if (!o) {
                    toast('Bill is already ready. Finish this bill first.', true);
                    return;
                }
                cart = {};
                draftOrderId = null;
                currentTable = o.table;
                closeModal();
                go('neworder');
                break;
            }
            case 'table-ready': {
                const arr = tableOpenOrders(id);
                if (!arr.length)
                    return;
                if (arr.length > 1) {
                    toast('Multiple open orders found. Review this table before changing its status.', true);
                    return;
                }
                if (arr[0].status !== 'pending') {
                    toast('This table is already waiting for payment.', true);
                    return;
                }
                arr[0].status = 'awaiting_payment';
                audit('Table ' + tableName(id) + ' is ready for payment', 'Restaurant Staff', {
                    type: 'order',
                    target: tableName(id),
                    changes: { 'Order status': 'Dining → Waiting for payment' }
                });
                save();
                render();
                openTable(id);
                toast('Table is now Waiting for Payment.');
                break;
            }
            case 'table-resume': {
                const o = tableOpenOrders(id).find(x => x.status === 'awaiting_payment');
                if (o) {
                    o.status = 'pending';
                    audit('Dining resumed for ' + tableName(id), 'Restaurant Staff', {
                        type: 'order',
                        target: tableName(id),
                        changes: { 'Order status': 'Waiting for payment → Dining' }
                    });
                    save();
                    render();
                    openTable(id);
                    toast('Table is dining again. You can add more items.');
                }
                break;
            }
            case 'table-settle': {
                const o = tableOpenOrders(id).find(x => x.status === 'awaiting_payment');
                if (o)
                    tableBill(o.id);
                break;
            }
            case 'promotion-new': promotionForm(); break;
            case 'promotion-edit': promotionForm(id); break;
            case 'table-bill':
                tableBill(id);
                break;
            case 'discount-order':
                discountForm(data.orders.find(o=>o.id===id));
                break;
            case 'late-discount': {
                const charge=data.charges.find(c=>c.id===id);
                if(!charge || charge.source!=='restaurant' || Number(charge.paid||0)>.001 || charge.status!=='unpaid'){toast('Only fully unpaid restaurant room charges can be adjusted here.',true);break;}
                discountForm(data.orders.find(o=>o.id===charge.sourceId),charge);
                break;
            }
            case 'choose-post-room':
                postTableToRoom(id);
                break;
            case 'view-order':
                viewOrder(id);
                break;
            case 'cash-pay':
                cashPay(id);
                break;
            case 'confirm-cash': {
                const o = data.orders.find(x => x.id === id);
                if (!o || o.destination !== 'table' || o.status !== 'awaiting_payment') return;
                const form = document.getElementById('restaurant-pay-form');
                const calc = paymentMath(form);
                if (!calc.valid || Math.abs(calc.amount - orderPayable(o)) > .001) { toast('Restaurant bills must be paid in full. Check the amount received and payment method.', true); return; }
                const payMethod = calc.method;
                o.status = 'paid';
                o.paymentMethod = payMethod.name;
                o.settledAt = new Date().toISOString();
                o.staffPaidBy = employeeLabel();
                o.paymentRecordId = recordPayment({ area: 'restaurant', method: payMethod.name, methodType: isCashMethod(payMethod) ? 'cash' : 'noncash', billTotal: orderPayable(o), grossBill: total(o), dueBefore: orderPayable(o), amount: orderPayable(o), tendered: calc.tendered, change: calc.change, orderId: o.id, table: o.table, room: null, stayId: null, items: discountAdjustedItems(o), discountSummary:orderDiscountSummary(o), taxDetails:orderTaxDetails(o) }).id;
                audit('Received restaurant ' + o.paymentMethod + ' payment for ' + o.id + ' (' + money(orderPayable(o)) + ')', 'Restaurant Staff', {
                    type: 'payment',
                    module: 'Restaurant',
                    target: o.id,
                    amount: orderPayable(o),
                    method: o.paymentMethod,
                    changes: { Status: 'Waiting for payment → Paid', Table: tableName(o.table) }
                });
                save();
                closeModal();
                go('tables');
                paymentSuccess(o.paymentRecordId);
                toast('Payment saved. ' + tableName(o.table) + ' is available.');
                break;
            }
            case 'void-order':
                voidOrder(id);
                break;
            case 'edit-order': {
                const o = data.orders.find(x => x.id === id);
                if (!o || o.status !== 'pending')
                    return;
                cart = {};
                currentTable = o.table || '01';
                draftOrderId = null;
                closeModal();
                go('neworder');
                break;
            }
            case 'rs-table-filter':
                restaurantTableFilter = ['all','vacant','occupied','waiting'].includes(id) ? id : 'all';
                render();
                break;
            case 'menu-category':
                menuCategory = id;
                render();
                break;
            case 'menu-category-back':
                menuCategory = null;
                render();
                break;
            case 'cart-plus':
                cart[id] = (cart[id] || 0) + 1;
                render();
                break;
            case 'cart-minus':
                cart[id] = Math.max(0, (cart[id] || 0) - 1);
                render();
                break;
            case 'add-menu':
                editCatalog('menu');
                break;
            case 'edit-menu':
                editCatalog('menu', id);
                break;
            case 'add-catalog-service':
                editCatalog('service');
                break;
            case 'edit-catalog-service':
                editCatalog('service', id);
                break;
            case 'add-table':
                editTable();
                break;
            case 'remove-item':
                removeItemPrompt(id);
                break;
            case 'restore-room': {
                if (role !== 'admin')
                    break;
                const r = data.rooms.find(r => String(r.id) === String(id));
                if (r && r.active === false) {
                    r.active = true;
                    audit('Restored ' + roomLabel(r.id), 'Admin', {
                        type: 'update',
                        target: roomLabel(r.id),
                        changes: { Status: 'Inactive → Active' }
                    });
                    save();
                    render();
                    toast('Room activated.');
                }
                break;
            }
            case 'edit-table':
                editTable(id);
                break;
            case 'add-room':
                showModal('Add Room', 'Admin room inventory management', `<form id="add-room-form"><div class="field"><label>Room number</label><input class="input" type="number" name="number" min="1" required></div><button class="btn primary full" type="submit">Add Room</button></form>`);
                break;
            default: break;
        }
    });
    document.addEventListener('wheel', () => {
        const active = document.activeElement;
        if (active?.matches('input[data-payment-amount]')) active.blur();
    }, { capture: true, passive: true });
    document.addEventListener('keydown', e => {
        if(e.target.matches('.smart-ask-composer textarea[name=q]') && e.key==='Enter' && !e.shiftKey && !e.isComposing){e.preventDefault();if(e.target.value.trim())e.target.form?.requestSubmit();}
    });
    document.addEventListener('submit', e => {
        if(e.target.id!=='smarthelp-question-form') return;
        e.preventDefault();
        smartRunQuestion(e.target.querySelector('[name="q"]')?.value || '');
    });
    document.addEventListener('input', e => {
        if (e.target.closest('#feature-receipt-form')) updateReceiptPreviewSelect(e.target);
    });
    document.addEventListener('change', async e => {
        if (e.target.matches('#success-receipt-format,#history-receipt-format,#branding-preview-area,#branding-preview-format')) { updateReceiptPreviewSelect(e.target); return; }
        if (e.target.matches('[data-rb-switch]')) { rbSwitch(e.target); return; }
        if (e.target.matches('[data-rb-saved-copy]')) { if (e.target.value) rbAction('rb-load-copy',e.target.value); return; }
        if (e.target.matches('[data-rb-prop]')) { rbUpdateProp(e.target); if (!['text','label','leftLabel','rightLabel','url'].includes(e.target.dataset.rbProp)) render(); return; }
        if (e.target.matches('[data-receipt-date]')) { if (e.target.dataset.receiptDate === 'from') receiptArchiveFrom = e.target.value; else receiptArchiveTo = e.target.value; render(); return; }
        if (e.target.closest('[data-payment-calculator]')) updatePaymentCalculator(e.target.closest('[data-payment-calculator]'));
        if (e.target.matches('[data-asset-file]')) {
            const el = e.target, form = el.closest('form');
            try {
                el.disabled = true;
                const id = await saveImage(el.files[0]);
                const hidden = form?.querySelector('[name=imageId], [name=logoId]');
                if (hidden) hidden.value = id;
                const preview = form?.querySelector('#asset-preview');
                if (preview) preview.innerHTML = assetImg(id, 'asset-thumb');
                toast('Photo saved locally. Save the form to attach it.');
            } catch (error) { toast(error.message || 'Image upload failed.', true); }
            finally { el.disabled = false; }
            return;
        }
        if (e.target.id === 'employee-switch') {
            const chosen = data.employees.find(x => x.id === e.target.value && x.active);
            if (!chosen) return;
            currentEmployeeId = chosen.id;
            sessionStorage.setItem('resortOS-demo-employee', currentEmployeeId);
            closeModal();
            setRole(chosen.access.includes(role) ? role : chosen.role);
        }
        else if (e.target.id === 'role-switch') {
            closeModal();
            setRole(e.target.value);
        }
        else if (e.target.matches('[data-filter]')) {
            filter = e.target.value;
            render();
        }
        else if (e.target.matches('[data-ticket-filter]')) {
            ticketFilters[e.target.dataset.ticketFilter] = e.target.value;
            render();
        }
        else if (e.target.matches('[data-audit-filter]')) {
            auditFilters[e.target.dataset.auditFilter] = e.target.value;
            auditPageNum = 1;
            render();
        }
        else if (e.target.id === 'ticket-category') {
            const field = document.getElementById('ticket-location-field');
            const location = document.getElementById('ticket-location');
            const needed = e.target.value === 'operational';
            if (field) field.hidden = !needed;
            if (location) location.required = needed;
            const suggested = ticketDefaultVisibility(e.target.value);
            const input = document.querySelector(`#ticket-create-form input[name="visibility"][value="${suggested}"]`);
            if (input) input.checked = true;
            syncTicketVisibilityInfo();
        }
        else if (e.target.matches('#ticket-create-form input[name="visibility"]')) {
            syncTicketVisibilityInfo();
        }
        else if (e.target.id === 'manage-ticket-visibility') {
            const original = data.tickets.find(t => t.id === document.querySelector('#ticket-manage-form input[name="id"]')?.value);
            const changed = original && ticketVisibility(original) !== e.target.value;
            const wrap = document.getElementById('ticket-visibility-reason-wrap');
            const reason = document.getElementById('ticket-visibility-reason');
            if (wrap) wrap.hidden = !changed;
            if (reason) reason.required = !!changed;
        }
        else if (e.target.id === 'table-choice') {
            currentTable = e.target.value;
            cart = {};
            menuCategory = null;
            render();
        }
        else if (e.target.id === 'svc-id') {
            syncServiceForm();
        }
        else if (e.target.id === 'catalog-units-toggle') {
            const wrap = document.getElementById('catalog-units-label-wrap');
            if (wrap)
                wrap.hidden = e.target.value !== 'true';
        }
    });
    document.addEventListener('input', e => {
        if(e.target.id==='smart-guide-filter'){
            const q=e.target.value.toLowerCase().trim();let found=0;
            document.querySelectorAll('.smart2-guide-card').forEach(card=>{const matches=!q||card.dataset.guideEntry.toLowerCase().includes(q);card.hidden=!matches;if(matches)found++;});
            const count=document.getElementById('smart-guide-count');if(count)count.textContent=found+' guides';
            const empty=document.getElementById('smart-guide-no-results');if(empty)empty.hidden=!!found;
            return;
        }
        if(e.target.matches('[data-smart-search]')) {
            if(e.target.dataset.smartSearch==='ask'){smartAskDraft=e.target.value; e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,132)+'px';return;}
            helpQuery=e.target.value;
            if(e.target.dataset.smartSearch==='home') {
                const target=document.getElementById('smart-live-results');
                if(target){target.hidden=!helpQuery.trim();target.innerHTML=helpQuery.trim()?smartSearchMarkup(helpQuery):'';}
            }
            if(e.target.dataset.smartSearch==='articles') {
                const target=document.getElementById('smart-article-results');
                if(target) target.innerHTML=helpQuery.trim()?smartSearchMarkup(helpQuery,helpCategory):HELP_ARTICLES.filter(a=>hasAccess(a.role)&&(helpCategory==='all'||a.category===helpCategory)).map(smartTopicMarkup).join('');
            }
            return;
        }
        if (e.target.matches('[data-rb-layout-name]')) { if(rbWorking.name!==e.target.value.slice(0,90)){rbHistory('layout-name');rbWorking.name=e.target.value.slice(0,90);rbDirty=true;rbUpdatePreview();}return; }
        if (e.target.matches('[data-rb-prop]')) { rbUpdateProp(e.target); return; }

        if (e.target.id === 'restaurant-menu-search') {
            const pos = e.target.selectionStart;
            restaurantMenuQuery = e.target.value;
            render();
            const input = document.getElementById('restaurant-menu-search');
            if (input) { input.focus(); if (pos !== null) input.setSelectionRange(pos,pos); }
            return;
        }
        if (e.target.closest('[data-payment-calculator]')) updatePaymentCalculator(e.target.closest('[data-payment-calculator]'));
        if (e.target.matches('[data-help-search]')) {
            helpQuery = e.target.value;
            helpSelected = '';
            if (e.target.dataset.helpSearch === 'panel') {
                const res = document.getElementById('help-panel-results');
                if (res)
                    res.innerHTML = helpPanelLibrary ? helpResultCards(helpResults(helpQuery, helpCategory), true) : helpQuery ? helpResultCards(helpResults(helpQuery, 'all'), true) : helpCurrentContext().ids.map(helpAllowed).filter(Boolean).slice(0, 6).map(a => helpListEntry(a, true)).join('');
            }
            else {
                const res = document.getElementById('help-center-results');
                if (res)
                    res.innerHTML = helpResultCards(helpResults(helpQuery, helpCategory), false);
                const total = document.querySelector('.help-list-heading small');
                if (total)
                    total.textContent = helpResults(helpQuery, helpCategory).length + ' matching articles';
                const detail = document.getElementById('help-center-detail');
                if (detail)
                    detail.innerHTML = '<div class="help-center-placeholder"><h3>Choose a help topic</h3><p>Choose a question from the results to read it here.</p></div>';
            }
            return;
        }
        if (e.target.matches('[data-ticket-search]')) {
            const pos = e.target.selectionStart;
            ticketFilters.query = e.target.value;
            render();
            const input = document.querySelector('[data-ticket-search]');
            if (input) {
                input.focus();
                input.setSelectionRange(pos, pos);
            }
            return;
        }
        if (e.target.matches('[data-audit-search]')) {
            const pos = e.target.selectionStart;
            auditFilters.query = e.target.value;
            auditPageNum = 1;
            render();
            const input = document.getElementById('audit-search');
            if (input) {
                input.focus();
                input.setSelectionRange(pos, pos);
            }
            return;
        }
        if (e.target.matches('[data-search]')) {
            const pos = e.target.selectionStart;
            search = e.target.value;
            render();
            const input = document.querySelector('[data-search]');
            if (input) {
                input.focus();
                input.setSelectionRange(pos, pos);
            }
        }
        if (['svc-qty', 'svc-duration'].includes(e.target.id))
            syncServiceForm();
    });
    document.addEventListener('click', e => {
        if (e.target.id === 'save-order')
            submitOrder();
    });
    document.addEventListener('input', e => {
        if(e.target.closest('#discount-apply-form')) refreshDiscountForm();
    });
    document.addEventListener('change', e => {
        if(e.target.closest('#discount-apply-form')) refreshDiscountForm();
    });
    document.addEventListener('submit', e => {
        const form = e.target, formId = form.getAttribute('id');
        if (!formId)
            return;
        e.preventDefault();
        const v = Object.fromEntries(new FormData(form).entries());
        if (featureSubmit(formId, v)) return;
        switch (formId) {
            case 'discount-apply-form':
                applyDiscountForm(v);
                break;
            case 'promotion-form': {
                if(!adminOnly()){toast('Admin access required.',true);break;}
                const rate=Number(v.rate),name=String(v.name||'').trim();
                if(!name||!Number.isFinite(rate)||rate<=0||rate>100||v.start&&v.end&&v.start>v.end){toast('Enter a valid promotion name, percentage and date range.',true);break;}
                const prior=data.promotions.find(x=>x.id===v.id);
                const scope=String(v.scope||'all');
                if(scope!=='all' && !scope.startsWith('category:') && !scope.startsWith('item:')){toast('Invalid promotion eligibility setting.',true);break;}
                const obj={name,rate:discountMoney(rate),scope,start:v.start||'',end:v.end||'',active:v.active==='true'};
                if(prior)Object.assign(prior,obj);else data.promotions.unshift({id:uid('PROMO'),...obj});
                audit((prior?'Updated':'Created')+' promotion '+name,employeeLabel(),{module:'System Management',type:'update',target:name});
                save();closeModal();render();toast('Promotion saved.');
                break;
            }
            case 'ticket-create-form':
                submitTicket(v);
                break;
            case 'ticket-reply-form':
                replyTicket(v);
                break;
            case 'ticket-manage-form':
                manageTicket(v);
                break;
            case 'ticket-public-update-form':
                publishTicketUpdate(v);
                break;
            case 'remove-item-form': {
                applyRemoval(String(v.kind || ''), String(v.id || ''), String(v.reason || ''));
                break;
            }
            case 'stay-form': {
                const room = Number(v.room);
                if (!activeRooms().some(r => r.id === room)) {
                    toast('This room is unavailable.', true);
                    return;
                }
                if (stayFor(room)) {
                    toast('Room is already occupied.', true);
                    return;
                }
                if (v.checkout < v.checkin) {
                    toast('Checkout date cannot be before check-in.', true);
                    return;
                }
                data.stays.unshift({
                    id: uid('S'),
                    room,
                    name: v.name,
                    checkin: v.checkin,
                    checkout: v.checkout,
                    active: true
                });
                audit('Registered stay for ' + roomLabel(room), 'Front Desk', {
                    type: 'stay',
                    target: roomLabel(room),
                    changes: {
                        Guest: v.name || 'Guest',
                        Checkin: v.checkin,
                        'Expected checkout': v.checkout
                    }
                });
                save();
                closeModal();
                render();
                toast('Guest stay registered.');
                break;
            }
            case 'service-form': {
                const st = stayFor(v.room), sv = data.services.find(s => s.id === Number(v.service));
                if (!st || !sv || !sv.active) {
                    toast('Invalid room or service.', true);
                    return;
                }
                const quantity = Number(v.qty), units = sv.requiresUnits ? Number(v.units) : 1;
                if (!Number.isFinite(quantity) || !Number.isFinite(units) || quantity <= 0 || units <= 0) {
                    toast('Enter valid quantities.', true);
                    return;
                }
                const amount = Math.round(sv.rate * quantity * units * 100) / 100;
                const label = sv.name + (sv.requiresUnits ? ' · Qty ' + quantity + ' × ' + units + ' ' + sv.unit + (units === 1 ? '' : 's') : ' · ' + quantity + ' ' + sv.unit + (quantity === 1 ? '' : 's'));
                data.charges.unshift({
                    id: uid('C'),
                    stayId: st.id,
                    source: 'service',
                    sourceId: sv.id,
                    label,
                    amount,
                    paid: 0,
                    status: 'unpaid',
                    date: new Date().toISOString(),
                    by: 'Front Desk'
                });
                audit('Posted service ' + sv.name + ' to ' + roomLabel(st.room) + ' (' + money(amount) + ')', 'Front Desk', {
                    type: 'posting',
                    target: roomLabel(st.room),
                    amount,
                    changes: {
                        Service: sv.name,
                        Quantity: quantity,
                        'Additional units': sv.requiresUnits ? units : 'Not required',
                        Charge: money(amount)
                    }
                });
                save();
                go('balances');
                toast('Service charge posted.');
                break;
            }
            case 'checkout-pay-form': {
                const st = data.stays.find(s => s.id === v.stayId);
                if (!st || !st.active) {
                    toast('Stay is no longer active.', true);
                    return;
                }
                const outstanding = data.charges.filter(c => c.stayId === st.id && c.status !== 'void' && remain(c) > .001);
                const due = Math.round(outstanding.reduce((sum, c) => sum + remain(c), 0) * 100) / 100;
                const calc = paymentMath(document.getElementById('checkout-pay-form'));
                if (!calc.valid || Math.abs(calc.due - due) > .001) { toast('Check the amount received and payment method.', true); return; }
                const amount = calc.amount;
                const payMethod = calc.method;
                let left = amount, count = 0, allocations = [], restaurantPortion = 0;
                for (const c of outstanding) {
                    if (left < .001)
                        break;
                    const applied = Math.min(Math.round(remain(c) * 100) / 100, left);
                    if (applied <= 0)
                        continue;
                    c.paid = Math.round((Number(c.paid || 0) + applied) * 100) / 100;
                    c.status = remain(c) < .001 ? 'settled' : 'partial';
                    left = Math.round((left - applied) * 100) / 100;
                    count++;
                    allocations.push(c.label + ' (' + money(applied) + ')');
                    if (c.source === 'restaurant') restaurantPortion = Math.round((restaurantPortion + applied) * 100) / 100;
                }
                const payment = recordPayment({ area: 'frontdesk', method: payMethod.name, methodType: isCashMethod(payMethod) ? 'cash' : 'noncash', billTotal: data.charges.filter(c => c.stayId === st.id && c.status !== 'void').reduce((n,c)=>n+Number(c.amount||0),0), dueBefore: due, amount, tendered: calc.tendered, change: calc.change, room: st.room, stayId: st.id, guest: st.name || '', items: roomChargeReceiptItems(data.charges.filter(c => c.stayId === st.id && c.status !== 'void')), discountSummary:combinedChargeDiscounts(data.charges.filter(c => c.stayId === st.id && c.status !== 'void')), taxDetails:combinedChargeTaxes(data.charges.filter(c => c.stayId === st.id && c.status !== 'void')), balance: dueForStay(st.id) });
                if (restaurantPortion > 0)
                    notify(['restaurant'], 'Restaurant room charge payment', `${roomLabel(st.room)} · ${money(restaurantPortion)} received by Front Desk for restaurant charges`, { kind: 'success', route: 'roomcharges' });
                audit('Received ' + money(amount) + ' via ' + payMethod.name + ' for ' + count + ' charge(s) at ' + roomLabel(st.room), 'Front Desk', {
                    type: 'payment',
                    target: roomLabel(st.room),
                    amount,
                    method: payMethod.name,
                    receiptId: payment.id,
                    changes: {
                        'Applied to': allocations.join('; '),
                        'Remaining balance': money(dueForStay(st.id)),
                        ...(calc.change > 0 ? { 'Cash received': peso2(calc.tendered), 'Change returned': peso2(calc.change) } : {})
                    }
                });
                save();
                render();
                paymentSuccess(payment.id);
                toast(dueForStay(st.id) > .001 ? 'Payment saved. Remaining: ' + money(dueForStay(st.id)) : 'Payment saved. Complete checkout when ready.');
                break;
            }
            case 'payment-form': {
                const c = data.charges.find(x => x.id === v.id);
                const calc = paymentMath(document.getElementById('payment-form'));
                if (!c || !calc.valid || Math.abs(calc.due - remain(c)) > .001) { toast('Check the cash received and payment method.', true); return; }
                const amount = calc.amount;
                const payMethod = calc.method;
                c.paid = Math.round((Number(c.paid || 0) + amount) * 100) / 100;
                c.status = remain(c) < .001 ? 'settled' : 'partial';
                const st = data.stays.find(x => x.id === c.stayId);
                const payment = recordPayment({ area: 'frontdesk', method: payMethod.name, methodType: isCashMethod(payMethod) ? 'cash' : 'noncash', billTotal: Number(c.amount), dueBefore: calc.due, amount, tendered: calc.tendered, change: calc.change, room: st?.room, stayId: c.stayId, guest: st?.name || '', items: roomChargeReceiptItems([c]), discountSummary:combinedChargeDiscounts([c]), taxDetails:combinedChargeTaxes([c]), balance: dueForStay(c.stayId) });
                if (c.source === 'restaurant')
                    notify(['restaurant'], 'Restaurant room charge payment', `${c.label} · ${money(amount)} received by Front Desk`, { kind: 'success', route: 'roomcharges' });
                audit('Recorded ' + money(amount) + ' ' + payMethod.name + ' payment for ' + c.label, 'Front Desk', {
                    type: 'payment',
                    target: data.stays.find(s => s.id === c.stayId) ? roomLabel(data.stays.find(s => s.id === c.stayId).room) : c.id,
                    amount,
                    method: payMethod.name,
                    receiptId: payment.id,
                    changes: { Charge: c.label, 'Remaining balance': money(remain(c)), ...(calc.change > 0 ? { 'Cash received': peso2(calc.tendered), 'Change returned': peso2(calc.change) } : {}) }
                });
                save();
                closeModal();
                render();
                paymentSuccess(payment.id);
                toast('Payment recorded. Continue checkout when ready.');
                break;
            }
            case 'post-table-form': {
                const o = data.orders.find(x => x.id === v.orderId), st = stayFor(Number(v.room));
                if (!o || o.destination !== 'table' || o.status !== 'awaiting_payment' || !st) {
                    toast('Choose a valid active room after the table is ready for payment.', true);
                    return;
                }
                if (data.charges.some(c => c.source === 'restaurant' && c.sourceId === o.id && c.status !== 'void')) {
                    toast('This restaurant order has already been posted.', true);
                    return;
                }
                o.destination = 'room';
                o.room = st.room;
                o.status = 'posted';
                o.postedAt = new Date().toISOString();
                data.charges.unshift({
                    id: uid('C'),
                    stayId: st.id,
                    source: 'restaurant',
                    sourceId: o.id,
                    orderItems: o.items.map(item => ({ id: item.id, name: String(item.name), qty: Number(item.qty), price: Number(item.price), statutoryEligible: item.statutoryEligible!==false })),
                    discountSummary: orderDiscountSummary(o),
                    taxDetails:orderTaxDetails(o),
                    label: 'Restaurant order ' + o.id,
                    amount: Math.round(orderPayable(o) * 100) / 100,
                    paid: 0,
                    status: 'unpaid',
                    date: o.postedAt,
                    by: employeeLabel()
                });
                notify(['frontdesk'], 'Restaurant charge posted', `${o.id} · ${roomLabel(st.room)} · ${money(orderPayable(o))}`, { kind: 'info', route: 'rooms', entityId: String(st.room) });
                notify(['admin'], 'New room-posted charge', `${o.id} posted to ${roomLabel(st.room)}`, { kind: 'info', route: 'audit' });
                audit('Posted restaurant bill ' + o.id + ' from ' + tableName(o.table) + ' to ' + roomLabel(st.room) + ' (' + money(orderPayable(o)) + ')', 'Restaurant Staff', {
                    type: 'posting',
                    module: 'Restaurant',
                    target: roomLabel(st.room),
                    amount: orderPayable(o),
                    changes: { Order: o.id, Table: tableName(o.table), 'Posted amount': money(orderPayable(o)) }
                });
                save();
                closeModal();
                go('tables');
                toast('Posted to ' + roomLabel(st.room) + '. Table is now vacant.');
                break;
            }
            case 'void-form': {
                const o = data.orders.find(x => x.id === v.id), reason = (v.reason || '').trim();
                if (!canVoid() || !o || !['pending', 'awaiting_payment', 'posted'].includes(o.status) || reason.length < 5) {
                    toast('A detailed reason is required.', true);
                    return;
                }
                const linked = data.charges.find(c => c.sourceId === o.id && c.source === 'restaurant');
                if (linked && Number(linked.paid) > 0) {
                    toast('Payments recorded. Contact Front Desk first.', true);
                    return;
                }
                data.discountEvents.filter(e=>e.orderId===o.id && !e.reversed).forEach(e=>{e.reversed=true;e.reversedAt=new Date().toISOString();e.reversedBy=employeeLabel();e.reversalReason='Order voided: '+reason;});
                o.status = 'void';
                o.voidReason = reason;
                if (linked)
                    linked.status = 'void';
                if (linked)
                    notify(['frontdesk'], 'Restaurant charge voided', `${o.id} voided. ${reason}`, { kind: 'warning', route: 'balances' });
                notify(['admin'], 'Restaurant order voided', `${o.id} · ${reason}`, { kind: 'warning', route: 'audit' });
                audit('Voided order ' + o.id + ': ' + reason, 'Restaurant Staff', {
                    type: 'void',
                    module: 'Restaurant',
                    target: o.id,
                    reason,
                    changes: {
                        Status: 'Open/Posted → Voided',
                        Room: o.room ? roomLabel(o.room) : 'Table ' + o.table
                    }
                });
                save();
                closeModal();
                render();
                toast('Order voided and recorded in audit log.');
                break;
            }
            case 'catalog-form': {
                const arr = v.type === 'menu' ? data.menu : data.services, item = arr.find(x => x.id === Number(v.id));
                const rate = Number(v.rate);
                if (v.type === 'menu' && !data.categories.some(c => c.name === v.category && (c.active || item?.category === c.name))) { toast('Select an available category.', true); return; }
                if (!v.name.trim() || !Number.isFinite(rate) || rate < 0) {
                    toast('Name or price is invalid.', true);
                    return;
                }
                const entry = {
                    id: item?.id || Math.max(0, ...arr.map(x => x.id)) + 1,
                    name: v.name.trim(),
                    active: v.active === 'true',
                    statutoryEligible: v.statutoryEligible === 'true',
                    ...(v.type === 'menu' ? { category: v.category.trim(), price: rate, description: String(v.description || '').trim(), imageId: String(v.imageId || '') } : {
                        unit: v.unit,
                        rate,
                        requiresUnits: v.requiresUnits === 'true',
                        unitsLabel: v.requiresUnits === 'true' ? (v.unitsLabel.trim() || 'Extra units per item') : ''
                    })
                };
                const original = item ? { ...item } : null;
                if (item)
                    Object.assign(item, entry);
                else
                    arr.push(entry);
                const trackedChanges = {
                    Name: entry.name,
                    Price: money(rate),
                    Status: entry.active ? 'Active' : 'Inactive'
                };
                if (original) {
                    if (original.name !== entry.name)
                        trackedChanges['Old name'] = original.name;
                    if ((original.price ?? original.rate) !== rate)
                        trackedChanges['Old price'] = money(original.price ?? original.rate);
                    if (original.active !== entry.active)
                        trackedChanges['Previous status'] = original.active ? 'Active' : 'Inactive';
                }
                if (v.type === 'menu') trackedChanges.Description = entry.description || '(None)';
                if (v.type === 'menu')
                    notify(['restaurant'], 'Restaurant menu updated', `${entry.name}: ${money(rate)} · ${entry.active ? 'Active' : 'Inactive'}`, { kind: 'info', route: 'orders' });
                else
                    notify(['frontdesk'], 'Service catalog updated', `${entry.name}: ${money(rate)}`, { kind: 'info', route: 'addservice' });
                audit((item ? 'Updated ' : 'Added ') + v.type + ' item ' + entry.name, 'Admin', {
                    type: item ? 'update' : 'create',
                    module: 'System Management',
                    target: (v.type === 'menu' ? 'Menu' : 'Service') + ' #' + entry.id,
                    changes: trackedChanges
                });
                save();
                closeModal();
                render();
                toast('Catalog saved.');
                break;
            }
            case 'table-form': {
                const ident = String(v.id || v.number || '').trim(), name = String(v.name || '').trim(), existing = data.tables.find(t => t.id === ident);
                if (!ident || !name) {
                    toast('Enter a table ID and name.', true);
                    return;
                }
                if (!v.id && existing) {
                    toast('This table number already exists.', true);
                    return;
                }
                if (data.tables.some(t => t.name.toLowerCase() === name.toLowerCase() && t.id !== ident)) {
                    toast('Another table already has that name.', true);
                    return;
                }
                if (v.active === 'false' && tableOpenOrders(ident).length) {
                    toast('Finish outstanding table orders before disabling this table.', true);
                    return;
                }
                const previous = existing ? { ...existing } : null;
                if (existing) {
                    existing.name = name;
                    existing.active = v.active === 'true';
                }
                else {
                    data.tables.push({ id: ident, name, active: v.active === 'true' });
                }
                notify(['restaurant'], 'Restaurant tables updated', `${name} · ${v.active === 'true' ? 'Active' : 'Inactive'}`, { kind: 'info', route: 'tables' });
                audit((existing ? 'Updated ' : 'Added ') + name, 'Admin', {
                    type: existing ? 'update' : 'create',
                    module: 'System Management',
                    target: name,
                    changes: {
                        'Table ID': ident,
                        'Display name': name,
                        Availability: v.active === 'true' ? 'Active' : 'Inactive',
                        ...(previous ? {
                            'Previous name': previous.name,
                            'Previous availability': previous.active ? 'Active' : 'Inactive'
                        } : {})
                    }
                });
                save();
                closeModal();
                render();
                toast('Restaurant table saved.');
                break;
            }
            case 'add-room-form': {
                const room = Number(v.number);
                if (!room || data.rooms.some(x => x.id === room)) {
                    toast('Room number already exists or is invalid.', true);
                    return;
                }
                data.rooms.push({ id: room, label: roomLabel(room) });
                data.rooms.sort((a, b) => a.id - b.id);
                notify(['frontdesk'], 'Room inventory updated', `${roomLabel(room)} was added by Admin.`, { kind: 'info', route: 'rooms' });
                audit('Added ' + roomLabel(room), 'Admin', {
                    type: 'create',
                    module: 'System Management',
                    target: roomLabel(room),
                    changes: { 'Room number': room }
                });
                save();
                closeModal();
                render();
                toast('Room added.');
                break;
            }
        }
    });
    document.addEventListener('submit', e => {
        if(e.target.id!=='smart-adaptive-question-form')return;
        e.preventDefault();
        smartGuideInlineAnswer(new FormData(e.target).get('question'));
    });
    document.addEventListener('click', e => {
        if (helpMode !== 'guide') return;
        const steps = helpTours[role], step = steps?.[helpGuideStep];
        const target = step && document.querySelector(step.selector);
        if (!target || !target.contains(e.target)) return;
        if (helpGuideStep === steps.length - 1) {
            helpFinishGuide();
            return;
        }
        requestAnimationFrame(() => {
            if (helpMode !== 'guide') return;
            helpGuideStep++;
            helpShowSpotlight();
        });
    }, true);
    document.addEventListener('click', e => {
        if(helpMode!=='explore')return;
        if(e.target.closest('.smart-explore-layer'))return;
        e.preventDefault();e.stopImmediatePropagation();
    },true);
    document.addEventListener('submit', e => {
        if(helpMode==='adaptive'&&smartGuide&&smartGuides.some(g=>g.id===smartGuide.id&&g.operation))requestAnimationFrame(smartGuideSync);
    });
    document.addEventListener('click', e => {
        if(helpMode!=='adaptive'||!smartGuide)return;
        if(e.target.closest('.smart-adaptive-card,.smart-adaptive-message,.smart-operation-card'))return;
        const nav=e.target.closest('[data-nav],[data-action^="nav-"]');
        if(nav && smartNavigationIsUnsafe(nav.dataset.nav||nav.dataset.action.slice(4))){e.preventDefault();e.stopImmediatePropagation();return;}
        requestAnimationFrame(smartGuideSync);
    }, true);
    window.addEventListener('resize',smartExplorePosition);
    window.addEventListener('scroll',smartExplorePosition,true);
    window.addEventListener('resize', smartGuidePosition);
    window.addEventListener('scroll', smartGuidePosition, true);
    window.addEventListener('resize', helpPositionSpotlight);
    window.addEventListener('scroll', helpPositionSpotlight, true);
    window.addEventListener('storage', e => {
        if (e.key === KEY) {
            const existing = new Set((data.notifications || []).map(n => n.id));
            data = load();
            const newest = data.notifications.find(n => n.role === role && !n.read && !existing.has(n.id));
            if (newest)
                showNotificationToast(newest);
            if (!document.querySelector('.modal-overlay') && helpMode === 'closed') {
                render();
            }
            else {
                syncBell();
                syncTicketSidebar();
            }
        }
    });
    document.addEventListener('click', e => {
        if (bellOpen && !e.target.closest('.notification-button-wrap') && !e.target.closest('.notification-popover')) {
            bellOpen = false;
            syncBell();
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape')
            return;
        if (helpMode === 'panel') {
            e.preventDefault();
            e.stopImmediatePropagation();
            helpClose();
        }
        else if (helpMode === 'guide') {
            e.preventDefault();
            e.stopImmediatePropagation();
            helpFinishGuide();
        }
        else if (helpMode === 'adaptive') {
            e.preventDefault();e.stopImmediatePropagation();smartGuidePause();
        }
        else if (helpMode === 'explore') {
            e.preventDefault();e.stopImmediatePropagation();smartExploreEnd(true);
        }
    }, true);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape')
            closeModal();
    });
    document.addEventListener('dragstart', e => {
        const block = e.target.closest('[data-rb-drag-id]');
        const palette = e.target.closest('[data-rb-palette]');
        if ((block || palette) && e.dataTransfer) { e.dataTransfer.setData('text/plain', block ? 'block:'+block.dataset.rbDragId : 'palette:'+palette.dataset.rbPalette); e.dataTransfer.effectAllowed = 'move'; }
    });
    document.addEventListener('dragover', e => { if (e.target.closest('[data-rb-drag-id], .rb-stack, #rb-preview')) e.preventDefault(); });
    document.addEventListener('drop', e => {
        const target=e.target.closest('[data-rb-drag-id]');
        const stack=e.target.closest('.rb-stack, #rb-preview');
        if (!target && !stack) return;
        e.preventDefault();
        const transfer=e.dataTransfer?.getData('text/plain') || '';
        if (transfer.startsWith('palette:')) { rbAction('rb-add',transfer.slice(8)); return; }
        if (transfer.startsWith('block:') && target) rbMoveDrag(transfer.slice(6),target.dataset.rbDragId);
    });
    save();
    render();
    loadAssets();
    helpStartGuide();
})();
