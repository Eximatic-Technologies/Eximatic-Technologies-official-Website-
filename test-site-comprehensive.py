#!/usr/bin/env python3
"""Comprehensive Site Testing for Eximatic"""

import urllib.request
import urllib.error
import time
from html.parser import HTMLParser

class SiteValidator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []
        self.links = []
        self.videos = []
        self.forms = []
        self.buttons = []
        self.issues = []
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        if tag == 'img':
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt', None)
            self.images.append({'src': src, 'alt': alt})
            if alt is None or alt == '':
                self.issues.append(f"Image missing alt text: {src}")
                
        elif tag == 'a':
            href = attrs_dict.get('href', '')
            self.links.append(href)
            
        elif tag == 'video':
            src = attrs_dict.get('src', '')
            autoplay = 'autoplay' in [a[0] for a in attrs]
            muted = 'muted' in [a[0] for a in attrs]
            self.videos.append({'src': src, 'autoplay': autoplay, 'muted': muted})
            if autoplay and not muted:
                self.issues.append(f"Video has autoplay but not muted: {src}")
                
        elif tag == 'form':
            action = attrs_dict.get('action', '')
            self.forms.append(action)
            if not action or action == '#':
                self.issues.append("Form has no action or placeholder action")
                
        elif tag == 'button' or (tag == 'input' and attrs_dict.get('type') == 'submit'):
            self.buttons.append(attrs_dict.get('type', 'button'))

def test_page(url, page_name):
    print(f"\n{'='*60}")
    print(f"Testing: {page_name}")
    print(f"URL: {url}")
    print('='*60)
    
    try:
        # Test HTTP response
        start_time = time.time()
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, timeout=10)
        load_time = time.time() - start_time
        
        print(f"Status Code: {response.status}")
        print(f"Load Time: {load_time:.2f}s", end='')
        if load_time < 2:
            print(" (Excellent)")
        elif load_time < 5:
            print(" (Good)")
        else:
            print(" (Slow - needs optimization)")
        
        # Parse HTML
        html = response.read().decode('utf-8')
        validator = SiteValidator()
        validator.feed(html)
        
        # Report findings
        print(f"\nPage Statistics:")
        print(f"  - Images: {len(validator.images)}")
        print(f"  - Links: {len(validator.links)}")
        print(f"  - Videos: {len(validator.videos)}")
        print(f"  - Forms: {len(validator.forms)}")
        print(f"  - Buttons: {len(validator.buttons)}")
        
        # Check for issues
        if validator.issues:
            print(f"\nISSUES FOUND ({len(validator.issues)}):")
            for issue in validator.issues[:10]:  # Show first 10
                print(f"  - {issue}")
        else:
            print("\nNo Issues Found!")
        
        return True, load_time
        
    except urllib.error.HTTPError as e:
        print(f"ERROR: HTTP {e.code} - {e.reason}")
        return False, 0
    except urllib.error.URLError as e:
        print(f"ERROR: URL {e.reason}")
        return False, 0
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return False, 0

def main():
    print("\n" + "="*60)
    print("  EXIMATIC WEBSITE COMPREHENSIVE TEST SUITE")
    print("="*60)
    
    base_url = "http://localhost:8000"
    pages = {
        'Home': 'index.html',
        'Services': 'services.html',
        'Solutions': 'solutions.html',
        'Contact': 'contact.html',
        'Projects': 'projects.html'
    }
    
    results = {}
    total_time = 0
    
    for name, file in pages.items():
        url = f"{base_url}/{file}"
        success, load_time = test_page(url, name)
        results[name] = success
        total_time += load_time
        time.sleep(0.5)  # Brief delay between tests
    
    # Final Report
    print(f"\n\n{'='*60}")
    print("FINAL REPORT")
    print('='*60)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    print(f"\nTests Passed: {passed}/{total}")
    print(f"Average Load Time: {total_time/total:.2f}s")
    
    print("\nPage Status:")
    for page, status in results.items():
        icon = "PASS" if status else "FAIL"
        print(f"  [{icon}] {page}")
    
    if passed == total:
        print("\nAll tests passed! Site is ready for production.")
    else:
        print("\nSome tests failed. Please review and fix issues.")
    
    print(f"\n{'='*60}")

if __name__ == '__main__':
    main()
