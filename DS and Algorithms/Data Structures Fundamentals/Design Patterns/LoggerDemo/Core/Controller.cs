namespace LoggerDemo.Core
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;

    using Enumerations;
    using Global;
    using Models;
    using Models.Appenders;
    using Models.Contracts;
    using Models.Layouts;

    internal class Controller
    {
        public void Run(int numAppenders)
        {
            var appenders = new List<IAppender>();

            AddAppenders(appenders, numAppenders);

            var logger = new Logger(appenders.ToArray());
            LogErrors(logger);
            PrintLogger(logger);
        }

        private static void PrintLogger(Logger logger)
        {
            Console.WriteLine(logger);
        }

        private static void LogErrors(Logger logger)
        {
            string command;
            while ((command = Console.ReadLine()) != "END")
            {
                var errorTokens = CreateStringArray('|', command);

                IError error = CreateError(errorTokens);
                logger.Log(error);
            }
        }

        private static IError CreateError(string[] errorTokens)
        {
            var errorLevel = GetReportLevel(errorTokens[0]);
            var errorTime = GetDateTime(errorTokens[1]);
            var errorMessage = errorTokens[2];

            IError error = new Error(errorLevel, errorTime, errorMessage);

            return error;
        }

        private static DateTime GetDateTime(string inputString)
        {
            DateTime time;
            try
            {
                time = DateTime.ParseExact(inputString, GlobalConstants.DATE_FORMAT, CultureInfo.InvariantCulture);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Could not parse object to System.DateTime", ex);
            }

            return time;
        }

        private static void AddAppenders(List<IAppender> appenders, int numAppenders)
        {
            for (int i = 0; i < numAppenders; i++)
            {
                var appenderTokens = CreateStringArray(' ');

                var appenderType = appenderTokens[0];
                var layoutType = appenderTokens[1];
                var inputReportLevel = appenderTokens.Length > 2 ? appenderTokens[2] : string.Empty;

                ILayout layout = GetLayoutType(layoutType);
                IAppender appender = GetAppenderType(appenderType, layout);

                if (inputReportLevel != string.Empty)
                {
                    AssignAppenderMinLevel(inputReportLevel, appender);
                }

                appenders.Add(appender);
            }
        }

        private static void AssignAppenderMinLevel(string inputReportLevel, IAppender appender)
        {
            var reportLevel = GetReportLevel(inputReportLevel);

            appender.MinLevel = reportLevel;
        }

        private static ReportLevel GetReportLevel(string inputReportLevel)
        {
            ReportLevel reportLevel;
            try
            {
                reportLevel = Enum.Parse<ReportLevel>(inputReportLevel);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Could not parse object to Enum", ex);
            }

            return reportLevel;
        }

        private static IAppender GetAppenderType(string appenderType, ILayout layout)
        {
            if (appenderType == "ConsoleAppender")
            {
                return new ConsoleAppender(layout);
            }
            else if (appenderType == "FileAppender")
            {
                return new FileAppender(layout);
            }

            return null;
        }

        private static ILayout GetLayoutType(string layoutType)
        {
            if (layoutType == "SimpleLayout")
            {
                return new SimpleLayout();
            }
            else if (layoutType == "XmlLayout")
            {
                return new XmlLayout();
            }

            return null;
        }

        private static string[] CreateStringArray(char separator, string input)
        {
            return input
                   .Split(separator,
                    StringSplitOptions
                   .RemoveEmptyEntries)
                   .ToArray();
        }
        private static string[] CreateStringArray(char separator)
        {
            return Console.ReadLine()
                   .Split(separator,
                    StringSplitOptions
                   .RemoveEmptyEntries)
                   .ToArray();
        }



    }
}

