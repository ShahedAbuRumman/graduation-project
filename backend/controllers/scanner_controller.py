from services.vulnerability_scanner import VulnerabilityScanner

class ScannerController:
    @staticmethod
    def scan(url):
       
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url

        
        scanner = VulnerabilityScanner(url)
        report = scanner.scan()
        return report
