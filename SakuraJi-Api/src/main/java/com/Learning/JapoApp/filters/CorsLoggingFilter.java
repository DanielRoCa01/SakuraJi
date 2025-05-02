package com.Learning.JapoApp.filters;



import jakarta.servlet.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;


import java.io.IOException;


@Component
public class CorsLoggingFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(CorsLoggingFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        String origin = req.getHeader("Origin");
        String method = req.getMethod();
        String uri = req.getRequestURI();

        // Log de entrada
        if (origin != null) {
            logger.info("Petición CORS: método={}, endpoint={}, origin={}", method, uri, origin);
        }

        chain.doFilter(request, response);

        // Log de posible denegación por CORS
        if (origin != null && res.getHeader("Access-Control-Allow-Origin") == null) {
            logger.warn("Petición CORS DENEGADA: método={}, endpoint={}, origin={}, status={}",
                    method, uri, origin, res.getStatus());
        }
    }
}
