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
        receiptSettings: { name: 'Your Resort', address: 'Cebu, Philippines', contact: '', footer: 'Thank you for visiting!', logoId: '' },
        paymentRecords: []
    });
    function migrateFeatures(state) {
        const d = extraDefaults();
        if (!Array.isArray(state.paymentMethods)) state.paymentMethods = d.paymentMethods;
        state.paymentMethods.forEach(m => { if (!['cash', 'noncash'].includes(m.type)) m.type = /^cash(?:\s|$)/i.test(String(m.name || '').trim()) ? 'cash' : 'noncash'; });
        if (!Array.isArray(state.categories)) state.categories = d.categories;
        if (!Array.isArray(state.employees)) state.employees = d.employees;
        if (!Array.isArray(state.paymentRecords)) state.paymentRecords = [];
        state.receiptSettings = { ...d.receiptSettings, ...(state.receiptSettings || {}) };
        const names = [...new Set((state.menu || []).map(x => x.category || 'Other'))];
        names.forEach((name, i) => { if (!state.categories.some(c => c.name === name)) state.categories.push({ id: 'CAT-' + (state.categories.length + 1), name, active: true, imageId: '', sort: i }); });
        state.employees.forEach(e => { if (!Array.isArray(e.access)) e.access = e.role === 'admin' ? ['frontdesk', 'restaurant', 'admin'] : [e.role]; e.access = e.role === 'admin' ? ['frontdesk', 'restaurant', 'admin'] : e.access.filter(r => ['frontdesk', 'restaurant'].includes(r)); if (!e.capabilities) e.capabilities = {}; if (e.active === undefined) e.active = true; });
        (state.tickets || []).forEach(t => { if (!Array.isArray(t.resolutionCycles)) t.resolutionCycles = []; if (t.status === 'resolved' && !t.resolvedAt) t.resolvedAt = (t.history || []).filter(x => /resolv/i.test(x.detail || '')).at(-1)?.at || t.updatedAt || t.createdAt; });
        return state;
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
        const payment = { id: nextRecordId('PAY'), at: new Date().toISOString(), employeeId: employee()?.id || '', employeeName: employeeLabel(), receiptBranding: { ...data.receiptSettings }, ...info };
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
        return `<div class="ad-page ad-config-page"><div class="ad-page-header"><div><span class="ad-eyebrow">ADMIN / RECEIPT SETTINGS</span><h1>Every printed detail, <span>on brand.</span></h1><p>Customize the resort identity on thermal and A4 bills and payment acknowledgments.</p></div></div><div class="ad-branding-layout"><section class="ad-panel"><div class="ad-panel-head"><div><span class="ad-section-kicker">PRINT CONFIGURATION</span><h2>Branding information</h2><p>Changes apply to new receipts; saved payment records retain original transaction details.</p></div></div><form id="feature-receipt-form"><div class="field"><label>Resort name</label><input class="input" name="name" maxlength="100" required value="${esc(x.name)}"></div><div class="field"><label>Address</label><input class="input" name="address" maxlength="200" value="${esc(x.address)}"></div><div class="field"><label>Contact details</label><input class="input" name="contact" maxlength="100" value="${esc(x.contact)}"></div><div class="field"><label>Footer message</label><input class="input" name="footer" maxlength="140" value="${esc(x.footer)}"></div>${imageField(x.logoId||'').replace('name="imageId"','name="logoId"')}<button type="submit" class="btn primary">Save Receipt Settings</button></form></section><aside class="ad-panel ad-branding-preview"><span class="ad-section-kicker">RECEIPT PREVIEW</span><div class="ad-receipt-paper"><strong>${esc(x.name||'Your Resort')}</strong><small>${esc(x.address||'Philippines')}</small><span>PAYMENT ACKNOWLEDGMENT</span><div class="ad-receipt-rule"></div><p>Receipt: PAY-XXXXXX<br>Payment: External payment<br>Date: Sample</p><div class="ad-receipt-rule"></div><p>Service charges ........ ₱500.00</p><div class="ad-receipt-rule"></div><b>TOTAL PAID · ₱500.00</b><div class="ad-receipt-rule"></div><small>${esc(x.footer||'Thank you for visiting!')}</small></div><p>Illustrative preview. Actual prints use saved order and payment details and support 58 mm, 80 mm and A4.</p></aside></div></div>`;
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
            showModal(e ? 'Employee Profile' : 'Add Employee', 'Configure operational department access. Admin accounts remain separate.', `<form id="feature-employee-form"><input type="hidden" name="id" value="${esc(e?.id || '')}"><div class="field"><label>Employee full name</label><input class="input" name="name" maxlength="90" required value="${esc(e?.name || '')}"></div><div class="field"><label>Department / position</label><input class="input" name="department" maxlength="90" value="${esc(e?.department || '')}"></div><div class="field"><label>Primary role</label><select class="select" name="role" ${isAdmin ? 'disabled' : ''}><option value="frontdesk" ${primary === 'frontdesk' ? 'selected' : ''}>Front Desk</option><option value="restaurant" ${primary === 'restaurant' ? 'selected' : ''}>Restaurant</option>${isAdmin ? '<option value="admin" selected>Administrator</option>' : ''}</select></div>${isAdmin ? '<div class="notice">This built-in demo Admin account cannot be converted into an employee account.</div>' : `<div class="field"><label>Authorized dashboards</label><label class="check-label"><input type="checkbox" name="frontdesk" ${e?.access.includes('frontdesk') || !e && primary === 'frontdesk' ? 'checked' : ''}> Front Desk</label><label class="check-label"><input type="checkbox" name="restaurant" ${e?.access.includes('restaurant') || !e && primary === 'restaurant' ? 'checked' : ''}> Restaurant</label></div><div class="field"><label>Additional operational permission</label><label class="check-label"><input type="checkbox" name="voidOrder" ${e?.capabilities?.voidOrder !== false ? 'checked' : ''}> May void restaurant orders (only while working in Restaurant)</label></div>`}<div class="field"><label>Account status</label><select class="select" name="active" ${isAdmin ? 'disabled' : ''}><option value="true" ${e?.active !== false ? 'selected' : ''}>Active</option><option value="false" ${e?.active === false ? 'selected' : ''}>Inactive</option></select></div><div class="notice">This is a local demo identity; no password authentication or private staff login is provided.</div></form>`, `<button class="btn" type="button" data-action="modal-close">Cancel</button><button class="btn primary" type="submit" form="feature-employee-form">Save Employee</button>`);
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
        const modern = data.paymentRecords.map(p => ({ kind: 'payment', id: p.id, at: p.at, area: p.area, amount: Number(p.amount || 0), method: p.method || 'Not recorded', employee: p.employeeName || '', location: p.area === 'restaurant' ? 'Table ' + (p.table || '—') : roomLabel(p.room || '—'), orderId: p.orderId || '' }));
        const legacy = data.orders.filter(o => o.status === 'paid' && !o.paymentRecordId).map(o => ({ kind: 'order', id: o.id, at: o.settledAt || o.created, area: 'restaurant', amount: total(o), method: o.paymentMethod || 'Not recorded', employee: o.staffPaidBy || o.staff || '', location: 'Table ' + (o.table || '—'), orderId: o.id }));
        return [...modern, ...legacy].filter(p => role === 'admin' || p.area === role).sort((a, b) => new Date(b.at) - new Date(a.at));
    }
    function receiptArchiveMatches() {
        const q = search.toLowerCase().trim();
        return receiptArchiveRecords().filter(p => (filter === 'all' || p.area === filter) && (!receiptArchiveFrom || String(p.at).slice(0, 10) >= receiptArchiveFrom) && (!receiptArchiveTo || String(p.at).slice(0, 10) <= receiptArchiveTo) && (!q || [p.id, p.method, p.location, p.employee, p.orderId, p.amount].join(' ').toLowerCase().includes(q)));
    }
    function receiptArchivePage() {
        const all = receiptArchiveRecords(), matches = receiptArchiveMatches();
        const filters = role === 'admin' ? `<select class="select" data-filter aria-label="Receipt department"><option value="all" ${filter === 'all' ? 'selected' : ''}>Both departments</option><option value="frontdesk" ${filter === 'frontdesk' ? 'selected' : ''}>Front Desk</option><option value="restaurant" ${filter === 'restaurant' ? 'selected' : ''}>Restaurant</option></select>` : '';
        const entries = matches.map(p => `<tr><td><strong>${esc(p.id)}</strong></td><td>${esc(new Date(p.at).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }))}</td><td>${esc(p.area === 'frontdesk' ? 'Front Desk' : 'Restaurant')}</td><td>${esc(p.location)}</td><td>${esc(p.method)}</td><td>${esc(p.employee)}</td><td>${money(p.amount)}</td><td>${btn('View / Reprint', p.kind === 'order' ? 'receipt-order' : 'receipt-payment', { id: p.id, small: true })}</td></tr>`);
        const stat = (icon, label, value, detail, kind = '') => `<article class="shared-stat-card ${kind}"><div class="shared-stat-top"><span class="shared-stat-icon">${premiumIcon(icon,18)}</span><span class="shared-stat-label">${label}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
        return `${header('Receipt History', 'Search saved payment acknowledgments, preview them again and reprint when needed.', btn('Export CSV', 'receipt-archive-export', { small: true }))}
        <div class="shared-stat-grid receipt-stat-grid">${stat('receipt','Saved receipts',all.length,'Payment records retained in this browser')}${stat('search','Matching receipts',matches.length,'Filtered results','green')}${stat('wallet','Total in results',money(matches.reduce((n, p) => n + p.amount, 0)),'Payments applied, excluding cash change','purple')}</div>
        <section class="card section-space receipt-history-shell"><div class="card-head"><div><h2>Receipt archive</h2><p class="sub">Reprinting keeps the original payment record. Bills and acknowledgments stay reviewable for follow-up and guest questions.</p></div><span class="audit-match-count">${matches.length} of ${all.length} receipts</span></div>
        <div class="receipt-archive-filters"><input class="input" data-search placeholder="Search receipt, staff, room, method…" value="${esc(search)}" aria-label="Search receipts">${filters}<label>From <input class="input" type="date" data-receipt-date="from" value="${esc(receiptArchiveFrom)}"></label><label>To <input class="input" type="date" data-receipt-date="to" value="${esc(receiptArchiveTo)}"></label>${btn('Clear Filters', 'receipt-archive-clear', { small: true })}</div>
        ${table(['Receipt', 'Date / time', 'Department', 'Room / table', 'Method', 'Employee', 'Amount paid', 'Action'], entries)}<div class="receipt-archive-footnote">Showing ${matches.length} of ${all.length} receipt records. Unpaid restaurant bills are not payment receipts; older demo records may lack original payment details.</div></section>
        <div class="notice section-space">V1 saves receipts in this browser only. Clearing browser data can erase them. For reliable permanent and multi-device retention, use a backed-up server database before real resort deployment.</div>`;
    }
    function exportReceiptsCsv() {
        const cols = ['Receipt', 'Timestamp', 'Department', 'Location', 'Order', 'Employee', 'Method', 'Amount (PHP)'];
        const quote = v => { let x = String(v ?? ''); if (/^[=+@\-]/.test(x.trimStart())) x = "'" + x; return '"' + x.replace(/"/g, '""') + '"'; };
        const rows = [cols, ...receiptArchiveMatches().map(p => [p.id, p.at, p.area, p.location, p.orderId, p.employee, p.method, p.amount.toFixed(2)])];
        const blob = new Blob(['\uFEFF' + rows.map(r => r.map(quote).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = 'resortOS-receipt-history-' + today() + '.csv'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 500);
        toast('Receipt history exported.');
    }
    function receiptPrompt(kind, id) {
        const rec = kind === 'bill' ? data.orders.find(x => x.id === id) : kind === 'order' ? data.orders.find(x => x.id === id && x.status === 'paid') : data.paymentRecords.find(x => x.id === id);
        if (!rec) { toast('This receipt is not available.', true); return; }
        showModal(kind === 'bill' ? 'Print Restaurant Bill' : 'Print Payment Acknowledgment', 'Choose a paper format, then preview and print.', `<form id="feature-print-form"><input type="hidden" name="kind" value="${esc(kind)}"><input type="hidden" name="id" value="${esc(id)}"><div class="field"><label>Paper format</label><select class="select" name="format"><option value="80">80 mm thermal receipt</option><option value="58">58 mm thermal receipt</option><option value="a4">A4 paper</option></select></div><div class="notice">Bills are marked UNPAID. Payment acknowledgments are issued only after an external payment is confirmed. These are not official tax invoices.</div><button class="btn primary full" type="submit">Open Print Preview</button></form>`);
    }
    function openReceiptPrint(kind, id, format) {
        const info = kind === 'bill' ? data.orders.find(x => x.id === id) : kind === 'order' ? data.orders.find(x => x.id === id && x.status === 'paid') : data.paymentRecords.find(x => x.id === id);
        if (!info) return;
        const paid = kind !== 'bill';
        const s = kind === 'payment' && info.receiptBranding ? info.receiptBranding : data.receiptSettings;
        const ref = kind === 'bill' ? info.id : info.paymentRecordId || info.id;
        const at = kind === 'bill' ? info.created : kind === 'order' ? info.settledAt || info.created : info.at;
        const restaurant = kind === 'bill' || kind === 'order' || info.area === 'restaurant';
        const rows = info.items || [];
        const lines = rows.map(item => `<tr><td>${esc(item.name)}</td><td class="num">${Number(item.qty || 1)}</td><td class="num">${money(item.amount ?? item.qty * item.price)}</td></tr>`).join('');
        const paper = format === '58' ? '58mm' : format === 'a4' ? '210mm' : '80mm';
        const width = format === 'a4' ? '175mm' : format === '58' ? '48mm' : '72mm';
        const details = restaurant ? `Order: ${esc(info.orderId || info.id)}${info.table ? ' · Table ' + esc(info.table) : ''}` : `Room: ${esc(info.room || '—')}${info.guest ? ' · ' + esc(info.guest) : ''}`;
        const balance = kind === 'payment' && info.area === 'frontdesk' ? `<div class="total-row"><span>Remaining balance</span><b>${money(info.balance)}</b></div>` : '';
        const changeLines = paid && Number(info.tendered || 0) > Number(info.amount || 0) && info.change > 0 ? `<div class="total-row"><span>Cash tendered</span><strong>${peso2(info.tendered)}</strong></div><div class="total-row"><span>Change returned</span><strong>${peso2(info.change)}</strong></div>` : '';
        const logo = s.logoId && assetCache.has(s.logoId) ? `<img class="logo" src="${assetCache.get(s.logoId)}" alt="">` : '';
        const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(ref)} · Receipt</title><style>
        @page{size:${paper === '210mm' ? 'A4' : paper + ' 250mm'};margin:${format === 'a4' ? '15mm' : '2mm'}}*{box-sizing:border-box}body{margin:0;background:#e8e8e8;color:#111;font-family:Arial,sans-serif;font-size:${format === '58' ? '10px' : '12px'}}.sheet{background:#fff;margin:22px auto;padding:${format === 'a4' ? '20mm' : '3mm'};width:${width};min-height:100px;box-shadow:0 3px 20px #0002}.center{text-align:center}.logo{width:50px;height:50px;object-fit:contain}h1{font-size:17px;margin:5px 0}h2{font-size:13px;margin:10px 0 4px}.small{font-size:10px;line-height:1.45}hr{border:0;border-top:1px dashed #444;margin:12px 0}.meta{line-height:1.65;word-break:break-word}table{width:100%;border-collapse:collapse;font-size:inherit;table-layout:fixed}td,th{padding:5px 1px;text-align:left;vertical-align:top;overflow-wrap:anywhere}th:first-child,td:first-child{width:54%}.num{text-align:right}.total-row{display:flex;justify-content:space-between;gap:6px;padding:5px 0}.total-row b{font-size:16px}.actions{display:flex;justify-content:center;gap:8px;margin:20px}button{padding:11px 20px;border:0;border-radius:6px;background:#12323c;color:white;cursor:pointer}@media print{body{background:white}.sheet{margin:0;padding:${format === 'a4' ? '0' : '1mm'};width:100%;box-shadow:none}.actions{display:none}} </style></head><body><div class="sheet"><div class="center">${logo}<h1>${esc(s.name || 'Resort')}</h1><div class="small">${esc(s.address || '')}<br>${esc(s.contact || '')}</div><h2>${paid ? 'PAYMENT ACKNOWLEDGMENT' : 'UNPAID RESTAURANT BILL'}</h2></div><hr><div class="meta">Reference: ${esc(ref)}<br>Date: ${esc(new Date(at).toLocaleString('en-PH'))}<br>${details}<br>Staff: ${esc(info.employeeName || info.staffPaidBy || info.staff || employeeLabel())}</div><hr><table><thead><tr><th>Item</th><th class="num">Qty</th><th class="num">Amount</th></tr></thead><tbody>${lines}</tbody></table><hr><div class="total-row"><strong>${paid ? 'AMOUNT PAID' : 'AMOUNT DUE'}</strong><b>${peso2(paid ? info.amount ?? total(info) : total(info))}</b></div>${paid ? `<div class="meta">Method: ${esc(info.method || info.paymentMethod || 'Not recorded')}</div>` : ''}${changeLines}${balance}<hr><div class="center small">${esc(s.footer || 'Thank you!')}<br>Not an official tax invoice<br>${paid ? 'Payment confirmed externally' : 'Please pay before receiving a payment acknowledgment'}</div></div><div class="actions"><button onclick="window.print()">Print Receipt</button><button onclick="window.close()">Close</button></div></body></html>`;
        const w = window.open('', '_blank');
        if (!w) { toast('Allow pop-ups to open the print preview.', true); return; }
        w.document.open(); w.document.write(html); w.document.close();
    }
    function featureAction(act, id) {
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
                const updated = { name, department: String(v.department || '').trim(), role: base, access, active: v.active !== 'false', capabilities: { voidOrder: v.voidOrder === 'on' } };
                if (old) Object.assign(old, updated);
                else data.employees.push({ id: uid('EMP'), ...updated });
            }
            audit(`${old ? 'Updated' : 'Added'} employee ${name}`, 'Admin', { module: 'System Management', type: 'update', target: old?.id || name });
        }
        if (id === 'feature-receipt-form') {
            data.receiptSettings = { name: String(v.name || 'Resort').trim(), address: String(v.address || '').trim(), contact: String(v.contact || '').trim(), footer: String(v.footer || '').trim(), logoId: v.logoId || '' };
            audit('Updated receipt branding', 'Admin', { module: 'System Management', type: 'update', target: 'Receipt Settings' });
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
        admin: ['rooms', 'tables', 'menu', 'categories', 'services', 'users', 'payments', 'receiptsettings', 'receipts', 'help']
    };
    function routeAllowed(target) {
        if (!hasAccess(role)) return false;
        return navs[role].some(a => a[0] === target) || secondaryRoutes[role].includes(target);
    }
    function navSelected(id) {
        if (route === id)
            return true;
        if (role === 'admin' && id === 'system')
            return ['rooms', 'tables', 'menu', 'categories', 'services', 'users', 'payments', 'receiptsettings', 'receipts'].includes(route);
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
        window.scrollTo(0, 0);
    }
    function setRole(r) {
        if (!navs[r])
            return;
        if (!hasAccess(r)) { toast('This employee is not authorized for that dashboard.', true); return; }
        role = r;
        ticketFilters = { query: '', status: 'all', category: 'all', priority: 'all', department: 'all', attention: 'all', view: r === 'admin' ? 'all' : 'mine' };
        bellOpen = false;
        notificationShow = 'all';
        go('dashboard');
        helpOnRoleChange();
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
            'users', 'categories', 'payments', 'receiptsettings'
        ].includes(route) ? `<div class="settings-return">${btn('← System Management', 'nav-system', { small: true })}<span>System Management / ${esc(({
            rooms: 'Rooms Manager',
            tables: 'Tables Manager',
            menu: 'Restaurant Menu',
            services: 'Service Catalog',
            users: 'Employees & Roles',
            categories: 'Menu Categories',
            payments: 'Payment Methods',
            receiptsettings: 'Receipt Settings'
        })[route])}</span></div>` : ''}${role === 'admin' ? adminUnifyMarkup(route, (map[route] || dashboard)()) : (map[route] || dashboard)()}</div></main></div>`;
        if (route === 'addservice' || (role === 'frontdesk' && route === 'charges' && chargesTab === 'services'))
            syncServiceForm();
        helpInsertHints(app);
        syncBell();
        if (route === 'help' && helpSelected) {
            const target = document.getElementById('help-center-detail');
            if (target)
                target.innerHTML = helpArticleMarkup(helpSelected);
        }
    }
    const HELP_KEY = 'resortOS-v1-help-welcome';
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
        'Open System Management → Users & Roles.',
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
    let helpMode = 'closed', helpQuery = '', helpCategory = 'all', helpSelected = '', helpReturnRoute = null, helpFocusReturn = null, helpPanelLibrary = false, helpDraft = null;
    let helpGuideStep = 0, helpWelcomeRole = null;
    function helpPreferences() {
        try {
            return JSON.parse(localStorage.getItem(HELP_KEY) || '{}') || {};
        }
        catch {
            return {};
        }
    }
    function helpMarkWelcome(r) {
        const saved = helpPreferences();
        saved[r] = true;
        try {
            localStorage.setItem(HELP_KEY, JSON.stringify(saved));
        }
        catch {
        }
    }
    function helpOfferWelcome() {
        if (!helpPreferences()[role]) {
            helpWelcomeRole = role;
            helpRenderRoot();
        }
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
            users: 'Users & Roles',
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
        const a = HELP_ARTICLES.find(x => x.id === id && x.role === role);
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
        return `<article class="help-article"><button class="help-back-link" type="button" data-action="help-back">← Back to ${helpMode === 'panel' ? 'suggested help' : 'Help Center'}</button><div class="help-category-tag">${esc(HELP_CATEGORIES[a.category])}</div><h2>${esc(a.title)}</h2><p class="help-article-summary">${esc(a.summary)}</p><h3>Follow these steps</h3><ol class="help-steps">${a.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>${a.note ? `<div class="help-note"><strong>Important</strong><p>${esc(a.note)}</p></div>` : ''}${a.related?.length ? `<div class="help-related"><h3>Related help</h3>${a.related.map(id => helpAllowed(id)).filter(Boolean).map(x => helpListEntry(x, true)).join('')}</div>` : ''}${a.routes.length ? `<div class="help-article-actions"><button class="btn primary" type="button" data-action="help-go" data-id="${esc(a.routes[0])}">Go to ${esc(helpNavName(a.routes[0]))} →</button></div>` : ''}<div class="help-ticket-link"><span>Still need help from management?</span><button class="btn" type="button" data-action="ticket-create">Create Support Ticket →</button></div></article>`;
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
            users: 'Users & Roles',
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
        return `${header('Help Center', 'Find clear, step-by-step instructions for your daily resortOS tasks.', btn('Restart Welcome Guide', 'help-restart', { small: true }))}<div class="help-center"><div class="help-center-hero"><div><span class="help-kicker">${esc(HELP_ROLES[role].toUpperCase())} HELP</span><h2>What can we help you with?</h2><p>Search a question, learn a daily task, or understand a system status.</p></div><div class="help-hero-icon" aria-hidden="true">?</div></div><label for="help-center-search" class="help-search-label">Search instructions</label><input id="help-center-search" data-help-search="center" class="input help-search" type="search" placeholder="Try “partial payment”, “add items”, or “audit log”…" value="${esc(helpQuery)}" autocomplete="off"><div class="help-categories" role="group" aria-label="Help categories"><button class="help-category-choice ${helpCategory === 'all' ? 'active' : ''}" data-action="help-category" data-id="all">All topics</button>${Object.entries(HELP_CATEGORIES).map(([id, title]) => `<button class="help-category-choice ${helpCategory === id ? 'active' : ''}" data-action="help-category" data-id="${id}">${esc(title)}</button>`).join('')}</div><div class="help-center-body"><div class="help-center-list"><div class="help-list-heading"><h2>${helpQuery ? 'Search results' : helpCategory === 'all' ? 'All help topics' : HELP_CATEGORIES[helpCategory]}</h2><small>${items.length} ${items.length === 1 ? 'article' : 'articles'}</small></div><div id="help-center-results">${helpResultCards(items, false)}</div></div><div class="help-center-detail" id="help-center-detail">${helpSelected ? helpArticleMarkup(helpSelected) : `<div class="help-center-placeholder"><div class="help-placeholder-icon">◎</div><h3>Choose a help topic</h3><p>Instructions will open here without leaving the Help Center.</p><div class="help-quick-tip"><strong>Quick tip</strong><p>Use the (?) button in the top bar for help with your current page or dialog.</p></div></div>`}</div></div><div class="help-center-footer"><span>Need to return to your work?</span><button class="btn" type="button" data-action="help-return">← Back to ${esc(helpReturnRoute ? helpNavName(helpReturnRoute) : 'Dashboard')}</button></div></div>`;
    }
    function helpRenderRoot() {
        const target = document.getElementById('help-root');
        if (!target)
            return;
        if (helpMode === 'panel')
            target.innerHTML = `<div class="help-drawer-backdrop" data-action="help-close" aria-hidden="true"></div><aside class="help-drawer" role="dialog" aria-modal="true" aria-label="Help & Guidance"><div class="help-drawer-head"><div class="help-drawer-heading"><span class="help-icon">?</span><div><strong>Help & Guidance</strong><small>${esc(HELP_ROLES[role])} workspace</small></div></div><button type="button" data-action="help-close" class="help-close-btn" aria-label="Close Help">×</button></div><div class="help-drawer-scroll">${helpPanelContent()}</div></aside>`;
        else if (helpMode === 'guide') {
            const steps = [
                {
                    title: 'Welcome to your workspace',
                    text: `You’re using the ${HELP_ROLES[role]} workspace. resortOS helps you complete daily tasks without unnecessary steps.`,
                    icon: '✦'
                },
                {
                    title: 'Find your way around',
                    text: 'Use the left sidebar to switch between your assigned pages. The top-right role switch is for this V1 prototype only.',
                    icon: '▤'
                },
                {
                    title: 'Your daily tasks',
                    text: role === 'frontdesk' ? 'Register stays, add requested service charges, review guest balances, and record received payments before checkout.' : role === 'restaurant' ? 'Use Tables to start orders, add items while guests dine, and choose direct payment or room posting only at the end.' : 'Use System Management to edit configuration and Audit Log to review employee actions.',
                    icon: '✓'
                },
                {
                    title: 'Help is always available',
                    text: 'Select Help in the top bar for guidance, then choose Open Full Help Center for all instructions.',
                    icon: '?'
                }
            ];
            const x = steps[helpGuideStep];
            target.innerHTML = `<div class="help-guide-shade"><section class="help-guide-card" role="dialog" aria-modal="true" aria-label="resortOS Welcome Guide"><div class="help-guide-top"><span>WELCOME GUIDE · ${esc(HELP_ROLES[role])}</span><button class="help-close-btn" data-action="help-guide-skip" aria-label="Skip guide">×</button></div><div class="help-guide-symbol">${x.icon}</div><small class="help-step-label">STEP ${helpGuideStep + 1} OF 4</small><h2>${esc(x.title)}</h2><p>${esc(x.text)}</p><div class="help-guide-progress">${steps.map((_, i) => `<span class="${i <= helpGuideStep ? 'on' : ''}"></span>`).join('')}</div><div class="help-guide-actions"><button class="btn" data-action="help-guide-skip">Skip Guide</button><div>${helpGuideStep > 0 ? '<button class="btn" data-action="help-guide-prev">Previous</button>' : ''}<button class="btn primary" data-action="help-guide-next">${helpGuideStep === 3 ? 'Finish Guide' : 'Next Step →'}</button></div></div></section></div>`;
        }
        else if (helpWelcomeRole) {
            target.innerHTML = `<section class="help-welcome" role="region" aria-label="Optional resortOS welcome"><button class="help-welcome-close" aria-label="Dismiss introduction" data-action="help-welcome-skip">×</button><div class="help-welcome-heading"><span class="help-welcome-mark">?</span><div><small>NEW TO THIS WORKSPACE?</small><h2>Welcome to resortOS!</h2></div></div><p>Would you like a quick introduction to your ${esc(HELP_ROLES[helpWelcomeRole])} dashboard? You can skip and restart it anytime.</p><div class="help-welcome-actions"><button class="btn" data-action="help-welcome-skip">Skip for Now</button><button class="btn primary" data-action="help-welcome-start">Start Guide →</button></div></section>`;
        }
        else
            target.innerHTML = '';
    }
    function helpOpen(id = '') {
        helpWelcomeRole = null;
        helpMode = 'panel';
        helpPanelLibrary = false;
        helpSelected = helpAllowed(id) ? id : '';
        helpQuery = '';
        helpFocusReturn = document.activeElement;
        helpRenderRoot();
        document.querySelector(helpSelected ? '.help-drawer .help-close-btn' : '#help-panel-search')?.focus();
    }
    function helpClose() {
        helpMode = 'closed';
        helpSelected = '';
        helpRenderRoot();
        if (helpFocusReturn?.isConnected)
            helpFocusReturn.focus();
        helpFocusReturn = null;
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
        if (helpMode === 'panel')
            helpRenderRoot();
        else {
            const detail = document.getElementById('help-center-detail');
            if (detail)
                detail.innerHTML = helpArticleMarkup(id);
        }
    }
    function helpGoPage(id) {
        if (!routeAllowed(id))
            return;
        if (document.querySelector('#modal-root .modal')) {
            toast('Close your current task before switching pages. No form data was changed.', true);
            return;
        }
        if (helpMode === 'panel')
            helpClose();
        const preserve = route === 'help' && id === 'neworder' && helpReturnRoute === 'neworder';
        if (route === 'help')
            helpReturnRoute = null;
        go(id, preserve);
    }
    function helpStartGuide() {
        helpWelcomeRole = null;
        helpMarkWelcome(role);
        helpGuideStep = 0;
        helpMode = 'guide';
        helpRenderRoot();
    }
    function helpFinishGuide() {
        helpMarkWelcome(role);
        helpMode = 'closed';
        helpWelcomeRole = null;
        helpRenderRoot();
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
        helpMode = 'closed';
        helpWelcomeRole = null;
        helpSelected = '';
        helpQuery = '';
        helpCategory = 'all';
        helpRenderRoot();
        helpOfferWelcome();
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
        const sum = open.reduce((n, o) => n + total(o), 0);
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
        const open = tableOpenOrders(id), sum = open.reduce((n, o) => n + total(o), 0);
        if (!open.length) {
            showModal(esc(t.name), 'This table is vacant and ready for guests.', `<div class="empty small-empty"><strong>Available for a new order</strong>Add food or drinks now. Payment method will be chosen only when guests finish.</div>`, `${btn('Close', 'modal-close')}${btn('+ Start Order', 'new-for-table', { id: t.id, primary: true })}`);
            return;
        }
        showModal(esc(t.name) + ' · ' + (tableState(id) === 'waiting' ? 'Waiting for payment' : 'Occupied'), `${open.length} open restaurant order${open.length > 1 ? 's' : ''}`, `${open.map(o => `<div class="table-open-order"><div class="item-line"><div><strong>Order #${esc(o.id)}</strong><small>${o.items.reduce((n, i) => n + i.qty, 0)} items • ${prettyTime(o.created)}</small></div>${badge(o.status)}</div><div class="item-line"><strong>Order total</strong><strong>${money(total(o))}</strong></div></div>`).join('')}<div class="checkout-total"><strong>Outstanding restaurant bill</strong><b>${money(sum)}</b></div><div class="notice">Guests decide whether to pay at the restaurant or post to a room at the end of their meal.</div>`, `${tableState(id) === 'waiting' ? btn('Continue Dining', 'table-resume', { id: t.id }) : btn('Add Items', 'table-add-items', { id: t.id })}${tableState(id) === 'waiting' ? btn('Choose Payment', 'table-settle', { id: t.id, primary: true }) : btn('Mark Waiting for Payment', 'table-ready', { id: t.id, primary: true })}`);
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
        <section class="rs-recent-panel"><div class="rs-panel-title"><div><span class="rs-section-eyebrow">RECENT ACTIVITY</span><h2>Latest orders</h2><p>All orders remain available in their original records.</p></div><button class="rs-text-action" data-action="nav-orders">Order history ${premiumIcon('arrow',16)}</button></div><div class="rs-recent-list">${recent.map(o => `<button class="rs-recent-row" data-action="view-order" data-id="${esc(o.id)}"><span class="rs-order-icon">${premiumIcon('orders',20)}</span><span class="rs-order-main"><strong>#${esc(o.id)} · ${o.destination === 'room' ? esc(roomLabel(o.room)) : esc(tableName(o.table))}</strong><small>${esc(prettyTime(o.created))} · ${o.items.reduce((s,i) => s + i.qty,0)} items</small></span><span class="rs-recent-status">${badge(o.status)}</span><strong class="rs-recent-amount">${money(total(o))}</strong>${premiumIcon('right',15)}</button>`).join('') || '<div class="rs-placeholder">Orders will appear here as staff work.</div>'}</div></section>
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
    managementPages.push({ id: 'payments', icon: '₱', title: 'Payment Methods', desc: 'External payment options for both departments.' });
    managementPages.push({ id: 'receiptsettings', icon: '▤', title: 'Receipt Settings', desc: 'Resort identity and printed receipt details.' });
    managementPages.push({ id: 'receipts', icon: '▧', title: 'Receipt History', desc: 'Saved payments and receipt reprints.' });
    function systemManagementPage() {
        const groups = [
            {kicker:'PROPERTY SETUP', title:'Spaces & services', desc:'Manage the spaces and additional charges that support every guest stay.', ids:['rooms','tables','services']},
            {kicker:'RESTAURANT CONTROL', title:'Dining & payments', desc:'Manage food presentation, categories, accepted methods and receipt details.', ids:['menu','categories','payments','receiptsettings']},
            {kicker:'PEOPLE & ACCOUNTABILITY', title:'Team & transaction history', desc:'Manage employee access and keep previous payment records easy to find.', ids:['users','receipts']}
        ];
        const iconMap = {rooms:'rooms',tables:'tables',services:'sparkle',menu:'menu',categories:'layers',payments:'wallet',receiptsettings:'receipt',users:'users',receipts:'receipt'};
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
        return `<tr><td>#${esc(o.id)}</td><td>${o.destination === 'room' ? roomLabel(o.room) + (o.table ? ' · ' + esc(tableName(o.table)) : '') : esc(tableName(o.table))}</td><td>${money(total(o))}</td><td>${badge(o.status)}</td><td>${btn('View Order', 'view-order', { id: o.id, small: true })}</td></tr>`;
    }
    function orders() {
        let arr = data.orders.filter(o => filter === 'all' || o.status === filter).filter(o => (o.id+' '+o.room+' '+o.table).toLowerCase().includes(search.toLowerCase()));
        const paid = data.orders.filter(x => x.status === 'paid').length;
        const room = data.orders.filter(x => x.status === 'posted').length;
        const open = data.orders.filter(x => ['pending','awaiting_payment'].includes(x.status)).length;
        return `<div class="rs-page rs-ledger-page"><div class="rs-page-header"><div><span class="rs-eyebrow">RESTAURANT / TRANSACTIONS</span><h1>Order history<span class="rs-heading-dot">.</span></h1><p>Find every order, see its status and follow up in one place.</p></div><div class="rs-header-actions"><button class="rs-soft-button" data-action="nav-receipts">${premiumIcon('receipt',17)} Receipt history</button><button class="rs-primary-button" data-action="nav-neworder">${premiumIcon('plus',18)} New order ${premiumIcon('arrow',15)}</button></div></div>
            ${rsSummaryCards([{ label:'All orders', value:data.orders.length, detail:'Recorded orders', icon:'orders' }, { label:'Still open', value:open, detail:'Dining or to settle', icon:'clock', tone:'amber' }, { label:'Posted to rooms', value:room, detail:'Handled by Front Desk', icon:'rooms', tone:'green' }, { label:'Paid directly', value:paid, detail:'At the restaurant', icon:'wallet', tone:'violet' }])}
            <section class="rs-ledger-panel"><div class="rs-panel-title"><div><span class="rs-section-eyebrow">ORDER DIRECTORY</span><h2>All restaurant orders</h2><p>Search by order number, room or table, and filter by current status.</p></div></div><div class="rs-ledger-toolbar"><input class="input" data-search aria-label="Search restaurant orders" placeholder="Search orders, tables or rooms…" value="${esc(search)}"><select class="select" data-filter aria-label="Filter order status">${['all','pending','awaiting_payment','posted','paid','void'].map(v => `<option value="${v}" ${filter===v ? 'selected' : ''}>${v==='all' ? 'All statuses' : v==='awaiting_payment' ? 'Waiting for payment' : v[0].toUpperCase()+v.slice(1)}</option>`).join('')}</select></div>${table(['Order','Table / Room','Total','Status','Created','Action'],arr.map(o => `<tr><td><strong>#${esc(o.id)}</strong></td><td>${o.destination === 'room' ? roomLabel(o.room) : esc(tableName(o.table))}</td><td>${money(total(o))}</td><td>${badge(o.status)}</td><td>${prettyTime(o.created)}</td><td>${btn('View Order','view-order',{id:o.id,small:true})}</td></tr>`))}</section></div>`;
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
        const due = data.orders.filter(o => o.destination === 'room' && o.status === 'posted').reduce((sum,o) => sum + total(o),0);
        const tabs = `<div class="workspace-tabs" role="group" aria-label="Restaurant room charge workspace"><button type="button" class="workspace-tab ${roomChargesTab === 'charges' ? 'active' : ''}" data-action="roomcharges-tab" data-id="charges" aria-pressed="${roomChargesTab === 'charges'}">Room Charges</button><button type="button" class="workspace-tab ${roomChargesTab === 'posts' ? 'active' : ''}" data-action="roomcharges-tab" data-id="posts" aria-pressed="${roomChargesTab === 'posts'}">Posting history</button></div>`;
        return `<div class="rs-page rs-ledger-page"><div class="rs-page-header"><div><span class="rs-eyebrow">RESTAURANT / GUEST ROOM CHARGES</span><h1>Room postings<span class="rs-heading-dot">.</span></h1><p>Track restaurant bills transferred to guest stays for Front Desk settlement.</p></div><button class="rs-primary-button" data-action="nav-tables">${premiumIcon('tables',18)} Open tables ${premiumIcon('arrow',15)}</button></div>${rsSummaryCards([{label:'Room-linked orders',value:n,detail:'Including historical postings',icon:'rooms'},{label:'Posted order value',value:money(due),detail:'Not the remaining guest balance',icon:'wallet',tone:'green'}])}<section class="rs-ledger-panel"><div class="rs-panel-title"><div><span class="rs-section-eyebrow">ROOM POSTING WORKSPACE</span><h2>Restaurant to Front Desk</h2><p>Front Desk confirms settlement; Restaurant can review or void permitted charges.</p></div></div>${tabs}${roomChargesTab === 'posts' ? posts(true) : roomCharges(true)}</section></div>`;
    }
    function roomCharges(embedded = false) {
        const posted = data.orders.filter(o => o.destination === 'room');
        return `${embedded ? '' : header('Restaurant Room Charges','View restaurant charges assigned to guest rooms.')}<div class="rs-embedded-ledger">${table(['Order','Room','Amount','Status','Posted by','Action'],posted.map(o => `<tr><td><strong>#${esc(o.id)}</strong></td><td>${roomLabel(o.room)}</td><td>${money(total(o))}</td><td>${badge(o.status)}</td><td>${esc(o.staff)}</td><td>${btn('View','view-order',{id:o.id,small:true})}</td></tr>`))}</div>`;
    }
    function posts(embedded = false) {
        const posted = data.orders.filter(o => o.destination === 'room').sort((a,b) => b.created.localeCompare(a.created));
        return `${embedded ? '' : header('Posting History','Review restaurant room posting activity.')}<div class="rs-post-list">${posted.map(o => `<button class="rs-post-row" data-action="view-order" data-id="${esc(o.id)}"><span class="rs-order-icon">${premiumIcon('rooms',19)}</span><span class="rs-order-main"><strong>#${esc(o.id)} · ${roomLabel(o.room)}</strong><small>${esc(o.staff)} · ${prettyTime(o.created)}</small></span>${badge(o.status)}<strong>${money(total(o))}</strong>${premiumIcon('right',15)}</button>`).join('') || '<div class="rs-placeholder">No room postings have been recorded.</div>'}</div>`;
    }
        function cash() {
        const arr = data.orders.filter(o => o.destination === 'table' && o.status === 'awaiting_payment');
        return `${header('Table Payments', 'Guests choose to pay directly or post their restaurant bill to an active room after dining.', btn('View Tables', 'nav-tables', { primary: true }))}${card('Tables ready for payment', 'Only orders marked ready for the bill appear here.', table([
            'Order',
            'Table',
            'Total',
            'Status',
            'Action'
        ], arr.map(o => `<tr><td>#${esc(o.id)}</td><td>${esc(tableName(o.table))}</td><td>${money(total(o))}</td><td>${badge(o.status)}</td><td>${btn('Review Bill', 'table-bill', { id: o.id, small: true })}</td></tr>`)))}`;
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
        if (helpMode === 'panel') helpClose();
        if (document.querySelector('#modal-root .modal')) {
            toast('Please finish or close your current window before creating a ticket.', true);
            return;
        }
        const relatedArticle = helpAllowed(helpSelected);
        const sourceContext = relatedArticle ? `Help article: ${relatedArticle.title}` : route !== 'tickets' ? `Page: ${helpNavName(route)}` : '';
        showModal('Create Support Ticket', 'Report a problem or ask management for help.', `
            <form id="ticket-create-form" class="ticket-form">
                ${sourceContext ? `<div class="ticket-context">Related: ${esc(sourceContext)}</div>` : ''}
                <input type="hidden" name="context" value="${esc(sourceContext)}">
                <div class="field"><label for="ticket-category">What do you need help with?</label><select class="select" id="ticket-category" name="category" required>
                    <option value="system">System Problem</option><option value="question">Question or Assistance</option><option value="operational">Operational Issue</option>
                </select></div>
                <div class="field"><label for="ticket-subject">Subject</label><input class="input" id="ticket-subject" name="subject" minlength="4" maxlength="110" placeholder="Briefly describe the issue" required></div>
                <div class="field" id="ticket-location-field" hidden><label for="ticket-location">Where did it happen?</label><input class="input" id="ticket-location" name="location" maxlength="100" placeholder="e.g. Restaurant kitchen"></div>
                <div class="field"><label for="ticket-description">Description</label><textarea id="ticket-description" class="input ticket-textarea" name="description" minlength="10" maxlength="2500" rows="5" required placeholder="What happened? What help do you need?"></textarea></div>
                <div class="field"><label for="ticket-priority">Priority</label><select class="select" name="priority" id="ticket-priority"><option value="normal">Normal</option><option value="urgent">Urgent — needs prompt attention</option></select></div>
                <fieldset class="ticket-visibility-picker"><legend>Who should see this issue?</legend><p class="ticket-visibility-hint">Suggested from the category. You can change it.</p>
                    <label class="ticket-visibility-choice"><input type="radio" name="visibility" value="private" checked><span><strong>Only me & Admin</strong><small>Private question or individual issue</small></span></label>
                    <label class="ticket-visibility-choice"><input type="radio" name="visibility" value="department"><span><strong>My Department</strong><small>Shared with ${esc(ticketRoleLabel(role))} staff and Admin</small></span></label>
                    <label class="ticket-visibility-choice"><input type="radio" name="visibility" value="all"><span><strong>All Staff</strong><small>Shared with Front Desk, Restaurant and Admin</small></span></label>
                </fieldset>
                <div id="ticket-visibility-explanation" class="ticket-sharing-note" aria-live="polite"></div>
                <div class="ticket-notice">Everyone in the selected audience can read the issue title, description and official updates. Replies to Admin stay private. Do not include passwords, payment details or unnecessary guest information. For emergencies, contact management directly.</div>
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
    }
    function closeModal() {
        document.getElementById('modal-root').innerHTML = '';
        document.body.style.overflow = '';
    }
    function toast(message, error = false) {
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
        showModal('Order #' + esc(o.id), 'Restaurant order and transaction details', `<div class="item-line"><strong>${o.destination === 'room' ? roomLabel(o.room) + (o.table ? ' · ' + esc(tableName(o.table)) : '') : esc(tableName(o.table))}</strong>${badge(o.status)}</div>${o.items.map(i => `<div class="item-line"><div><strong>${esc(i.name)} × ${i.qty}</strong><small>${money(i.price)} each</small></div><span class="line-amount">${money(i.qty * i.price)}</span></div>`).join('')}<div class="checkout-total"><strong>Total</strong><b>${money(total(o))}</b></div><div class="notice">${o.destination === 'room' ? 'This order was posted to a room. Front Desk handles collection and settlement.' : 'Restaurant orders are settled after the guest finishes dining.'}</div><p class="hint">Created by ${esc(o.staff)} · ${prettyTime(o.created)}</p>`, `${o.destination === 'table' && o.status === 'awaiting_payment' ? btn('Choose Payment', 'table-bill', { id: o.id, primary: true }) : ''}${o.status === 'pending' ? btn('Add Items', 'edit-order', { id: o.id }) + btn('Mark Waiting for Payment', 'table-ready', { id: o.table, primary: true }) : ''}${o.status === 'paid' ? btn('Print Receipt', 'receipt-order', { id: o.id }) : ''}${['posted', 'pending', 'awaiting_payment'].includes(o.status) && canVoid() ? btn('Void Order', 'void-order', { id: o.id, danger: true }) : ''}`);
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
        const rows = all.length ? all.map(c => `<div class="checkout-charge ${remain(c) < .001 ? 'closed' : ''}"><div class="checkout-charge-label"><div><strong>${esc(c.label)}</strong><small>${c.source === 'restaurant' ? 'Restaurant' : 'Additional service'} · ${prettyTime(c.date)}</small></div>${badge(c.status)}</div><div class="checkout-charge-meta"><span>Charge: ${money(c.amount)}</span><span>Already paid: ${money(c.paid || 0)}</span><strong>Remaining: ${money(remain(c))}</strong></div></div>`).join('') : '<div class="notice">No restaurant or additional service charges have been posted to this stay.</div>';
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
        const outstanding = isFrontDesk ? dueForStay(payment.stayId) : 0;
        const cashBreakdown = Number(payment.change || 0) > 0 ? `<div><span>Cash received</span><strong>${peso2(payment.tendered)}</strong></div><div><span>Change to return</span><strong class="text-teal">${peso2(payment.change)}</strong></div>` : '';
        const info = `<div class="payment-result-icon">✓</div><div class="payment-result-details"><div><span>Payment applied</span><strong>${peso2(payment.amount)}</strong></div>${cashBreakdown}${isFrontDesk ? `<div><span>Remaining room charges</span><strong>${peso2(outstanding)}</strong></div>` : `<div><span>Restaurant table</span><strong>${esc(tableName(payment.table))}</strong></div>`}<div><span>Payment method</span><strong>${esc(payment.method)}</strong></div><div><span>Receipt reference</span><strong>${esc(payment.id)}</strong></div></div><div class="payment-receipt-actions"><div class="field"><label for="success-receipt-format">Receipt format</label><select class="select" id="success-receipt-format"><option value="80">80 mm thermal receipt</option><option value="58">58 mm thermal receipt</option><option value="a4">A4 paper</option></select></div>${btn('Print Receipt (optional)', 'quick-print-receipt', { id: payment.id })}</div><div class="notice ${!outstanding ? 'success' : ''}">${isFrontDesk ? outstanding > .001 ? `Payment saved. ${peso2(outstanding)} remains unpaid; continue in Checkout to record another payment.` : 'All posted charges are settled. You can complete checkout now.' : 'Payment saved. This table is now available for the next guests.'}</div>`;
        const actions = isFrontDesk ? `${btn('Continue Checkout', 'payment-continue-checkout', { id: payment.stayId })}${outstanding < .001 && stay?.active ? btn('Complete Checkout', 'confirm-checkout', { id: payment.stayId, primary: true }) : ''}` : btn('Back to Tables', 'payment-return-tables', { primary: true });
        showModal('Payment recorded successfully', isFrontDesk ? `${roomLabel(payment.room)} · Ready for the next step` : 'Restaurant payment confirmed', `<div class="payment-result">${info}</div>`, actions);
    }
    function cashPay(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o || o.destination !== 'table' || o.status !== 'awaiting_payment')
            return;
        showModal('Receive Restaurant Payment', 'Collect the payment and return the correct change before releasing the table.', `<form id="restaurant-pay-form" data-payment-calculator data-due="${total(o)}" data-payment-kind="restaurant"><div class="muted-panel"><div class="item-line"><strong>Order #${esc(o.id)} · ${esc(tableName(o.table))}</strong>${badge(o.status)}</div><div class="checkout-total"><strong>Amount to collect</strong><b>${money(total(o))}</b></div></div>${paymentInputs(total(o), total(o), 'restaurant')}<div class="notice warning">Confirm only when payment has been received. Cash change will appear on the receipt; the table becomes available once paid.</div></form>`, `${btn('Preview Unpaid Bill', 'quick-print-bill', { id: o.id })}${btn('Back', 'table-bill', { id: o.id })}${btn('Confirm Payment Received', 'confirm-cash', { id: o.id, primary: true })}`);
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
            qty
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
                amount: total(ongoing),
                changes: {
                    'Items added': additions.map(i => i.name + ' × ' + i.qty).join(', '),
                    'New order total': money(total(ongoing))
                }
            });
            cart = {};
            draftOrderId = null;
            currentTable = tableNo;
            save();
            go('tables');
            toast('Items added. ' + t.name + ' total is now ' + money(total(ongoing)) + '.');
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
        showModal('Final bill · ' + esc(tableName(o.table)), 'Guests now choose how to settle the order.', `<div class="muted-panel"><div class="item-line"><strong>Order #${esc(o.id)}</strong>${badge(o.status)}</div>${o.items.map(i => `<div class="item-line"><span>${esc(i.name)} × ${i.qty}</span><strong>${money(i.price * i.qty)}</strong></div>`).join('')}<div class="checkout-total"><strong>Restaurant total</strong><b>${money(total(o))}</b></div></div><div class="notice">Ask the guests now: pay at the restaurant or post this bill to their active resort room? Nothing has been charged to a room yet.</div>`, `${btn('Back to Table', 'open-table', { id: o.table })}${btn('Pay at Restaurant', 'cash-pay', { id: o.id })}${btn('Post to Guest Room', 'choose-post-room', { id: o.id, primary: true })}`);
    }
    function postTableToRoom(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o || o.destination !== 'table' || o.status !== 'awaiting_payment')
            return;
        const stays = data.stays.filter(s => s.active);
        showModal('Post Restaurant Bill to Room', 'Confirm an active guest stay before posting this bill.', `<div class="muted-panel"><div class="item-line"><strong>${esc(tableName(o.table))} · Order #${esc(o.id)}</strong>${badge(o.status)}</div><div class="checkout-total"><strong>Restaurant bill</strong><b>${money(total(o))}</b></div></div><form id="post-table-form"><input type="hidden" name="orderId" value="${esc(o.id)}"><div class="field"><label>Occupied guest room</label><select class="select" name="room" required><option value="">Choose an active room...</option>${stays.map(s => `<option value="${s.room}">${roomLabel(s.room)} · ${esc(s.name || 'Guest')}</option>`).join('')}</select></div><div class="notice warning">Check that guests have authorized posting to this room. Front Desk will later settle this room charge.</div><div class="modal-inline-footer">${btn('Back to Bill', 'table-bill', { id: o.id })}<button class="btn primary" type="submit" ${!stays.length ? 'disabled' : ''}>Confirm Posting to Room</button></div></form>`);
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
 <div class="field"><label>Rate / Price (₱)</label><input class="input" name="rate" type="number" step="0.01" min="0" required value="${item?.price ?? item?.rate ?? 0}"></div><div class="field"><label>Status</label><select class="select" name="active"><option value="true" ${item?.active !== false ? 'selected' : ''}>Active</option><option value="false" ${item?.active === false ? 'selected' : ''}>Inactive</option></select></div><button type="submit" class="btn primary full">Save</button></form>`);
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
                if (helpMode === 'panel')
                    helpRenderRoot();
                else
                    document.getElementById('help-center-detail').innerHTML = '<div class="help-center-placeholder"><h3>Choose a help topic</h3><p>Choose a question from the list to read its instructions.</p></div>';
            }
            else if (act === 'help-full')
                helpShowCenter();
            else if (act === 'help-context') {
                helpPanelLibrary = false;
                helpSelected = '';
                helpQuery = '';
                helpCategory = 'all';
                helpRenderRoot();
            }
            else if (act === 'help-return')
                helpReturn();
            else if (act === 'help-category') {
                helpCategory = id;
                helpSelected = '';
                if (helpMode === 'panel')
                    helpRenderRoot();
                else
                    render();
            }
            else if (act === 'help-go')
                helpGoPage(id);
            else if (act === 'help-restart')
                helpStartGuide();
            else if (act === 'help-welcome-start')
                helpStartGuide();
            else if (act === 'help-welcome-skip') {
                helpMarkWelcome(helpWelcomeRole || role);
                helpWelcomeRole = null;
                helpRenderRoot();
            }
            else if (act === 'help-guide-skip')
                helpFinishGuide();
            else if (act === 'help-guide-prev') {
                helpGuideStep = Math.max(0, helpGuideStep - 1);
                helpRenderRoot();
            }
            else if (act === 'help-guide-next') {
                if (helpGuideStep === 3)
                    helpFinishGuide();
                else {
                    helpGuideStep++;
                    helpRenderRoot();
                }
            }
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
            case 'table-bill':
                tableBill(id);
                break;
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
                if (!calc.valid || Math.abs(calc.amount - total(o)) > .001) { toast('Restaurant bills must be paid in full. Check the amount received and payment method.', true); return; }
                const payMethod = calc.method;
                o.status = 'paid';
                o.paymentMethod = payMethod.name;
                o.settledAt = new Date().toISOString();
                o.staffPaidBy = employeeLabel();
                o.paymentRecordId = recordPayment({ area: 'restaurant', method: payMethod.name, amount: total(o), tendered: calc.tendered, change: calc.change, orderId: o.id, table: o.table, room: null, stayId: null, items: o.items.map(x => ({ name: x.name, qty: x.qty, price: x.price })) }).id;
                audit('Received restaurant ' + o.paymentMethod + ' payment for ' + o.id + ' (' + money(total(o)) + ')', 'Restaurant Staff', {
                    type: 'payment',
                    module: 'Restaurant',
                    target: o.id,
                    amount: total(o),
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
    document.addEventListener('change', async e => {
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
    document.addEventListener('submit', e => {
        const form = e.target, formId = form.getAttribute('id');
        if (!formId)
            return;
        e.preventDefault();
        const v = Object.fromEntries(new FormData(form).entries());
        if (featureSubmit(formId, v)) return;
        switch (formId) {
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
                let left = amount, count = 0, allocations = [], receiptLines = [], restaurantPortion = 0;
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
                    receiptLines.push({ name: c.label, amount: applied, chargeId: c.id });
                    if (c.source === 'restaurant') restaurantPortion = Math.round((restaurantPortion + applied) * 100) / 100;
                }
                const payment = recordPayment({ area: 'frontdesk', method: payMethod.name, amount, tendered: calc.tendered, change: calc.change, room: st.room, stayId: st.id, guest: st.name || '', items: receiptLines, balance: dueForStay(st.id) });
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
                const payment = recordPayment({ area: 'frontdesk', method: payMethod.name, amount, tendered: calc.tendered, change: calc.change, room: st?.room, stayId: c.stayId, guest: st?.name || '', items: [{ name: c.label, amount, chargeId: c.id }], balance: dueForStay(c.stayId) });
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
                    label: 'Restaurant order ' + o.id,
                    amount: Math.round(total(o) * 100) / 100,
                    paid: 0,
                    status: 'unpaid',
                    date: o.postedAt,
                    by: employeeLabel()
                });
                notify(['frontdesk'], 'Restaurant charge posted', `${o.id} · ${roomLabel(st.room)} · ${money(total(o))}`, { kind: 'info', route: 'rooms', entityId: String(st.room) });
                notify(['admin'], 'New room-posted charge', `${o.id} posted to ${roomLabel(st.room)}`, { kind: 'info', route: 'audit' });
                audit('Posted restaurant bill ' + o.id + ' from ' + tableName(o.table) + ' to ' + roomLabel(st.room) + ' (' + money(total(o)) + ')', 'Restaurant Staff', {
                    type: 'posting',
                    module: 'Restaurant',
                    target: roomLabel(st.room),
                    amount: total(o),
                    changes: { Order: o.id, Table: tableName(o.table), 'Posted amount': money(total(o)) }
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
        else if (helpWelcomeRole) {
            e.preventDefault();
            e.stopImmediatePropagation();
            helpMarkWelcome(helpWelcomeRole);
            helpWelcomeRole = null;
            helpRenderRoot();
        }
    }, true);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape')
            closeModal();
    });
    save();
    render();
    loadAssets();
    helpOfferWelcome();
})();
