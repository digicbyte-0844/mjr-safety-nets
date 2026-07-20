/**
 * WhatsApp Enquiry Modal
 * MJR Building covering nets — Hyderabad
 * Opens a form dialog when WhatsApp button is clicked.
 * Sends pre-filled enquiry message to owner's WhatsApp.
 */

(function () {
    'use strict';

    const OWNER_WHATSAPP = '919553331979';

    // ── Modal HTML ──────────────────────────────────────────────────────────
    const modalHTML = `
    <div id="wa-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="wa-modal-title"
         style="display:none; position:fixed; inset:0; z-index:9999999;
                background:rgba(15,20,25,0.6); backdrop-filter:blur(6px);
                align-items:center; justify-content:center; padding:1rem;">

        <div id="wa-modal-box"
             style="background:#fff; border-radius:1.25rem; width:100%; max-width:440px;
                    box-shadow:0 25px 60px rgba(0,0,0,0.35); overflow:hidden;
                    animation:waBounceIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
                    font-family:'Inter','Outfit',sans-serif;">

            <!-- Header -->
            <div style="background:linear-gradient(135deg,#25D366 0%,#128C7E 100%);
                        padding:1.5rem 1.75rem; position:relative;">
                <div style="display:flex; align-items:center; gap:0.85rem;">
                    <div style="background:rgba(255,255,255,0.2); border-radius:50%;
                                width:48px; height:48px; display:flex; align-items:center;
                                justify-content:center; flex-shrink:0;">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.5l5.797-1.521A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.645-.492-5.17-1.354l-.37-.22-3.44.902.921-3.353-.241-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                        </svg>
                    </div>
                    <div>
                        <h2 id="wa-modal-title"
                            style="margin:0; color:#fff; font-size:1.15rem; font-weight:700; line-height:1.2;">
                            WhatsApp Enquiry
                        </h2>
                        <p style="margin:0.2rem 0 0; color:rgba(255,255,255,0.85); font-size:0.8rem;">
                            We'll reply within minutes!
                        </p>
                    </div>
                </div>
                <!-- Close -->
                <button id="wa-modal-close" aria-label="Close"
                        style="position:absolute; top:1rem; right:1rem; background:rgba(255,255,255,0.2);
                               border:none; border-radius:50%; width:32px; height:32px; cursor:pointer;
                               display:flex; align-items:center; justify-content:center; color:#fff;
                               font-size:1.1rem; transition:background 0.2s;">&#x2715;</button>
            </div>

            <!-- Form -->
            <form id="wa-enquiry-form" novalidate
                  style="padding:1.5rem 1.75rem 1.75rem; display:flex; flex-direction:column; gap:1rem;">

                <!-- Name -->
                <div>
                    <label for="wa-name"
                           style="display:block; font-size:0.8rem; font-weight:600;
                                  color:#374151; margin-bottom:0.4rem; text-transform:uppercase;
                                  letter-spacing:0.5px;">
                        Your Name <span style="color:#ef4444;">*</span>
                    </label>
                    <div style="position:relative;">
                        <span style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%);
                                     color:#6B7280; font-size:0.9rem;">👤</span>
                        <input id="wa-name" type="text" placeholder="Enter your full name"
                               autocomplete="name" required
                               style="width:100%; padding:0.7rem 0.9rem 0.7rem 2.4rem;
                                      border:2px solid #E5E7EB; border-radius:0.65rem; font-size:0.9rem;
                                      outline:none; transition:border-color 0.2s; box-sizing:border-box;
                                      font-family:inherit;">
                    </div>
                </div>

                <!-- Mobile -->
                <div>
                    <label for="wa-mobile"
                           style="display:block; font-size:0.8rem; font-weight:600;
                                  color:#374151; margin-bottom:0.4rem; text-transform:uppercase;
                                  letter-spacing:0.5px;">
                        Mobile Number <span style="color:#ef4444;">*</span>
                    </label>
                    <div style="position:relative;">
                        <span style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%);
                                     color:#6B7280; font-size:0.9rem;">📱</span>
                        <input id="wa-mobile" type="tel" placeholder="e.g. 9876543210"
                               autocomplete="tel" required maxlength="15"
                               style="width:100%; padding:0.7rem 0.9rem 0.7rem 2.4rem;
                                      border:2px solid #E5E7EB; border-radius:0.65rem; font-size:0.9rem;
                                      outline:none; transition:border-color 0.2s; box-sizing:border-box;
                                      font-family:inherit;">
                    </div>
                </div>

                <!-- Address -->
                <div>
                    <label for="wa-address"
                           style="display:block; font-size:0.8rem; font-weight:600;
                                  color:#374151; margin-bottom:0.4rem; text-transform:uppercase;
                                  letter-spacing:0.5px;">
                        Address / Area <span style="color:#ef4444;">*</span>
                    </label>
                    <div style="position:relative;">
                        <span style="position:absolute; left:0.85rem; top:0.8rem;
                                     color:#6B7280; font-size:0.9rem;">📍</span>
                        <textarea id="wa-address" rows="2" placeholder="Flat no., Area, Hyderabad"
                                  autocomplete="street-address" required
                                  style="width:100%; padding:0.7rem 0.9rem 0.7rem 2.4rem;
                                         border:2px solid #E5E7EB; border-radius:0.65rem; font-size:0.9rem;
                                         outline:none; transition:border-color 0.2s; box-sizing:border-box;
                                         font-family:inherit; resize:none; line-height:1.5;"></textarea>
                    </div>
                </div>

                <!-- Service -->
                <div>
                    <label for="wa-service"
                           style="display:block; font-size:0.8rem; font-weight:600;
                                  color:#374151; margin-bottom:0.4rem; text-transform:uppercase;
                                  letter-spacing:0.5px;">
                        Service Interested In
                    </label>
                    <div style="position:relative;">
                        <span style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%);
                                     color:#6B7280; font-size:0.9rem;">🔧</span>
                        <select id="wa-service"
                                style="width:100%; padding:0.7rem 0.9rem 0.7rem 2.4rem;
                                       border:2px solid #E5E7EB; border-radius:0.65rem; font-size:0.9rem;
                                       outline:none; transition:border-color 0.2s; box-sizing:border-box;
                                       font-family:inherit; background:#fff; appearance:none;
                                       cursor:pointer;">
                            <option value="">-- Select a service --</option>
                            <option value="Building Covering Nets">Building Covering Nets</option>
                            <option value="Duct Area Covering Nets">Duct Area Covering Nets</option>
                            <option value="Swimming Pool Covering Nets">Swimming Pool Covering Nets</option>
                            <option value="Bird Spikers">Bird Spikers</option>
                            <option value="Sports Nets (Cricket / Football)">Sports Nets (Cricket / Football)</option>
                            <option value="Other / Need Consultation">Other / Need Consultation</option>
                        </select>
                        <span style="position:absolute; right:0.85rem; top:50%; transform:translateY(-50%);
                                     color:#6B7280; pointer-events:none; font-size:0.75rem;">▼</span>
                    </div>
                </div>

                <!-- Error message -->
                <p id="wa-error"
                   style="display:none; color:#ef4444; font-size:0.82rem; margin:0;
                          background:#FEF2F2; padding:0.6rem 0.9rem; border-radius:0.5rem;
                          border-left:3px solid #ef4444;"></p>

                <!-- Submit -->
                <button type="submit" id="wa-submit-btn"
                        style="background:linear-gradient(135deg,#25D366 0%,#128C7E 100%);
                               color:#fff; border:none; border-radius:0.75rem; padding:0.85rem 1.5rem;
                               font-size:1rem; font-weight:700; cursor:pointer; display:flex;
                               align-items:center; justify-content:center; gap:0.6rem;
                               transition:all 0.25s ease; font-family:inherit;
                               box-shadow:0 4px 15px rgba(37,211,102,0.4);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.5l5.797-1.521A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.645-.492-5.17-1.354l-.37-.22-3.44.902.921-3.353-.241-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    Send on WhatsApp
                </button>

                <p style="text-align:center; font-size:0.75rem; color:#9CA3AF; margin:0;">
                    You will be redirected to WhatsApp to send the message.
                </p>
            </form>
        </div>
    </div>`;

    // ── Keyframe animation ──────────────────────────────────────────────────
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        @keyframes waBounceIn {
            from { opacity:0; transform:scale(0.8) translateY(30px); }
            to   { opacity:1; transform:scale(1) translateY(0); }
        }
        #wa-modal-box input:focus,
        #wa-modal-box textarea:focus,
        #wa-modal-box select:focus {
            border-color: #25D366 !important;
            box-shadow: 0 0 0 3px rgba(37,211,102,0.15);
        }
        #wa-modal-box input.wa-invalid,
        #wa-modal-box textarea.wa-invalid {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }
        #wa-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37,211,102,0.55) !important;
        }
        #wa-modal-close:hover { background: rgba(255,255,255,0.35) !important; }
        #wa-modal-overlay.wa-show { display:flex !important; }
    `;
    document.head.appendChild(styleTag);

    // ── Inject modal into DOM ───────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const overlay = document.getElementById('wa-modal-overlay');
        const closeBtn = document.getElementById('wa-modal-close');
        const form = document.getElementById('wa-enquiry-form');
        const errorEl = document.getElementById('wa-error');

        // ── Open modal on WhatsApp floating button click ──────────────────
        document.addEventListener('click', function (e) {
            const waBtn = e.target.closest('.floating-btn.whatsapp');
            if (waBtn) {
                e.preventDefault();
                openModal();
            }
        });

        function openModal() {
            overlay.classList.add('wa-show');
            document.body.style.overflow = 'hidden';
            // Focus first input after animation
            setTimeout(() => {
                const nameInput = document.getElementById('wa-name');
                if (nameInput) nameInput.focus();
            }, 420);
        }

        function closeModal() {
            overlay.classList.remove('wa-show');
            document.body.style.overflow = '';
            form.reset();
            clearErrors();
        }

        // ── Close handlers ────────────────────────────────────────────────
        closeBtn.addEventListener('click', closeModal);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('wa-show')) closeModal();
        });

        // ── Validation ────────────────────────────────────────────────────
        function clearErrors() {
            errorEl.style.display = 'none';
            errorEl.textContent = '';
            document.querySelectorAll('#wa-enquiry-form .wa-invalid').forEach(el => {
                el.classList.remove('wa-invalid');
            });
        }

        function showError(msg, field) {
            errorEl.textContent = msg;
            errorEl.style.display = 'block';
            if (field) field.classList.add('wa-invalid');
            if (field) field.focus();
        }

        // ── Form submit ───────────────────────────────────────────────────
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();

            const name    = document.getElementById('wa-name').value.trim();
            const mobile  = document.getElementById('wa-mobile').value.trim();
            const address = document.getElementById('wa-address').value.trim();
            const service = document.getElementById('wa-service').value;

            // Basic validation
            if (!name) {
                showError('Please enter your name.', document.getElementById('wa-name'));
                return;
            }
            if (!mobile || !/^[0-9+\s\-]{7,15}$/.test(mobile)) {
                showError('Please enter a valid mobile number.', document.getElementById('wa-mobile'));
                return;
            }
            if (!address) {
                showError('Please enter your address or area.', document.getElementById('wa-address'));
                return;
            }

            // Build WhatsApp message
            // String.fromCodePoint is the ONLY 100% reliable cross-platform emoji method
            var wave   = String.fromCodePoint(0x1F44B); // 👋
            var person = String.fromCodePoint(0x1F464); // 👤
            var mobile_icon = String.fromCodePoint(0x1F4F1); // 📱
            var pin    = String.fromCodePoint(0x1F4CD); // 📍
            var wrench = String.fromCodePoint(0x1F527); // 🔧
            var line   = '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500';

            const lines = [
                wave   + ' *New Enquiry from Website*',
                line,
                person + ' *Name:* '    + name,
                mobile_icon + ' *Mobile:* '  + mobile,
                pin    + ' *Address:* ' + address,
            ];
            if (service) lines.push(wrench + ' *Service:* ' + service);
            lines.push(line);
            lines.push('_Sent via MJR Building covering nets website_');

            const message = lines.join('\n');
            const waURL = 'https://wa.me/' + OWNER_WHATSAPP + '?text=' + encodeURIComponent(message);

            // Show sending state briefly
            const submitBtn = document.getElementById('wa-submit-btn');
            submitBtn.textContent = 'Opening WhatsApp\u2026';
            submitBtn.disabled = true;

            setTimeout(function () {
                closeModal();
                // Use direct navigation — most reliable, no popup blocker issues
                var waLink = document.createElement('a');
                waLink.href = waURL;
                waLink.target = '_blank';
                waLink.rel = 'noopener noreferrer';
                document.body.appendChild(waLink);
                waLink.click();
                document.body.removeChild(waLink);

                submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.5l5.797-1.521A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.645-.492-5.17-1.354l-.37-.22-3.44.902.921-3.353-.241-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg> Send on WhatsApp';
                submitBtn.disabled = false;
            }, 500);
        });
    });

})();
