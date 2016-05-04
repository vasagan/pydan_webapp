from django.shortcuts import render
import feedparser
import iso8601

# Create your views here.


def blog(request):
    content=[]
    parsed_content = feedparser.parse('http://www.indjango.com/rss.xml')
    for feed in parsed_content.entries:
        feed['date'] = iso8601.parse_date(feed.updated)
        content.append(feed)
    return render(request, 'pages/blog.html', {'feeds':content})