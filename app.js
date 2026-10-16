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
    let data = load(), role = 'frontdesk', route = 'dashboard', mobile = false, cart = {}, filter = 'all', search = '', orderDest = 'table', currentTable = '03', currentRoom = '', draftOrderId = null, menuCategory = null;
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
    let roomChargesTab = 'charges';
    const secondaryRoutes = {
        frontdesk: ['balances', 'addservice', 'help'],
        restaurant: ['neworder', 'posts', 'cash', 'help'],
        admin: ['rooms', 'tables', 'menu', 'services', 'users', 'help']
    };
    function routeAllowed(target) {
        return navs[role].some(a => a[0] === target) || secondaryRoutes[role].includes(target);
    }
    function navSelected(id) {
        if (route === id)
            return true;
        if (role === 'admin' && id === 'system')
            return ['rooms', 'tables', 'menu', 'services', 'users'].includes(route);
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
        role = r;
        ticketFilters = { query: '', status: 'all', category: 'all', priority: 'all', department: 'all', attention: 'all', view: r === 'admin' ? 'all' : 'mine' };
        bellOpen = false;
        notificationShow = 'all';
        go('dashboard');
        helpOnRoleChange();
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
            audit: auditPage,
            system: systemManagementPage,
            help: helpCenter,
            tickets: ticketsPage
        };
        const app = document.getElementById('app');
        app.innerHTML = `<div class="app"><aside class="sidebar ${mobile ? 'open' : ''}"><div class="brand"><div class="brand-mark">R</div>resortOS</div><div class="side-eyebrow">${names[role].toUpperCase()}</div><nav class="nav" aria-label="Main navigation">${navs[role].filter(([id]) => id !== 'tickets').map(([id, icon, label]) => `<button class="nav-item ${navSelected(id) ? 'active' : ''}" data-nav="${id}"><span class="nav-icon">${icon}</span><span class="nav-label">${label}</span></button>`).join('')}</nav><nav class="nav-support" aria-label="Support">${navs[role].filter(([id]) => id === 'tickets').map(([id, icon, label]) => `<button class="nav-item ${navSelected(id) ? 'active' : ''}" data-nav="${id}" aria-label="${esc(ticketSidebarLabel())}"><span class="nav-icon">${icon}</span><span class="nav-label">${label}</span>${ticketAttentionMarkup()}</button>`).join('')}</nav><div class="side-footer"><strong>${names[role]} Staff</strong><small>${role === 'frontdesk' ? 'Room & charge operations' : role === 'restaurant' ? 'Orders & restaurant charges' : 'System configuration'}</small></div></aside>${mobile ? '<div class="sidebar-backdrop" data-action="close-menu"></div>' : ''}<main class="main"><div class="topbar"><div style="display:flex;align-items:center;gap:13px;min-width:0"><button class="mobile-menu" data-action="toggle-menu" aria-label="Menu">☰</button><div class="breadcrumbs">RESORT OPERATIONS &nbsp; / &nbsp; ${names[role].toUpperCase()} &nbsp; / &nbsp; ${route.replace(/([A-Z])/g, ' $1').toUpperCase()}</div></div><div class="top-actions"><div class="notification-button-wrap"><button class="notify-bell" data-action="notify-toggle" type="button" aria-label="Notifications" title="Notifications"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg><span class="notify-count" ${unreadNotifications() ? '' : 'hidden'}>${unreadNotifications()}</span></button><div id="notify-popover-root"></div></div><button class="top-help-button" data-action="help-open" type="button" title="Help with this page" aria-label="Help with this page"><span class="top-help-glyph">?</span><span>Help</span></button><span class="date">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span><select class="role-switch" id="role-switch" aria-label="Switch role"><option value="frontdesk" ${role === 'frontdesk' ? 'selected' : ''}>Front Desk</option><option value="restaurant" ${role === 'restaurant' ? 'selected' : ''}>Restaurant</option><option value="admin" ${role === 'admin' ? 'selected' : ''}>Admin</option></select></div></div><div class="content">${role === 'admin' && [
            'rooms',
            'tables',
            'menu',
            'services',
            'users'
        ].includes(route) ? `<div class="settings-return">${btn('← System Management', 'nav-system', { small: true })}<span>System Management / ${esc(({
            rooms: 'Rooms Manager',
            tables: 'Tables Manager',
            menu: 'Restaurant Menu',
            services: 'Service Catalog',
            users: 'Users & Roles'
        })[route])}</span></div>` : ''}${(map[route] || dashboard)()}</div></main></div>`;
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
    helpAdd('ad-users', 'admin', 'tasks', 'Manage users and roles', 'Review what Front Desk, Restaurant, and Admin staff can access.', [
        'Open System Management → Users & Roles.',
        'Review the permissions associated with each role.',
        'Configure accounts and access only when supported by the current deployment.'
    ], 'V1 is a browser prototype with a role switcher, not authenticated staff login. Production permissions require a secure backend.', ['users', 'system'], 'users permissions staff employee account login');
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
    helpAdd('ad-remove', 'admin', 'tasks', 'Safely remove or archive a configured item', 'Remove unused items and protect existing transactions.', [
        'Open System Management and select Rooms, Tables, Restaurant Menu, or Service Catalog.',
        'Choose Remove on the item you want to change.',
        'The system blocks items in active use and automatically chooses Archive when history exists.',
        'Provide a reason and confirm the action.',
        'Review Audit Log to see what was removed or archived.'
    ], 'Archived items remain in Admin management and can be reactivated; past orders, payments, and Audit Log records are preserved.', ['system', 'audit'], 'delete remove archive table menu service room history');
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
    function tableTiles(tables) {
        return `<div class="tables-grid">${tables.map(t => {
            const status = tableState(t.id), open = tableOpenOrders(t.id), sum = open.reduce((n, o) => n + total(o), 0);
            return `<button class="table-tile ${status}" data-action="open-table" data-id="${esc(t.id)}"><span class="table-tile-icon">▤</span><span class="table-tile-name">${esc(t.name)}</span><span class="table-tile-status">${status === 'waiting' ? 'Waiting for payment' : status === 'occupied' ? 'Occupied' : 'Vacant'}</span><span class="table-tile-foot">${open.length ? `${open.length} open order${open.length > 1 ? 's' : ''} · ${money(sum)}` : 'Tap to start an order'}</span></button>`;
        }).join('') || '<div class="empty">No active tables. Ask Admin to add a table.</div>'}</div>`;
    }
    function tablesPage() {
        const active = data.tables.filter(t => t.active), vacant = active.filter(t => tableState(t.id) === 'vacant').length, occupiedTables = active.filter(t => tableState(t.id) === 'occupied').length, waiting = active.filter(t => tableState(t.id) === 'waiting').length;
        if (role === 'admin')
            return `${header('Restaurant Tables Manager', 'Add tables, rename them or disable unused ones.', btn('+ Add Table', 'add-table', { primary: true }))}<div class="grid cols4">${kpi('All tables', data.tables.length, 'Includes inactive tables')}${kpi('Active', active.length, 'Available for restaurant use', 'green')}${kpi('Occupied', occupiedTables, 'Orders in progress', 'amber')}${kpi('Waiting for payment', waiting, 'Guests requesting the bill', 'purple')}</div><div class="section-space">${card('Configured tables', 'Names are editable. Occupied tables cannot be disabled.', table([
                'Table',
                'Status',
                'Availability',
                'Actions'
            ], data.tables.map(t => `<tr><td>${esc(t.name)}</td><td>${t.active ? badge('active') : '<span class="badge neutral">Archived</span>'}</td><td>${t.active ? (tableState(t.id) === 'waiting' ? 'Waiting for payment' : tableState(t.id)) : 'Inactive'}</td><td>${btn('Edit', 'edit-table', { id: t.id, small: true })} ${btn('Remove', 'remove-item', { id: 'table:' + esc(t.id), small: true, danger: true })}</td></tr>`)))}</div>`;
        return `${header('Restaurant Tables', 'See which tables are vacant, dining or waiting for the final bill.', btn('+ New Table Order', 'nav-neworder', { primary: true }))}<div class="grid cols4">${kpi('Available tables', active.length, 'Active dining tables')}${kpi('Vacant', vacant, 'Ready for new guests', 'green')}${kpi('Occupied', occupiedTables, 'Guests currently dining', 'amber')}${kpi('Waiting for payment', waiting, 'Bill can be settled or posted', 'purple')}</div><div class="section-space">${card('Floor overview', 'Click any table to add items or close its bill.', `<div class="table-legend"><span class="legend-dot vacant-dot"></span> Vacant <span class="legend-dot occupied-dot"></span> Occupied <span class="legend-dot waiting-dot"></span> Waiting for payment</div>${tableTiles(active)}`)}</div><p class="hint">Table availability is based on unfinished orders. Room posting never happens during order creation.</p>`;
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
    function dashboard() {
        if (role === 'restaurant')
            return restaurantDashboard();
        if (role === 'admin')
            return adminDashboard();
        const st = data.stays.filter(s => s.active);
        const owed = st.filter(s => dueForStay(s.id) > 0);
        return `${header('Front Desk Dashboard', 'Monitor room occupancy, guest stays and unpaid extra charges.', btn('+ Register Stay', 'register-stay', { primary: true }))}<div class="grid cols4">${kpi('Occupied rooms', occupied(), 'Active guest stays')}${kpi('Vacant rooms', vacantRooms(), 'Rooms without an active stay', 'green')}${kpi('Rooms with unpaid charges', owed.length, 'Guests with charges to settle', 'amber')}${kpi('Unpaid balance', money(pendingCharges().reduce((n, c) => n + remain(c), 0)), 'Restaurant + additional services', 'purple')}</div><div class="grid cols2 section-space">${card('Rooms with unpaid charges', 'Room charges awaiting payment.', table([
            'Room',
            'Guest',
            'Amount due',
            'Action'
        ], owed.slice(0, 5).map(s => `<tr><td>${roomLabel(s.room)}</td><td>${esc(s.name || 'Guest')}</td><td class="text-amber">${money(dueForStay(s.id))}</td><td>${btn('View Charges', 'view-charges', { id: s.id, small: true })}</td></tr>`)), btn('All balances →', 'nav-balances', { small: true }))}${card('Quick actions', 'What do you need to do?', `<div class="actions-stack">${tile('Register Room Stay', 'Assign a guest to a vacant room', 'register-stay')}${tile('View Rooms', 'Check room occupancy', 'nav-rooms')}${tile('Add Service Charge', 'Post a requested service to a stay', 'nav-addservice')}${tile('Review Unpaid Balances', 'Record payments collected outside the app', 'nav-balances')}</div>`)}</div><div class="section-space">${card('Room activity today', 'Operational overview', `<div class="bottom-info"><div><small>Active stays</small><strong>${occupied()} rooms</strong></div><div><small>Rooms with balances</small><strong>${owed.length} rooms</strong></div><div><small>Vacant rooms</small><strong class="text-teal">${vacantRooms()} rooms</strong></div></div>`)}</div><p class="hint">Demo data only. Accommodation or room-rental charges are never included.</p>`;
    }
    function restaurantDashboard() {
        const active = data.tables.filter(t => t.active), waiting = active.filter(t => tableState(t.id) === 'waiting'), busy = active.filter(t => tableState(t.id) === 'occupied');
        const pending = data.orders.filter(o => ['pending', 'awaiting_payment'].includes(o.status)).length;
        return `${header('Restaurant Dashboard', 'Manage restaurant tables, orders and end-of-meal payments.', btn('View All Tables', 'nav-tables', { primary: true }))}
 <div class="grid cols4">${kpi('Restaurant tables', active.length, 'Configured by Admin')}${kpi('Occupied tables', busy.length, 'Guests are dining', 'green')}${kpi('Waiting for payment', waiting.length, 'Ready for the final bill', 'amber')}${kpi('Open orders', pending, 'Not yet paid or posted', 'purple')}</div>
 <div class="section-space">${card('Restaurant floor • quick view', 'Select a table to take orders or finish a bill.', tableTiles(active.slice(0, 8)), btn('Open table overview →', 'nav-tables', { small: true }))}</div>
 <div class="grid cols2 section-space">${card('Recent restaurant orders', 'Payment destination is decided at the end of the meal.', table([
            'Order',
            'Destination',
            'Total',
            'Status',
            'Action'
        ], data.orders.slice(0, 5).map(orderRow)), btn('All orders →', 'nav-orders', { small: true }))}${card('Quick actions', 'Daily restaurant tasks', `<div class="actions-stack">${tile('Restaurant Tables', 'Occupancy and quick order entry', 'nav-tables')}${tile('Create New Order', 'Add items for a restaurant table', 'nav-neworder')}${tile('Orders Waiting for Payment', 'Let guests choose cash or room posting', 'nav-cash')}${tile('Posted Room Charges', 'Track charges sent to Front Desk', 'nav-roomcharges')}</div>`)}</div>
 <p class="hint">Orders start on a restaurant table. Guests choose direct payment or room posting only when they finish eating.</p>`;
    }
    function adminDashboard() {
        const latest = [...data.audit].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);
        return `${header('Administration Dashboard', 'Review staff activity and manage resortOS from one place.', btn('Open Audit Log', 'nav-audit', { primary: true }))}
 <div class="grid cols4">${kpi('Audit events', data.audit.length, 'Actions recorded in this browser')}${kpi('Resort rooms', data.rooms.length, 'Room inventory', 'green')}${kpi('Restaurant tables', data.tables.filter(t => t.active).length, 'Active tables', 'amber')}${kpi('Service catalog', data.services.filter(s => s.active).length, 'Active additional services', 'purple')}</div>
 <div class="grid cols2 section-space">${card('Admin shortcuts', 'Everything important is two clicks away.', `<div class="actions-stack">${tile('Audit Log', 'Find payments, updates, voids and employee actions', 'nav-audit')}${tile('System Management', 'Rooms, tables, menu, services and users', 'nav-system')}</div>`)}${card('Latest audit events', 'Recorded staff actions — select an event for details', latest.length ? latest.map(a => `<button class="audit-recent" data-action="view-audit" data-id="${esc(a.id)}"><span class="audit-recent-icon ${auditTypeClass(a.type)}">${auditIcon(a.type)}</span><span><strong>${esc(a.action)}</strong><small>${esc(a.by)} · ${prettyTime(a.time)}</small></span><span class="audit-arrow">›</span></button>`).join('') : '<div class="empty">No activity recorded yet.</div>', btn('View full audit history →', 'nav-audit', { small: true }))}</div>`;
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
            title: 'Users & Roles',
            desc: 'Review role permissions and access boundaries.'
        }
    ];
    function systemManagementPage() {
        return `${header('System Management', 'Choose which part of resortOS you want to configure.')}
 <div class="settings-intro"><div class="settings-intro-mark">⚙</div><div><strong>System configuration</strong><p>Everything your resort administrator maintains, organized in one place. Changes to settings are recorded in the Audit Log.</p></div></div>
 <div class="settings-grid">${managementPages.map(p => `<button class="settings-link" data-nav="${p.id}"><span class="settings-icon">${p.icon}</span><span class="settings-copy"><strong>${p.title}</strong><small>${p.desc}</small></span><span class="settings-arrow">›</span></button>`).join('')}</div>
 <div class="notice section-space">Audit records are for review, not editing or deleting. Employee actions are logged as events for accountability. Real tamper-proof logs will require authenticated backend storage.</div>`;
    }
    function rooms() {
        const q = search.toLowerCase();
        let list = data.rooms.filter(r => (role === 'admin' || r.active !== false) && String(r.id).includes(q));
        return `${header(role === 'admin' ? 'Rooms Manager' : 'Rooms', 'View room availability and open active stays.', role === 'admin' ? btn('+ Add Room', 'add-room', { primary: true }) : btn('+ Register Stay', 'register-stay', { primary: true }))}<div class="toolbar"><input class="input" data-search placeholder="Search by room number…" value="${esc(search)}"><span class="text-muted">${occupied()} occupied · ${vacantRooms()} vacant</span></div><div class="rooms-grid">${list.map(r => {
            const st = stayFor(r.id), due = st ? dueForStay(st.id) : 0;
            return `<article class="room-card"><span>${r.active === false ? '<span class="badge neutral">Archived</span>' : badge(st ? 'occupied' : 'vacant')}</span><h3>Room ${r.id}</h3><div class="text-muted">${st ? esc(st.name || 'Guest') : 'Available for a new stay'}</div><div class="room-footer"><small>${st ? (due ? money(due) + ' unpaid' : 'No unpaid charges') : r.active === false ? 'Archived room' : 'No active stay'}</small>${role === 'admin' ? `${r.active === false ? btn('Restore', 'restore-room', { id: r.id, small: true }) : ''}${btn('Remove', 'remove-item', { id: 'room:' + r.id, small: true, danger: true })}` : st ? btn('View', 'view-stay', { id: st.id, small: true }) : btn('Register', 'register-room', { id: r.id, small: true })}</div></article>`;
        }).join('')}</div>`;
    }
    function stays() {
        return `${header('Room Stays', 'Only active guest stays are displayed here.', btn('+ Register Stay', 'register-stay', { primary: true }))}${card('Active guest stays', 'Select a stay to see service and restaurant charges.', table([
            'Stay',
            'Room',
            'Guest',
            'Check in',
            'Expected checkout',
            'Unpaid',
            'Action'
        ], data.stays.filter(s => s.active).map(s => `<tr><td>${esc(s.id)}</td><td>${roomLabel(s.room)}</td><td>${esc(s.name || 'Guest')}</td><td>${esc(s.checkin)}</td><td>${esc(s.checkout)}</td><td class="text-amber">${money(dueForStay(s.id))}</td><td>${btn('View Stay', 'view-stay', { id: s.id, small: true })}</td></tr>`)))}`;
    }
    function chargesPage() {
        const tabs = `<div class="workspace-tabs" role="group" aria-label="Charge workspace"><button type="button" class="workspace-tab ${chargesTab === 'unpaid' ? 'active' : ''}" data-action="charges-tab" data-id="unpaid" aria-pressed="${chargesTab === 'unpaid'}">Unpaid Balances</button><button type="button" class="workspace-tab ${chargesTab === 'services' ? 'active' : ''}" data-action="charges-tab" data-id="services" aria-pressed="${chargesTab === 'services'}">Service Charges</button></div>`;
        const action = chargesTab === 'unpaid' ? btn('+ Add Service Charge', 'nav-addservice', { primary: true }) : btn('View Unpaid Balances', 'nav-balances');
        const content = chargesTab === 'unpaid' ? balances(true) : servicePage(true);
        return `${header('Charges', 'Review unpaid restaurant and service charges, or add a requested extra service.', action)}${tabs}${content}`;
    }
    function balances(embedded = false) {
        const rows = pendingCharges().map(c => {
            const s = data.stays.find(x => x.id === c.stayId);
            return `<tr><td>${s ? roomLabel(s.room) : '—'}</td><td>${esc(c.label)}</td><td>${c.source === 'restaurant' ? 'Restaurant' : 'Service'}</td><td>${money(c.amount)}</td><td>${money(c.paid)}</td><td class="text-amber">${money(remain(c))}</td><td>${btn('Record Payment', 'pay-charge', { id: c.id, small: true })}</td></tr>`;
        });
        return `${embedded ? '' : header('Unpaid Balances', 'Additional services and restaurant charges posted to guest stays.')}${card('Outstanding room charges', 'Payments are collected outside resortOS.', table([
            'Room',
            'Charge',
            'Type',
            'Total',
            'Paid',
            'Due',
            'Action'
        ], rows))}`;
    }
    function servicePage(embedded = false) {
        const st = data.stays.filter(s => s.active), sv = data.services.filter(x => x.active);
        return `${embedded ? '' : header('Add Service Charge', 'Post only extra services a guest asks to add to their active stay.')}${card('Additional service charge', 'Duration and extra-unit fields appear only when Admin enables them for a service.', `<form id="service-form"><div class="form-grid"><div class="field"><label for="svc-room">Active room</label><select class="select" id="svc-room" name="room" required>${st.map(s => `<option value="${s.room}">${roomLabel(s.room)} · ${esc(s.name || 'Guest')}</option>`).join('')}</select></div><div class="field"><label for="svc-id">Service</label><select class="select" id="svc-id" name="service" required>${sv.map(s => `<option value="${s.id}">${esc(s.name)} · ${money(s.rate)} / ${esc(s.unit)}</option>`).join('')}</select></div><div class="field"><label for="svc-qty" id="svc-qty-label">Quantity</label><input class="input" id="svc-qty" name="qty" type="number" min="0.01" step="0.01" value="1" required></div><div class="field" id="svc-units-wrap" hidden><label id="svc-units-label" for="svc-duration">Additional units</label><input class="input" id="svc-duration" name="units" type="number" min="0.01" step="0.01" value="1"></div></div><div class="service-estimate"><div><span>Calculated service charge</span><strong id="svc-price-note">Select a service</strong></div><b id="svc-preview-total">—</b></div><div class="notice">Only post charges requested by a guest. Services paid immediately are outside this app.</div><div style="margin-top:20px"><button class="btn primary" type="submit" ${!st.length || !sv.length ? 'disabled' : ''}>Post Service Charge</button></div></form>`)}`;
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
        return `${header('Checkout Review', 'Review and settle every incidental charge without leaving the checkout window.')}${card('Active stays', 'Review charges and record payment in one continuous checkout workflow.', table([
            'Room',
            'Guest',
            'Checkout date',
            'Outstanding',
            'Action'
        ], data.stays.filter(s => s.active).map(s => `<tr><td>${roomLabel(s.room)}</td><td>${esc(s.name || 'Guest')}</td><td>${esc(s.checkout)}</td><td class="text-amber">${money(dueForStay(s.id))}</td><td>${btn('Review & Checkout', 'checkout-stay', { id: s.id, small: true })}</td></tr>`)))}`;
    }
    function orderRow(o) {
        return `<tr><td>#${esc(o.id)}</td><td>${o.destination === 'room' ? roomLabel(o.room) + (o.table ? ' · ' + esc(tableName(o.table)) : '') : esc(tableName(o.table))}</td><td>${money(total(o))}</td><td>${badge(o.status)}</td><td>${btn('View Order', 'view-order', { id: o.id, small: true })}</td></tr>`;
    }
    function orders() {
        let arr = data.orders.filter(o => filter === 'all' || o.status === filter).filter(o => (o.id + ' ' + o.room + ' ' + o.table).toLowerCase().includes(search.toLowerCase()));
        return `${header('Restaurant Orders', 'Manage table orders, guest room postings and direct payments.', btn('+ New Order', 'nav-neworder', { primary: true }))}<div class="grid cols4">${kpi('All orders', data.orders.length, 'Recorded transactions')}${kpi('Pending', data.orders.filter(x => ['pending', 'awaiting_payment'].includes(x.status)).length, 'Dining or awaiting payment', 'amber')}${kpi('Posted to rooms', data.orders.filter(x => x.status === 'posted').length, 'Sent to active stays', 'green')}${kpi('Paid directly', data.orders.filter(x => x.status === 'paid').length, 'Restaurant checkout', 'purple')}</div><div class="section-space">${card('All restaurant orders', 'Find an order by reference, table or room.', `<div class="toolbar"><input class="input" data-search placeholder="Search orders…" value="${esc(search)}"><select class="select" data-filter>${[
            'all',
            'pending',
            'awaiting_payment',
            'posted',
            'paid',
            'void'
        ].map(v => `<option value="${v}" ${filter === v ? 'selected' : ''}>${v === 'all' ? 'All statuses' : v === 'awaiting_payment' ? 'Waiting for payment' : v[0].toUpperCase() + v.slice(1)}</option>`).join('')}</select></div>${table([
            'Reference',
            'Destination',
            'Amount',
            'Status',
            'Created',
            'Action'
        ], arr.map(o => `<tr><td>#${esc(o.id)}</td><td>${o.destination === 'room' ? roomLabel(o.room) : 'Table ' + esc(o.table)}</td><td>${money(total(o))}</td><td>${badge(o.status)}</td><td>${prettyTime(o.created)}</td><td>${btn('View Order', 'view-order', { id: o.id, small: true })}</td></tr>`))}`)}</div>`;
    }
    function newOrder() {
        const ts = data.tables.filter(t => t.active);
        if (!ts.some(t => t.id === String(currentTable))) {
            currentTable = ts[0]?.id || '';
        }

        const selected = Object.entries(cart)
            .filter(([, quantity]) => quantity > 0)
            .map(([id, quantity]) => ({
                ...data.menu.find(item => item.id === Number(id)),
                qty: quantity
            }))
            .filter(item => item.id);
        const items = data.menu.filter(item => item.active);
        const categories = [...new Set(items.map(item => (item.category || 'Other').trim() || 'Other'))];
        if (menuCategory !== null && !categories.includes(menuCategory)) {
            menuCategory = null;
        }

        const addedTotal = selected.reduce((sum, item) => sum + item.price * item.qty, 0);
        const open = tableOpenOrders(currentTable);
        const existing = open[0];
        const waiting = existing?.status === 'awaiting_payment';
        const hasExisting = !!existing;
        const prev = existing ? total(existing) : 0;
        const name = tableName(currentTable);
        const heading = hasExisting ? 'Add Items to ' + name : 'New Restaurant Order';
        const intro = hasExisting
            ? 'Existing orders stay intact. Add food or drinks to the same ongoing bill.'
            : 'Start a new table order. Payment is chosen only after the meal.';

        const newItems = selected.length
            ? selected.map(item => `
                <div class="item-line">
                    <div>
                        <strong>${esc(item.name)} × ${item.qty}</strong>
                        <small>${money(item.price)} each</small>
                    </div>
                    <span class="line-amount">${money(item.price * item.qty)}</span>
                </div>
            `).join('')
            : '<div class="empty compact-empty">Choose a category, then add food or drinks with the + buttons.</div>';

        const existingItems = hasExisting
            ? `
                <div class="existing-order-note">
                    <strong>Current order #${esc(existing.id)} · ${money(prev)}</strong>
                    <span>This amount stays on the bill when you add more items.</span>
                </div>
                ${existing.items.map(item => `
                    <div class="order-old-row">
                        <span>${esc(item.name)} × ${item.qty}</span>
                        <strong>${money(item.price * item.qty)}</strong>
                    </div>
                `).join('')}
            `
            : '';

        const menuContent = menuCategory === null
            ? `
                <div class="catalog-category-head">
                    <strong>Choose a food category</strong>
                    <span>${categories.length} categor${categories.length === 1 ? 'y' : 'ies'}</span>
                </div>
                <div class="catalog-category-grid">
                    ${categories.map(category => {
                        const group = items.filter(item => (item.category || 'Other').trim() === category);
                        const inCart = group.reduce((sum, item) => sum + (cart[item.id] || 0), 0);
                        const initials = category.split(/\s+/).slice(0, 2).map(word => word[0]?.toUpperCase() || '').join('');
                        return `
                            <button
                                type="button"
                                class="catalog-category-tile"
                                data-action="menu-category"
                                data-id="${esc(category)}"
                                aria-label="View ${esc(category)} menu items"
                            >
                                <span class="catalog-category-glyph" aria-hidden="true">${esc(initials)}</span>
                                <span class="catalog-category-info">
                                    <strong>${esc(category)}</strong>
                                    <small>${group.length} item${group.length === 1 ? '' : 's'}${inCart ? ` · ${inCart} selected` : ''}</small>
                                </span>
                                <span class="catalog-category-arrow" aria-hidden="true">›</span>
                            </button>
                        `;
                    }).join('') || '<div class="empty">No available menu items. Ask Admin to update the menu.</div>'}
                </div>
            `
            : `
                <div class="catalog-category-navigation">
                    <button type="button" class="catalog-back" data-action="menu-category-back">
                        <span aria-hidden="true">←</span> All categories
                    </button>
                    <span class="catalog-category-label">${esc(menuCategory)}</span>
                </div>
                <div class="catalog-category-head">
                    <strong>${esc(menuCategory)}</strong>
                    <span>${items.filter(item => (item.category || 'Other').trim() === menuCategory).length} available items</span>
                </div>
                <div class="catalog-grid">
                    ${items.filter(item => (item.category || 'Other').trim() === menuCategory).map(item => `
                        <div class="menu-card">
                            <strong>${esc(item.name)}</strong>
                            <small>${esc(item.category || 'Other')}</small>
                            <div class="price-row">
                                <b>${money(item.price)}</b>
                                <div class="qty-control">
                                    <button type="button" data-action="cart-minus" data-id="${item.id}" aria-label="Remove ${esc(item.name)}" ${waiting ? 'disabled' : ''}>−</button>
                                    <span>${cart[item.id] || 0}</span>
                                    <button type="button" data-action="cart-plus" data-id="${item.id}" aria-label="Add ${esc(item.name)}" ${waiting ? 'disabled' : ''}>+</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

        const menuPanel = card(
            '1  Menu items',
            hasExisting ? 'Select only the new items to add.' : 'Choose items for this table.',
            menuContent
        );

        const orderPanel = card(
            '2  Table order',
            'The guest decides how to pay only when finished eating.',
            `
                <div class="field">
                    <label for="table-choice">Restaurant table</label>
                    <select id="table-choice" class="select">
                        ${ts.map(t => `
                            <option value="${esc(t.id)}" ${t.id === String(currentTable) ? 'selected' : ''}>
                                ${esc(t.name)}${tableState(t.id) !== 'vacant' ? ' · ' + (tableState(t.id) === 'waiting' ? 'Waiting for payment' : 'Occupied') : ''}
                            </option>
                        `).join('')}
                    </select>
                </div>
                ${open.length > 1 ? '<div class="notice warning">This table has multiple older open orders. Ask your supervisor to review them before adding items.</div>' : ''}
                ${waiting ? `
                    <div class="notice warning">
                        <strong>This table is waiting for payment.</strong>
                        To take another order, reopen dining from the table overview.
                    </div>
                    <div style="margin-top:15px">${btn('Return to Table', 'open-table', { id: currentTable })}</div>
                ` : ''}
                ${existingItems}
                <div class="section-label" style="margin-top:22px">
                    ${hasExisting ? 'New items to add' : 'Items for this order'}
                </div>
                ${newItems}
                <div class="order-totals">
                    <div><span>Current bill</span><strong>${money(prev)}</strong></div>
                    <div><span>New items</span><strong>${money(addedTotal)}</strong></div>
                    <div class="order-total-final">
                        <strong>Updated bill total</strong>
                        <b>${money(prev + addedTotal)}</b>
                    </div>
                </div>
                <button class="btn primary full" id="save-order" ${!selected.length || !ts.length || waiting || open.length > 1 ? 'disabled' : ''}>
                    ${hasExisting ? 'Add Items to Existing Order' : 'Save Order to Table'}
                </button>
                <p class="hint">You can switch categories without losing selected items. Changing tables clears unsaved selections. Payment is chosen only after guests finish dining.</p>
            `
        );

        return `${header(heading, intro)}<div class="grid cols-split">${menuPanel}${orderPanel}</div>`;
    }
    function roomChargesPage() {
        const tabs = `<div class="workspace-tabs" role="group" aria-label="Restaurant room charge workspace"><button type="button" class="workspace-tab ${roomChargesTab === 'charges' ? 'active' : ''}" data-action="roomcharges-tab" data-id="charges" aria-pressed="${roomChargesTab === 'charges'}">Room Charges</button><button type="button" class="workspace-tab ${roomChargesTab === 'posts' ? 'active' : ''}" data-action="roomcharges-tab" data-id="posts" aria-pressed="${roomChargesTab === 'posts'}">Today's Posts</button></div>`;
        return `${header('Room Charges', 'Review restaurant bills posted to rooms and their posting history.', btn('View Tables', 'nav-tables', { primary: true }))}${tabs}${roomChargesTab === 'posts' ? posts(true) : roomCharges(true)}`;
    }
    function roomCharges(embedded = false) {
        const posted = data.orders.filter(o => o.destination === 'room');
        return `${embedded ? '' : header('Restaurant Room Charges', 'View restaurant charges assigned to guest rooms.')}${card('Room posting history', 'Settlement is handled only by Front Desk.', table([
            'Order',
            'Room',
            'Amount',
            'Status',
            'Posted by',
            'Action'
        ], posted.map(o => `<tr><td>#${esc(o.id)}</td><td>${roomLabel(o.room)}</td><td>${money(total(o))}</td><td>${badge(o.status)}</td><td>${esc(o.staff)}</td><td>${btn('View', 'view-order', { id: o.id, small: true })}</td></tr>`)))}`;
    }
    function posts(embedded = false) {
        const posted = data.orders.filter(o => o.destination === 'room').sort((a, b) => b.created.localeCompare(a.created));
        return `${embedded ? '' : header('Today’s Posts', 'Review room charges posted by restaurant staff.')}${card('Restaurant posting history', 'Void actions are retained as an audit record.', posted.map(o => `<div class="item-line"><div><strong>#${esc(o.id)} · ${roomLabel(o.room)}</strong><small>${esc(o.staff)} · ${prettyTime(o.created)}</small></div><div style="display:flex;align-items:center;gap:12px">${badge(o.status)} <strong>${money(total(o))}</strong>${btn('Details', 'view-order', { id: o.id, small: true })}</div></div>`).join('') || '<div class="empty">No room postings.</div>')}`;
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
    const ticketOwner = (t, activeRole = role) => t.role === activeRole && t.byRole === activeRole;
    const ticketSharedWith = (t, activeRole = role) => {
        if (activeRole === 'admin') return true;
        const visibility = ticketVisibility(t);
        return visibility === 'all' || (visibility === 'department' && t.role === activeRole);
    };
    const ticketCanView = t => role === 'admin' || ticketOwner(t) || ticketSharedWith(t);
    const ticketAudience = t => ticketVisibility(t) === 'all'
        ? ['frontdesk', 'restaurant']
        : ticketVisibility(t) === 'department' ? [t.role] : [];
    const ticketVisibilityLabel = t => ticketVisibilities[ticketVisibility(t)];
    const ticketVisibilityBadge = t => `<span class="ticket-visibility ${ticketVisibility(t)}">${ticketVisibility(t) === 'private' ? '🔒' : ticketVisibility(t) === 'department' ? '◉' : '◎'} ${esc(ticketVisibilityLabel(t))}</span>`;
    const ticketSharedOnly = t => role !== 'admin' && !ticketOwner(t);
    const ticketClass = status => ({ open: 'amber', progress: 'violet', waiting: 'neutral', resolved: 'green' }[status] || 'neutral');
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
    const ticketIdentity = () => ({ frontdesk: 'Front Desk Staff', restaurant: 'Restaurant Staff', admin: 'Admin' }[role] || 'Employee');
    const ticketOrder = () => [...(data.tickets || [])].filter(ticketCanView).sort((a, b) => {
        if (a.status !== 'resolved' && b.status === 'resolved') return -1;
        if (a.status === 'resolved' && b.status !== 'resolved') return 1;
        if (a.priority !== b.priority) return a.priority === 'urgent' ? -1 : 1;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
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
            <span class="ticket-focus-caption">The sidebar only shows new tickets (Admin), status changes and replies.</span>
        </div>`;
        const select = (label, key, values) => `<div class="ticket-filter"><label for="ticket-filter-${key}">${label}</label><select id="ticket-filter-${key}" class="select" data-ticket-filter="${key}"><option value="all">All ${label.toLowerCase()}</option>${Object.entries(values).map(([value, name]) => `<option value="${esc(value)}" ${ticketFilters[key] === value ? 'selected' : ''}>${esc(name)}</option>`).join('')}</select></div>`;
        const stats = role === 'admin' ? `<div class="grid cols4 ticket-stats">${kpi('Unresolved', all.filter(t => t.status !== 'resolved').length, 'Tickets needing follow-up', 'amber')}${kpi('Urgent', all.filter(t => t.priority === 'urgent' && t.status !== 'resolved').length, 'Unresolved urgent tickets', 'purple')}${kpi('Waiting for staff', all.filter(t => t.status === 'waiting').length, 'Employee response needed')}${kpi('Resolved', all.filter(t => t.status === 'resolved').length, 'Retained in ticket history', 'green')}</div>` : '';
        const rows = filtered.map(t => `<tr><td><strong>${esc(t.id)}</strong><small>${esc(prettyTime(t.createdAt))}</small></td><td><strong>${esc(t.subject)}</strong>${ticketNeedsAttention(t) ? '<span class="ticket-unread-indicator">New</span>' : ''}<small>${esc(ticketCategories[t.category] || 'Other')}${t.location ? ' · ' + esc(t.location) : ''}</small><small>${ticketVisibilityBadge(t)}</small></td>${role === 'admin' ? `<td>${esc(ticketRoleLabel(t.role))}<small>${esc(t.author)}</small></td>` : ''}<td>${ticketPriority(t.priority)}</td><td>${ticketBadge(t.status)}</td><td><strong>${esc(prettyTime(t.updatedAt))}</strong></td><td>${btn(ticketSharedOnly(t) ? 'View Issue →' : 'View Ticket →', 'ticket-view', { id: t.id, small: true })}</td></tr>`);
        const mobileCards = filtered.map(t => `<article class="ticket-mobile-card"><div class="ticket-mobile-top"><strong>${esc(t.id)}</strong>${ticketBadge(t.status)}</div><h3>${esc(t.subject)} ${ticketNeedsAttention(t) ? '<span class="ticket-unread-indicator">New</span>' : ''}</h3><p>${esc(ticketCategories[t.category])} · ${ticketVisibilityBadge(t)}</p><div class="ticket-mobile-bottom"><span>${ticketPriority(t.priority)} · ${esc(prettyTime(t.updatedAt))}</span>${btn(ticketSharedOnly(t) ? 'View Issue →' : 'View Ticket →', 'ticket-view', { id: t.id, small: true })}</div></article>`).join('');
        const description = role === 'admin' ? 'Review, respond to, and share issues across the resort.' : 'Manage your requests and see issues shared with your team.';
        const sectionTitle = ticketFilters.attention === 'needs' ? 'Tickets with new activity' : view === 'shared' ? 'Shared Issues' : view === 'resolved' ? 'Resolved Ticket History' : role === 'admin' ? 'All support tickets' : 'My Tickets';
        const empty = ticketFilters.attention === 'needs' ? 'No new ticket activity right now.' : view === 'shared' ? 'No shared issues match these filters.' : view === 'resolved' ? 'No resolved tickets match these filters.' : 'No matching tickets. Try clearing the filters or create a request.';
        return `${header('Support & Issues', description, role !== 'admin' ? btn('+ Create Ticket', 'ticket-create', { primary: true }) : '')}${stats}
            <section class="card section-space ticket-workspace"><div class="card-head"><div><h2>${sectionTitle}</h2><p class="sub">${view === 'shared' ? 'Visible issue summaries and official management updates. Private conversations stay private.' : 'Search and review tickets. Replies and history are preserved.'}</p></div><span class="audit-match-count">${filtered.length} of ${visible.length} tickets</span></div>${focusControls}
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
        const sharedSummary = `<div class="ticket-detail-summary"><div>${ticketBadge(t.status)} ${ticketPriority(t.priority)} ${ticketVisibilityBadge(t)}</div><p><strong>${esc(ticketCategories[t.category])}</strong> · ${esc(ticketRoleLabel(t.role))} · ${esc(prettyTime(t.createdAt))}</p>${t.location ? `<p><strong>Location:</strong> ${esc(t.location)}</p>` : ''}</div>
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
            <div class="field"><label for="manage-ticket-visibility">Who can see this issue?</label><select class="select" id="manage-ticket-visibility" name="visibility">${Object.entries(ticketVisibilities).map(([key, name]) => `<option value="${key}" ${ticketVisibility(t) === key ? 'selected' : ''}>${esc(name)}</option>`).join('')}</select></div>
            <div class="field" id="ticket-visibility-reason-wrap" hidden><label for="ticket-visibility-reason">Reason for changing visibility</label><input class="input" id="ticket-visibility-reason" name="visibilityReason" maxlength="300" placeholder="Why should the audience change?"></div>
            <button class="btn" type="submit">Save Ticket Settings</button></form>
            <form id="ticket-public-update-form" class="ticket-reply-form"><input type="hidden" name="id" value="${esc(t.id)}"><label for="ticket-public-update">Publish a shared update</label><textarea class="input ticket-textarea" id="ticket-public-update" name="message" minlength="3" maxlength="1200" rows="2" placeholder="An update visible to everyone allowed to see the issue…" required></textarea><button class="btn" type="submit">Publish Update</button></form>` : t.status === 'resolved' ? `<div class="ticket-form-actions">${btn('Reopen Ticket', 'ticket-reopen', { id: t.id, primary: true })}</div>` : '';
        showModal(`Ticket ${esc(t.id)}`, esc(t.subject), `<div class="ticket-detail">${sharedSummary}<div class="ticket-thread"><h3>Private Conversation & Activity</h3>${messages || '<div class="ticket-thread-empty">No replies yet.</div>'}</div>${adminControls}${reply}</div>`);
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
        if (beforeStatus === v.status && beforePriority === v.priority && beforeVisibility === v.visibility) {
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
        t.updatedAt = now;
        t.history.push({ at: now, by: 'Admin', detail: 'Ticket settings updated' });
        const changes = {};
        if (beforeStatus !== t.status) {
            changes.Status = `${ticketStatuses[beforeStatus]} → ${ticketStatuses[t.status]}`;
            ticketMarkUnread(t, t.role);
        }
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
        return `${header('Restaurant Menu', 'Manage available menu items and prices.', btn('+ Add Menu Item', 'add-menu', { primary: true }))}${card('Active menu', 'Changes affect new orders; historical order prices are retained.', table([
            'Item',
            'Category',
            'Price',
            'Status',
            'Action'
        ], data.menu.map(x => `<tr><td>${esc(x.name)}</td><td>${esc(x.category)}</td><td>${money(x.price)}</td><td>${x.active ? badge('active') : '<span class="badge neutral">Archived</span>'}</td><td>${btn('Edit', 'edit-menu', { id: x.id, small: true })} ${btn('Remove', 'remove-item', { id: 'menu:' + x.id, small: true, danger: true })}</td></tr>`)))}`;
    }
    function servicesPage() {
        return `${header('Additional Service Catalog', 'Configure services that may be posted to a guest stay.', btn('+ Add Service', 'add-catalog-service', { primary: true }))}${card('Extra services', 'Admin decides which services require a duration or extra-unit input.', table([
            'Service',
            'Rate',
            'Pricing unit',
            'Charge inputs',
            'Status',
            'Action'
        ], data.services.map(x => `<tr><td>${esc(x.name)}</td><td>${money(x.rate)}</td><td>Per ${esc(x.unit)}</td><td>${x.requiresUnits ? `Quantity + ${esc(x.unitsLabel || 'extra units')}` : 'Quantity only'}</td><td>${x.active ? badge('active') : '<span class="badge neutral">Archived</span>'}</td><td>${btn('Edit', 'edit-catalog-service', { id: x.id, small: true })} ${btn('Remove', 'remove-item', { id: 'service:' + x.id, small: true, danger: true })}</td></tr>`)))}`;
    }
    function usersPage() {
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
        remove: 'Removed / archived',
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
        return `${header('Audit Log', 'Find out who did what, when, and to which order, room, table or setting.', btn('Export Filtered CSV', 'audit-export', { primary: true }))}
 <div class="grid cols4 audit-metrics">${kpi('Recorded events', n, 'All saved actions')}${kpi('Today', todayCount, 'Actions recorded today', 'green')}${kpi('Payments', paymentCount, 'Recorded payment actions', 'purple')}${kpi('Voids / corrections', voidCount, 'Reversed or voided orders', 'amber')}</div>
 <section class="card section-space audit-workspace"><div class="card-head"><div><h2>Activity history</h2><p class="sub">Search or filter activity, then open a record for full details. Newest first.</p></div><span class="audit-match-count">${records.length} matching ${records.length === 1 ? 'event' : 'events'}</span></div>
 <div class="audit-filter-grid"><div class="audit-search-wrap"><label for="audit-search">Search records</label><input class="input" id="audit-search" data-audit-search value="${esc(auditFilters.query)}" placeholder="Order ID, room, table, employee, action…"></div>
 <div><label for="audit-module">Work area</label><select class="select" id="audit-module" data-audit-filter="module">${options(areas, auditFilters.module, 'All areas')}</select></div>
 <div><label for="audit-type">Action type</label><select class="select" id="audit-type" data-audit-filter="type">${options(types, auditFilters.type, 'All action types')}</select></div>
 <div><label for="audit-staff">Employee</label><select class="select" id="audit-staff" data-audit-filter="staff">${options(names, auditFilters.staff, 'All employees')}</select></div>
 <div><label for="audit-from">From date</label><input class="input" id="audit-from" type="date" data-audit-filter="from" value="${esc(auditFilters.from)}"></div>
 <div><label for="audit-to">To date</label><input class="input" id="audit-to" type="date" data-audit-filter="to" value="${esc(auditFilters.to)}"></div></div>
 <div class="audit-filter-footer"><span>Filters apply together to narrow the list.</span>${btn('Clear Filters', 'audit-clear', { small: true })}</div>
 <div class="table-wrap audit-table-wrap"><table class="audit-table"><thead><tr><th>Date & time</th><th>Employee</th><th>Work area</th><th>Action type</th><th>Activity</th><th>Record</th></tr></thead>
 <tbody>${visible.length ? visible.map(a => `<tr><td><strong>${esc(new Date(a.time).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }))}</strong><small>${esc(new Date(a.time).toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit', second: '2-digit' }))}</small></td><td><strong>${esc(a.by)}</strong></td><td><span class="audit-area">${esc(a.module)}</span></td><td>${auditTag(a.type)}</td><td class="audit-description"><strong>${esc(a.action)}</strong><small>${esc(a.note || '')}</small></td><td>${btn('Details →', 'view-audit', { id: a.id, small: true })}</td></tr>`).join('') : `<tr><td colspan="6"><div class="empty"><strong>No matching activity</strong>Try changing your filters or search keywords.<div style="margin-top:15px">${btn('Clear Filters', 'audit-clear')}</div></div></td></tr>`}</tbody></table></div>
 <div class="audit-pagination"><span>${records.length ? `Showing ${(auditPageNum - 1) * perPage + 1}–${Math.min(auditPageNum * perPage, records.length)} of ${records.length}` : 'No records'}</span><div>${btn('← Previous', 'audit-prev', { small: true })}<span>Page ${auditPageNum} / ${pages}</span>${btn('Next →', 'audit-next', { small: true })}</div></div></section>
 <p class="audit-security-note">Audit history is read-only in the interface. This V1 demo stores events only in this browser; the final system must use an authenticated, append-only server audit log for reliable employee tracking.</p>`;
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
        document.getElementById('modal-root').innerHTML = `<div class="modal-overlay" data-action="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><div><h2>${title}</h2><p class="sub">${subtitle}</p></div><div class="modal-help-actions"><button class="modal-help-btn" type="button" data-action="help-open" aria-label="Help with this window" title="Help with this window">? Help</button><button class="icon-btn" data-action="modal-close" aria-label="Close">×</button></div></div><div class="modal-body">${body}</div>${footer ? `<div class="modal-footer">${footer}</div>` : ''}</section></div>`;
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
        showModal(roomLabel(s.room) + ' · Stay Details', 'Guest stay and charges', `<div class="grid form-grid"><div><div class="section-label">Guest</div><strong>${esc(s.name || 'Guest')}</strong></div><div><div class="section-label">Status</div>${badge(s.active ? 'active' : 'settled')}</div><div><div class="section-label">Check in</div><strong>${esc(s.checkin)}</strong></div><div><div class="section-label">Expected checkout</div><strong>${esc(s.checkout)}</strong></div></div><div class="checkout-total"><strong>Outstanding incidental charges</strong><b>${money(dueForStay(s.id))}</b></div>${charges.map(c => `<div class="item-line"><div><strong>${esc(c.label)}</strong><small>${money(c.amount)} total · ${esc(c.source)}</small></div><div>${badge(c.status)}<div class="text-amber" style="margin-top:5px;text-align:right">${money(remain(c))} due</div></div></div>`).join('') || '<div class="empty">No charges yet.</div>'}`, `${btn('View Charges', 'modal-charges', { id: s.id })}${role === 'frontdesk' ? btn('Review Checkout', 'checkout-stay', { id: s.id, primary: true }) : ''}`);
    }
    function viewCharges(stayId) {
        let s = data.stays.find(x => x.id === stayId);
        if (!s)
            return;
        const all = data.charges.filter(c => c.stayId === stayId);
        showModal(`${roomLabel(s.room)} · Room Charges`, 'Restaurant and additional service charges only', `${all.map(c => `<div class="item-line"><div><strong>${esc(c.label)}</strong><small>${esc(c.source)} · ${prettyTime(c.date)} · ${money(c.amount)} total</small><small>${badge(c.status)} ${money(remain(c))} outstanding</small></div>${remain(c) > 0 ? btn('Record Payment', 'pay-charge', { id: c.id, small: true }) : ''}</div>`).join('') || '<div class="empty">No charges recorded for this stay.</div>'}<div class="checkout-total"><strong>Outstanding balance</strong><b>${money(dueForStay(stayId))}</b></div>`);
    }
    function viewOrder(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o)
            return;
        showModal('Order #' + esc(o.id), 'Restaurant order and transaction details', `<div class="item-line"><strong>${o.destination === 'room' ? roomLabel(o.room) + (o.table ? ' · ' + esc(tableName(o.table)) : '') : esc(tableName(o.table))}</strong>${badge(o.status)}</div>${o.items.map(i => `<div class="item-line"><div><strong>${esc(i.name)} × ${i.qty}</strong><small>${money(i.price)} each</small></div><span class="line-amount">${money(i.qty * i.price)}</span></div>`).join('')}<div class="checkout-total"><strong>Total</strong><b>${money(total(o))}</b></div><div class="notice">${o.destination === 'room' ? 'This order was posted to a room. Front Desk handles collection and settlement.' : 'Restaurant orders are settled after the guest finishes dining.'}</div><p class="hint">Created by ${esc(o.staff)} · ${prettyTime(o.created)}</p>`, `${o.destination === 'table' && o.status === 'awaiting_payment' ? btn('Choose Payment', 'table-bill', { id: o.id, primary: true }) : ''}${o.status === 'pending' ? btn('Add Items', 'edit-order', { id: o.id }) + btn('Mark Waiting for Payment', 'table-ready', { id: o.table, primary: true }) : ''}${['posted', 'pending', 'awaiting_payment'].includes(o.status) ? btn('Void Order', 'void-order', { id: o.id, danger: true }) : ''}`);
    }
    function payCharge(id) {
        const c = data.charges.find(x => x.id === id);
        if (!c || remain(c) <= 0)
            return;
        const s = data.stays.find(x => x.id === c.stayId);
        showModal('Record External Payment', 'Front Desk confirms money received outside the application.', `<form id="payment-form"><input type="hidden" name="id" value="${esc(id)}"><div class="muted-panel"><div class="item-line"><strong>${esc(c.label)}</strong><span>${money(c.amount)}</span></div><div class="checkout-total"><strong>Outstanding</strong><b>${money(remain(c))}</b></div><div class="text-muted">${roomLabel(s.room)} · ${esc(s.name || 'Guest')}</div></div><div class="field"><label>Amount received (₱)</label><input class="input" name="amount" type="number" min="0.01" max="${remain(c)}" step="0.01" value="${remain(c)}" required></div><div class="field"><label>Payment method</label><select class="select" name="method"><option>Cash</option><option>Card terminal</option><option>Bank transfer</option><option>Other external payment</option></select></div><div class="notice">Partial payments are supported. Every payment is recorded in the audit log.</div><button class="btn primary full" type="submit" style="margin-top:20px">Confirm Payment Received</button></form>`);
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
        const paymentForm = unpaid.length ? `<div class="checkout-pay-panel"><h3>Record a payment</h3><p class="sub">Only enter money already received from the guest.</p><form id="checkout-pay-form"><input name="stayId" type="hidden" value="${esc(id)}"><div class="payment-simple"><div class="field"><label for="checkout-received">Amount received (₱)</label><input class="input" id="checkout-received" name="amount" inputmode="decimal" type="number" min="0.01" max="${due.toFixed(2)}" step="0.01" placeholder="Enter amount collected" required><small class="text-muted">Enter the total amount the guest actually paid, up to ${money(due)}.</small></div><div class="field"><label for="checkout-method">Payment method</label><select id="checkout-method" class="select" name="method"><option>Cash</option><option>Card terminal</option><option>Bank transfer</option><option>Other external payment</option></select></div></div><div class="notice">The amount is applied to the charges listed below, in order. Partial payments are supported. Accommodation charges are not included.</div><div class="checkout-commit"><button class="btn primary" type="submit">Record Payment</button></div></form></div><div class="checkout-list">${rows}</div>` : `<div class="notice success">No outstanding restaurant or additional service charges. You can check out this guest now.</div><div class="checkout-list">${rows}</div>`;
        showModal('Checkout · ' + roomLabel(st.room), 'Review charges, record any payment, and finish checkout here.', `<div class="checkout-summary"><div><span class="section-label">Guest / stay</span><strong>${esc(st.name || 'Guest')}</strong><small>${esc(st.checkin)} → ${esc(st.checkout)}</small></div><div><span class="section-label">Payments recorded</span><strong>${money(paid)}</strong></div><div><span class="section-label">Still to pay</span><strong class="${due ? 'text-amber' : 'text-teal'}">${money(due)}</strong></div></div><div class="checkout-section-label">Room charges · ${all.length}</div>${paymentForm}`, `${btn('Close', 'modal-close')}${!due ? btn('Complete Checkout', 'confirm-checkout', { id, primary: true }) : ''}`);
        const dialog = document.querySelector('#modal-root .modal');
        if (dialog)
            dialog.classList.add('modal-wide');
    }
    function cashPay(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o || o.destination !== 'table' || o.status !== 'awaiting_payment')
            return;
        showModal('Receive Restaurant Payment', 'Guest chose to pay directly at the end of the meal.', `<div class="muted-panel"><div class="item-line"><strong>Order #${esc(o.id)} · ${esc(tableName(o.table))}</strong>${badge(o.status)}</div><div class="checkout-total"><strong>Amount to collect</strong><b>${money(total(o))}</b></div></div><div class="field"><label>Payment method</label><select id="restaurant-payment-method" class="select"><option>Cash</option><option>Card terminal</option><option>Other external payment</option></select></div><div class="notice warning">Only confirm after actually receiving payment. The table will become vacant automatically.</div>`, `${btn('Back to Bill', 'table-bill', { id: o.id })}${btn('Confirm Payment Received', 'confirm-cash', { id: o.id, primary: true })}`);
    }
    function voidOrder(id) {
        const o = data.orders.find(x => x.id === id);
        if (!o || !['posted', 'pending', 'awaiting_payment'].includes(o.status))
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
            staff: 'Restaurant Staff',
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
 ${type === 'menu' ? `<div class="field"><label>Category</label><input class="input" name="category" required value="${esc(item?.category || 'Main Dishes')}"></div>` : `<div class="form-grid"><div class="field"><label>Pricing unit</label><select class="select" name="unit">${[
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
            action: historic ? 'Archive' : 'Delete',
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
        const detail = inUse ? 'This record is still being used in an active transaction or guest stay. Finish that work before removing it.' : historic ? 'This item has historical records. It will be archived instead of deleted, to preserve orders, charges, and audit history.' : 'This unused item can be deleted permanently. The action will still appear in the Audit Log.';
        showModal(action + ' ' + esc(label), 'Admin · safe system management', `<div class="notice ${inUse ? 'warning' : ''}">${esc(detail)}</div><form id="remove-item-form"><input name="kind" type="hidden" value="${esc(kind)}"><input name="id" type="hidden" value="${esc(id)}"><div class="field section-space"><label>Reason for ${action.toLowerCase()} *</label><textarea name="reason" class="textarea" minlength="5" required placeholder="Explain why this change is needed" ${inUse ? 'disabled' : ''}></textarea></div><div class="modal-inline-footer">${btn('Cancel', 'modal-close')}<button class="btn danger" type="submit" ${inUse ? 'disabled' : ''}>${action} ${esc(label)}</button></div></form>`);
    }
    function applyRemoval(kind, id, reason) {
        if (role !== 'admin')
            return false;
        const plan = itemRemovePlan(kind, id);
        if (!plan || plan.inUse || String(reason).trim().length < 5) {
            toast('Cannot remove this item. Check active transactions and provide a reason.', true);
            return false;
        }
        if (plan.historic)
            plan.item.active = false;
        else
            plan.arr.splice(plan.arr.indexOf(plan.item), 1);
        audit(`${plan.action === 'Delete' ? 'Deleted' : 'Archived'} ${kind} ${plan.label}`, 'Admin', {
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
        notify(['admin'], `${plan.action === 'Delete' ? 'Deleted' : 'Archived'} ${plan.label}`, `Admin changed ${kind} configuration. ${plan.historic ? 'History preserved.' : 'Unused record deleted.'}`, { kind: 'info', route: 'audit' });
        if (kind === 'menu' || kind === 'table')
            notify(['restaurant'], `${plan.action === 'Delete' ? 'Deleted' : 'Archived'} ${plan.label}`, 'Restaurant configuration has changed.', { kind: 'info', route: kind === 'table' ? 'tables' : 'orders' });
        if (kind === 'service' || kind === 'room')
            notify(['frontdesk'], `${plan.action === 'Delete' ? 'Deleted' : 'Archived'} ${plan.label}`, 'Front Desk configuration has changed.', { kind: 'info', route: 'rooms' });
        save();
        closeModal();
        render();
        toast(plan.action === 'Archive' ? 'Archived; history preserved.' : 'Unused item deleted.');
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
            case 'modal-close':
            case 'modal-backdrop':
                if (act === 'modal-backdrop' && e.target !== el)
                    break;
                closeModal();
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
                if (!o || o.destination !== 'table' || o.status !== 'awaiting_payment')
                    return;
                o.status = 'paid';
                o.paymentMethod = document.getElementById('restaurant-payment-method')?.value || 'Cash';
                o.settledAt = new Date().toISOString();
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
                toast('Payment recorded. ' + tableName(o.table) + ' is now available.');
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
                        changes: { Status: 'Archived → Active' }
                    });
                    save();
                    render();
                    toast('Room restored.');
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
    document.addEventListener('change', e => {
        if (e.target.id === 'role-switch') {
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
                const amount = Math.round(Number(v.amount) * 100) / 100;
                if (!Number.isFinite(amount) || amount <= 0 || amount > due + .001) {
                    toast('Enter an amount greater than zero, up to ' + money(due) + '.', true);
                    return;
                }
                let left = amount, count = 0, allocations = [];
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
                }
                notify(['restaurant'], 'Room payment recorded', `${roomLabel(st.room)} received ${money(amount)}. Remaining: ${money(dueForStay(st.id))}`, { kind: dueForStay(st.id) < .001 ? 'success' : 'info', route: 'roomcharges' });
                audit('Received ' + money(amount) + ' via ' + v.method + ' for ' + count + ' charge(s) at ' + roomLabel(st.room), 'Front Desk', {
                    type: 'payment',
                    target: roomLabel(st.room),
                    amount,
                    method: v.method,
                    changes: {
                        'Applied to': allocations.join('; '),
                        'Remaining balance': money(dueForStay(st.id))
                    }
                });
                save();
                render();
                checkoutStay(st.id);
                toast(dueForStay(st.id) > .001 ? 'Payment saved. Remaining balance: ' + money(dueForStay(st.id)) : 'Payment saved. Ready for checkout.');
                break;
            }
            case 'payment-form': {
                const c = data.charges.find(x => x.id === v.id), amount = Number(v.amount);
                if (!c || !Number.isFinite(amount) || amount <= 0 || amount > remain(c) + .001) {
                    toast('Invalid payment amount.', true);
                    return;
                }
                c.paid = Math.round((Number(c.paid || 0) + amount) * 100) / 100;
                c.status = remain(c) < .001 ? 'settled' : 'partial';
                if (c.source === 'restaurant')
                    notify(['restaurant'], 'Restaurant room charge payment', `${c.label} · ${money(amount)} received by Front Desk`, { kind: 'success', route: 'roomcharges' });
                audit('Recorded ' + money(amount) + ' ' + v.method + ' payment for ' + c.label, 'Front Desk', {
                    type: 'payment',
                    target: data.stays.find(s => s.id === c.stayId) ? roomLabel(data.stays.find(s => s.id === c.stayId).room) : c.id,
                    amount,
                    method: v.method,
                    changes: { Charge: c.label, 'Remaining balance': money(remain(c)) }
                });
                save();
                closeModal();
                render();
                toast('Payment recorded.');
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
                    by: 'Restaurant Staff'
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
                if (!o || !['pending', 'awaiting_payment', 'posted'].includes(o.status) || reason.length < 5) {
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
                if (!v.name.trim() || !Number.isFinite(rate) || rate < 0) {
                    toast('Name or price is invalid.', true);
                    return;
                }
                const entry = {
                    id: item?.id || Math.max(0, ...arr.map(x => x.id)) + 1,
                    name: v.name.trim(),
                    active: v.active === 'true',
                    ...(v.type === 'menu' ? { category: v.category.trim(), price: rate } : {
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
    render();
    helpOfferWelcome();
})();
