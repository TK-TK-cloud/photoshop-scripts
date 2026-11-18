#target photoshop

// Photoshop: split the active document into 12 vertical PNG strips.
// No resizing, no resampling, and no edits to the source document.
(function () {
    var count = 12;
    if (app.documents.length === 0) {
        alert("画像をPhotoshopで開いてから実行してください。");
        return;
    }

    var original = app.activeDocument;
    var dest = Folder.selectDialog("12枚のPNGを保存するフォルダを選択してください");
    if (!dest) return;

    var previousUnits = app.preferences.rulerUnits;
    var previousDialogs = app.displayDialogs;
    var master = null;
    var piece = null;

    try {
        app.preferences.rulerUnits = Units.PIXELS;
        app.displayDialogs = DialogModes.NO;

        var w = Math.round(original.width.as("px"));
        var h = Math.round(original.height.as("px"));
        if (w < count) throw new Error("画像の横幅が12px未満です。");

        var name = original.name.replace(/\.[^.]+$/, "").replace(/[\\\/:*?"<>|]/g, "_");
        var out = new Folder(dest.fsName + "/" + name + "_12parts");
        var suffix = 2;
        while (out.exists) {
            out = new Folder(dest.fsName + "/" + name + "_12parts_" + suffix);
            suffix++;
        }
        if (!out.create()) throw new Error("保存用フォルダを作成できませんでした。");

        // Flatten a DUPLICATE of the full image first so effects do not
        // render differently when each strip is cropped.
        master = original.duplicate("__12parts_working_master__", false);
        master.flatten();

        for (var i = 0; i < count; i++) {
            // Round the cumulative boundary, not the individual width:
            // all strips line up with no missing or duplicated pixels.
            var left = Math.round(i * w / count);
            var right = Math.round((i + 1) * w / count);

            piece = master.duplicate("__12parts_strip_" + (i + 1) + "__", false);
            piece.crop([
                UnitValue(left, "px"),
                UnitValue(0, "px"),
                UnitValue(right, "px"),
                UnitValue(h, "px")
            ]);

            var index = ("0" + (i + 1)).slice(-2);
            var file = new File(out.fsName + "/" + name + "_" + index + ".png");
            var png = new PNGSaveOptions();
            png.interlaced = false;
            piece.saveAs(file, png, true, Extension.LOWERCASE);
            piece.close(SaveOptions.DONOTSAVECHANGES);
            piece = null;
        }

        master.close(SaveOptions.DONOTSAVECHANGES);
        master = null;
        alert("完了：12枚のPNGを保存しました。\n" + out.fsName + "\n元画像は変更していません。");
    } catch (e) {
        alert("処理を中断しました：\n" + e.message);
    } finally {
        if (piece) {
            try { piece.close(SaveOptions.DONOTSAVECHANGES); } catch (ignore1) {}
        }
        if (master) {
            try { master.close(SaveOptions.DONOTSAVECHANGES); } catch (ignore2) {}
        }
        app.preferences.rulerUnits = previousUnits;
        app.displayDialogs = previousDialogs;
        app.activeDocument = original;
    }
})();
