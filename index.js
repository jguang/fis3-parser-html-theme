var path = require('path');

module.exports = function (content, file, opt) {
    // 只对 html 类文件进行处理
    if (!file.isHtmlLike) {
        return content;
    }
    // Buffer转换
    if (content instanceof Buffer) {
        content = content.toString('utf-8');
    }
    var name = opt.name || '__theme';
    var lang = fis.compile.lang;
    return content.replace(new RegExp(name + '\\((.*?)\\)', 'ig'), function (all, value) {
        var args = value.split(',');
        var themeFileName = args[0].trim();
        var theme = args[1].trim();
        var fileDirName = path.dirname(file.realpath);
        var themeRealPath = path.resolve(fileDirName, themeFileName);
        var themeFile = fis.file(themeRealPath);

        var newThemeFileName = themeFile.realpathNoExt + "_" + theme + '.less';
        var newThemeFile = fis.file.wrap(newThemeFileName);
        var newThemeContent = themeFile.getContent();
        var matchTheme = newThemeContent.match(/\@theme\s*\:\s*(.*?)(\;)/i);

        newThemeContent = newThemeContent.replace(matchTheme[1], theme);


        newThemeFile.cache = file.cache;

        newThemeFile.setContent(newThemeContent);

        fis.compile.process(newThemeFile);

        newThemeFile.links.forEach(function(derived) {
            file.addLink(derived);
        });

        file.derived.push(newThemeFile);

        file.addRequire(newThemeFile.getId());

        //console.log( newThemeFile );
        //console.log( fis.compile.lang.uri.wrap(newThemeFile.url));

        return newThemeFile.getUrl();
    });
};