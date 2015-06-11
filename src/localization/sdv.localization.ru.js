// Add russian localization dictionary.
SDV.Localization.extend({
    locale: 'ru',
    dictionary: {
        // Тестовое приветствие.
        greeting: 'Привет, мир!',

        // Метод для получения сообщения об отсутствующем словаре локализации для указанного языка.
        missingDictionaryError: function (locale) {
            return 'Ошибка. Не найден словарь локализации для языка \'' + locale + '\'.';
        },

        wrongColorRepresentation: function(stringedColor) {
            return 'Ошибка. Не удалось найти цвет, которому соответствовало бы строковое представление \'' + stringedColor + '\'.';
        },

        // Метод для получения сообщения об ошибочном типе параметра.
        wrongParameterTypeError: function (options) {
            options = options || {};
            return 'Ошибка. Параметр \'' + options.parameterName + '\' должен иметь один из следующих разрешенных типов: ' +
                (SDV.Util.Array.isArray(options.expectedType)
                    ? '\'' + options.expectedType.join('\', \'') + '\''
                    : '\'' + options.expectedType + '\'') + '. ' +
                'Тип \'' + Object.prototype.toString.call(options.actualValue) + '\' не является разрешенным для этого параметра.';
        },

        // Метод для получения сообщения об ошибочном формате параметра.
        wrongParameterFormatError: function (options) {
            options = options || {};
            return 'Ошибка. Параметер \'' + options.parameterName + '\' имеет неверный формат (' + options.actualValue + ').' +
                ' Он должен соответствовать формату \'' + options.expectedFormat + '\'.';
        },

        // Метод для получения сообщения об ошибочном значении параметра.
        wrongParameterValueError: function (options) {
            options = options || {};
            return 'Ошибка. Параметр \'' + options.parameterName + '\' должен иметь одно из следующих разрешенных значений: ' +
                (SDV.Util.Array.isArray(options.allowedValues)
                    ? '\'' + options.allowedValues.join('\', \'') + '\''
                    : '\'' + options.allowedValues + '\'') + '. ' +
                'Значение \'' + options.actualValue + '\' не является разрешенным для этого параметра.';
        },

        // Метод для получения сообщения о незаданном обязательном параметре.
        missingRequiredParameter: function (parameterName) {
            return 'Ошибка. Не задан обязательный параметр \'' + parameterName + '\'.';
        },

        // Метод для получения сообщения о еподдерживаемом браузером свойстве.
        unsupportedFacilityError: function (unsupported) {
            return 'Ошибка. Ваш браузер не поддерживает ' +
                (SDV.Util.Array.isArray(unsupported)
                    ? 'ни одну из следующих возможностей: ' + unsupported.join(', ')
                    : unsupported) +
                '.';
        },

        // Метод для получения сообщений о синтаксических ошибках в строках.
        syntaxError: function(options) {
            return 'Синтаксическая ошибка в строке \'' + options.originalString +'\' на позиции №' + options.errorPosition + '. ' +
                'Ожидается одня из следующих конструкций: ' +
                (SDV.Util.Array.isArray(options.allowedConstructions)
                    ? '\'' + options.allowedConstructions.join('\', \'') + '\''
                    : '\'' + options.allowedConstructions + '\'') +
                '. ' +
                'Конструкция \'' + options.actualConstruction + '\' не является разрешенной.';
        }
    }
});