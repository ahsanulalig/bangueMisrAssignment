import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AppService {
  selectedBudgetId = "0d5054e6-73f9-4934-80e4-7a06f627dc93";
  constructor(private http: HttpClient) {}
  get(url) {
    return this.http.get(url, { responseType: "json" });
  }

  post(url, data) {
    return this.http.post(url, data);
  }
}
