import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import ctypes

# if not ctypes.windll.shell32.IsUserAnAdmin():
    # print("it's not admin");

mailFrom = "enhui.zhu@163.com"
mailTo = "enhui.zhu@glencore.co.uk"
msg = MIMEMultipart('alternative')
msg['Subject'] = "UI update"
msg['From'] = mailFrom
msg['To'] = mailTo
text = "hello, the world"
html = "<html><body>html here</body></html>"
part1 = MIMEText(text, 'plain')
part2 = MIMEText(html, 'html')

msg.attach(part1)
msg.attach(part2)

s = smtplib.SMTP('localhost')
s.sendmail(mailFrom, mailTo, msg.as_string())
s.quit()