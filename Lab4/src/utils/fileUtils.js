import * as FileSystem from 'expo-file-system/legacy';

export const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Б';
    if (bytes < 1024) return `${bytes} Б`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} ГБ`;
};

export const formatDate = (isoString) => {
    if (!isoString) return 'Невідомо';
    const d = new Date(isoString);
    return d.toLocaleString('uk-UA');
};

export const getExtension = (name) => {
    if (!name) return '';
    const parts = name.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

export const getIcon = (item) => {
    if (item.isDirectory) return '📁';
    const ext = getExtension(item.name);
    const icons = {
        txt: '📄', json: '📋', js: '📜', jsx: '📜',
        png: '🖼', jpg: '🖼', jpeg: '🖼', gif: '🖼',
        mp3: '🎵', mp4: '🎬', pdf: '📕',
    };
    return icons[ext] || '📃';
};

export const readDirectory = async (dirUri) => {
    const names = await FileSystem.readDirectoryAsync(dirUri);
    const items = await Promise.all(
        names.map(async (name) => {
            const uri = dirUri.endsWith('/') ? `${dirUri}${name}` : `${dirUri}/${name}`;
            try {
                const info = await FileSystem.getInfoAsync(uri, { size: true });
                return {
                    name,
                    uri,
                    isDirectory: info.isDirectory ?? false,
                    size: info.size ?? 0,
                    modificationTime: info.modificationTime
                        ? new Date(info.modificationTime * 1000).toISOString()
                        : null,
                };
            } catch {
                return { name, uri, isDirectory: false, size: 0, modificationTime: null };
            }
        })
    );
    return items.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
    });
};