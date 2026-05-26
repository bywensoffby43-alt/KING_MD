import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../config.js', () => ({
    default: { ownerNumber: '50940127120@s.whatsapp.net' }
}));

vi.mock('../../lib/index.js', () => ({
    isSudo: vi.fn(async () => false)
}));

describe('isOwnerOrSudo', () => {
    let isOwnerOrSudo, isOwnerOnly, cleanJid;

    beforeEach(async () => {
        vi.resetModules();
        const mod = await import('../../lib/isOwner.js');
        isOwnerOrSudo = mod.default;
        isOwnerOnly = mod.isOwnerOnly;
        cleanJid = mod.cleanJid;
    });

    it('owner JID matches', async () => {
        expect(await isOwnerOrSudo('50940127120@s.whatsapp.net')).toBe(true);
    });

    it('owner with device suffix matches', async () => {
        expect(await isOwnerOrSudo('40127120:10@s.whatsapp.net')).toBe(true);
    });

    it('non-owner returns false', async () => {
        expect(await isOwnerOrSudo('50955311670@s.whatsapp.net')).toBe(false);
    });

    it('isOwnerOnly rejects sudo', async () => {
        expect(isOwnerOnly('50955311670@s.whatsapp.net')).toBe(false);
    });

    it('cleanJid strips device suffix', () => {
        expect(cleanJid('50940127120:10@s.whatsapp.net')).toBe('923001234567');
    });

    it('cleanJid strips @s.whatsapp.net', () => {
        expect(cleanJid('923001234567@s.whatsapp.net')).toBe('50940127120');
    });

    it('cleanJid handles empty string', () => {
        expect(cleanJid('')).toBe('');
    });
});
